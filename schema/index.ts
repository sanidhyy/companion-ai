import * as z from "zod";

export const companionFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(10, {
    message: "Description is required.",
  }),
  instructions: z.string().min(200, {
    message: "Instructions require at least 200 characters.",
  }),
  seed: z.string().min(200, {
    message: "Seed require at least 200 characters.",
  }),
  src: z.string().min(1, {
    message: "Image is required.",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
});

export const apiKeysFormSchema = z.object({
  openaiApiKey: z
    .string()
    .trim()
    .min(12, { message: "Invalid OpenAI API key." })
    .startsWith("sk-", { message: "Invalid OpenAI API key." }),
  replicateApiToken: z
    .string()
    .trim()
    .min(12, { message: "Invalid Replicate API token." })
    .startsWith("r8_", { message: "Invalid Replicate API token." }),
  pineconeApiKey: z
    .string()
    .trim()
    .min(12, { message: "Invalid Pinecone API key." })
    .startsWith("pcsk_", { message: "Invalid Pinecone API key." }),
  pineconeIndex: z.string().trim().min(1, {
    message: "Pinecone index name is required.",
  }),
});
