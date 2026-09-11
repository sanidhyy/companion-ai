import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { clearUserApiKeys, setUserApiKeys } from "@/lib/user-api-keys";
import { apiKeysFormSchema } from "@/schema";

async function validateOpenAIKey(apiKey: string) {
  const response = await fetch("https://api.openai.com/v1/models", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Invalid OpenAI API key.");
  }
}

async function validateReplicateToken(apiToken: string) {
  const response = await fetch("https://api.replicate.com/v1/account", {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Invalid Replicate API token.");
  }
}

async function validatePinecone(apiKey: string, indexName: string) {
  const response = await fetch(
    `https://api.pinecone.io/indexes/${encodeURIComponent(indexName)}`,
    {
      headers: {
        "Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Invalid Pinecone API key or index name.");
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const parsed = apiKeysFormSchema.safeParse(body);

    if (!parsed.success) {
      return new NextResponse(
        parsed.error.issues[0]?.message || "Invalid API keys.",
        { status: 400 },
      );
    }

    const { openaiApiKey, replicateApiToken, pineconeApiKey, pineconeIndex } =
      parsed.data;

    try {
      await Promise.all([
        validateOpenAIKey(openaiApiKey),
        validateReplicateToken(replicateApiToken),
        validatePinecone(pineconeApiKey, pineconeIndex),
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to verify API keys.";
      return new NextResponse(message, { status: 400 });
    }

    await setUserApiKeys({
      openaiApiKey,
      replicateApiToken,
      pineconeApiKey,
      pineconeIndex,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API_KEYS_POST]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await clearUserApiKeys();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API_KEYS_DELETE]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
