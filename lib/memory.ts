import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { Redis } from "@upstash/redis";

import type { UserApiKeys } from "@/lib/user-api-keys";

export type CompanionKey = {
  companionName: string;
  modelName: string;
  userId: string;
};

export type VectorSearchCredentials = Pick<
  UserApiKeys,
  "openaiApiKey" | "pineconeApiKey" | "pineconeIndex"
>;

export class MemoryManager {
  private static instance: MemoryManager;
  private history: Redis;

  public constructor() {
    this.history = Redis.fromEnv();
  }

  public async vectorSearch(
    recentChatHistory: string,
    companionFileName: string,
    credentials: VectorSearchCredentials,
  ) {
    const vectorDbClient = new Pinecone({
      apiKey: credentials.pineconeApiKey,
    });
    const pineconeIndex = vectorDbClient.Index(credentials.pineconeIndex);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({ apiKey: credentials.openaiApiKey }),
      { pineconeIndex },
    );

    const similarDocs = await vectorStore
      .similaritySearch(recentChatHistory, 3, { fileName: companionFileName })
      .catch((error) => {
        console.error("Failed to get vector search results: ", error);
        return undefined;
      });

    return similarDocs;
  }

  public static async getInstance(): Promise<MemoryManager> {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }

    return MemoryManager.instance;
  }

  private generateRedisCompanionKey(companionKey: CompanionKey): string {
    return `${companionKey.companionName}-${companionKey.modelName}-${companionKey.userId}`;
  }

  public async writeToHistory(text: string, companionKey: CompanionKey) {
    if (!companionKey || typeof companionKey.userId == "undefined") {
      console.error("Companion key set incorrectly.");
      return "";
    }

    const key = this.generateRedisCompanionKey(companionKey);
    const result = await this.history.zadd(key, {
      score: Date.now(),
      member: text,
    });

    return result;
  }

  public async readLatestHistory(companionKey: CompanionKey): Promise<string> {
    if (!companionKey || typeof companionKey.userId == "undefined") {
      console.error("Companion key set incorrectly.");
      return "";
    }

    const key = this.generateRedisCompanionKey(companionKey);
    let result = await this.history.zrange(key, 0, Date.now(), {
      byScore: true,
    });

    result = result.slice(-30).reverse();
    const recentChats = result.reverse().join("\n");

    return recentChats;
  }

  public async seedChatHistory(
    seedContent: string,
    delimiter: string = "\n",
    companionKey: CompanionKey,
  ) {
    const key = this.generateRedisCompanionKey(companionKey);

    if (await this.history.exists(key)) {
      console.log("User already has chat history");
      return;
    }

    const content = seedContent.split(delimiter);
    let counter = 0;

    for (const line of content) {
      await this.history.zadd(key, { score: counter, member: line });
      counter += 1;
    }
  }
}
