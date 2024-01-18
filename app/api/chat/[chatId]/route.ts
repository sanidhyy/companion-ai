import { auth, currentUser } from "@clerk/nextjs";
import { StreamingTextResponse, LangChainStream } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { Replicate } from "langchain/llms/replicate";
import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const { prompt } = await req.json();
    const user = await currentUser();

    if (!user || !user.firstName || !user.id)
      return new NextResponse("Unauthorized.", { status: 401 });

    const identifier = req.url + "-" + user.id;
    const { success } = await rateLimit(identifier);

    if (!success)
      return new NextResponse("Rate limit exceeded.", { status: 429 });

    const companion = await db.companion.update({
      where: {
        id: params.chatId,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id,
          },
        },
      },
    });

    if (!companion)
      return new NextResponse("Companion not found.", { status: 404 });

    const name = companion.id;
    const companion_file_name = name + ".txt";

    const companionKey = {
      companionName: name,
      userId: user.id,
      modelName: "llama2-13b",
    };

    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(companionKey);

    if (records.length === 0)
      await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);

    await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);

    const recentChatHistory = await memoryManager.readLatestHistory(
      companionKey
    );
    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      companion_file_name
    );

    let relevantHistory = "";

    if (!!similarDocs && similarDocs.length !== 0)
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");

    const { handlers } = LangChainStream();

    const model = new Replicate({
      model:
        "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbacks: CallbackManager.fromHandlers(handlers),
    });

    model.verbose = true; // for debugging

    const response = String(
      await model
        .generate([
          `
              ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 
      
              ${companion.instructions}
      
              Below are relevant details about ${companion.name}'s past and the conversation you are in.
              ${relevantHistory}
      
      
              ${recentChatHistory}\n${companion.name}:`,
        ])
        .catch(console.error)
    );

    const cleaned = response.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const resp = chunks[0];

    await memoryManager.writeToHistory("" + response.trim(), companionKey);
    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(resp);
    s.push(null);

    if (resp !== undefined && resp.length > 1) {
      memoryManager.writeToHistory("" + resp.trim(), companionKey);

      await db.companion.update({
        where: {
          id: params.chatId,
        },
        data: {
          messages: {
            create: {
              content: resp.trim(),
              role: "system",
              userId: user.id,
            },
          },
        },
      });
    }

    return new StreamingTextResponse(s);
  } catch (error: unknown) {
    console.error("[CHAT_ID_POST]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
