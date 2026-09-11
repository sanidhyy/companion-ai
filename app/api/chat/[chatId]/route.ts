import { currentUser } from "@clerk/nextjs/server";
import { Replicate } from "@langchain/community/llms/replicate";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { API_KEYS_REQUIRED_MESSAGE } from "@/config";
import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import { getUserApiKeys } from "@/lib/user-api-keys";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { chatId } = await params;
    const { prompt } = await request.json();
    const user = await currentUser();

    if (!user || !user.firstName || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const apiKeys = await getUserApiKeys();

    if (!apiKeys) {
      return new NextResponse(API_KEYS_REQUIRED_MESSAGE, { status: 400 });
    }

    const identifier = request.url + "-" + user.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }

    const companion = await db.companion.update({
      where: {
        id: chatId,
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

    if (!companion) {
      return new NextResponse("Companion not found", { status: 404 });
    }

    const name = companion.id;
    const companionFileName = `${name}.txt`;

    const companionKey = {
      companionName: name,
      userId: user.id,
      modelName: "llama2-13b",
    };
    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(companionKey);
    if (records.length === 0) {
      await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);
    }
    await memoryManager.writeToHistory(`User: ${prompt}\n`, companionKey);

    const recentChatHistory =
      await memoryManager.readLatestHistory(companionKey);

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      companionFileName,
      {
        openaiApiKey: apiKeys.openaiApiKey,
        pineconeApiKey: apiKeys.pineconeApiKey,
        pineconeIndex: apiKeys.pineconeIndex,
      },
    );

    let relevantHistory = "";
    if (similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }

    const model = new Replicate({
      model:
        "meta/llama-2-13b-chat:6b4da803a2382c08868c5af10a523892f38e2de1aafb2ee55b020d9efef2fdb8",
      input: {
        max_length: 2048,
      },
      apiKey: apiKeys.replicateApiToken,
    });

    const resp = String(
      await model.invoke(
        `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 

        ${companion.instructions}

        Below are relevant details about ${companion.name}'s past and the conversation you are in.
        ${relevantHistory}


        ${recentChatHistory}\n${companion.name}:`,
      ),
    );

    const cleaned = resp.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const response = chunks[0]?.trim() ?? "";

    if (response.length > 1) {
      await memoryManager.writeToHistory(response, companionKey);

      await db.companion.update({
        where: {
          id: chatId,
        },
        data: {
          messages: {
            create: {
              content: response,
              role: "system",
              userId: user.id,
            },
          },
        },
      });
    }

    return new Response(response, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("[CHAT_POST]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
