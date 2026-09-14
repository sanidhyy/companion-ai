"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import axios from "axios";
import { EyeIcon, EyeOffIcon, Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiKeysFormSchema } from "@/schema";

type ApiKeysFormValues = z.infer<typeof apiKeysFormSchema>;

type ApiKeysFormProps = {
  initialValues: ApiKeysFormValues;
};

type SecretFieldName = "openaiApiKey" | "pineconeApiKey";

const PINECONE_INDEX_STEPS = [
  "Open Pinecone and create a new index (any name, e.g. companion).",
  "Enable Custom settings.",
  "Set Vector type to Dense.",
  "Set Dimension to 1536.",
  "Set Metric to cosine.",
  "Keep Capacity mode as Serverless, then create the index.",
] as const;

export const ApiKeysForm = ({ initialValues }: ApiKeysFormProps) => {
  const router = useRouter();
  const [visibleFields, setVisibleFields] = useState<
    Record<SecretFieldName, boolean>
  >({
    openaiApiKey: false,
    pineconeApiKey: false,
  });
  const [isRemoving, setIsRemoving] = useState(false);

  const form = useForm<ApiKeysFormValues>({
    resolver: zodResolver(apiKeysFormSchema),
    defaultValues: {
      openaiApiKey: initialValues.openaiApiKey ?? "",
      pineconeApiKey: initialValues.pineconeApiKey ?? "",
      pineconeIndex: initialValues.pineconeIndex ?? "",
    },
  });

  const isLoading = form.formState.isSubmitting || isRemoving;
  const hasSavedKeys = Object.values(initialValues).some(
    (value) => value.trim().length > 0,
  );

  const onSubmit = async (values: ApiKeysFormValues) => {
    try {
      await axios.post("/api/settings/api-keys", values);
      toast.success("API keys saved successfully.");
      router.refresh();
    } catch (error: unknown) {
      console.error("[API_KEYS_FORM]: ", error);

      const message =
        axios.isAxiosError(error) && typeof error.response?.data === "string"
          ? error.response.data
          : "Failed to save API keys.";

      toast.error(message);
    }
  };

  const onRemove = async () => {
    try {
      setIsRemoving(true);
      await axios.delete("/api/settings/api-keys");
      form.reset({
        openaiApiKey: "",
        pineconeApiKey: "",
        pineconeIndex: "",
      });
      toast.success("API keys removed successfully.");
      router.refresh();
    } catch (error: unknown) {
      console.error("[API_KEYS_FORM_REMOVE]: ", error);
      toast.error("Failed to remove API keys.");
    } finally {
      setIsRemoving(false);
    }
  };

  const toggleVisibility = (field: SecretFieldName) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        autoComplete="off"
        autoCapitalize="off"
      >
        <FormField
          control={form.control}
          name="openaiApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OpenAI API Key</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={visibleFields.openaiApiKey ? "text" : "password"}
                    placeholder="sk-•••••••••••••••••••••••••••••••"
                    className="pr-12"
                    disabled={isLoading}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <button
                  disabled={isLoading}
                  type="button"
                  className="absolute inset-y-0 right-1 flex cursor-pointer items-center rounded-full p-3 text-muted-foreground outline-none ring-primary focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => toggleVisibility("openaiApiKey")}
                >
                  {visibleFields.openaiApiKey ? (
                    <EyeOffIcon className="size-5" />
                  ) : (
                    <EyeIcon className="size-5" />
                  )}
                </button>
              </div>
              <FormDescription>
                Get your API Key from{" "}
                <Link
                  href="https://platform.openai.com/account/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-2 opacity-100 hover:opacity-75"
                >
                  OpenAI
                </Link>
                . Make sure your account has sufficient{" "}
                <Link
                  href="https://platform.openai.com/settings/organization/billing/credit-grants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-2 opacity-100 hover:opacity-75"
                >
                  credit grants
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pineconeApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pinecone API Key</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={visibleFields.pineconeApiKey ? "text" : "password"}
                    placeholder="pcsk_•••••••••••••••••••••••••••••••••"
                    className="pr-12"
                    disabled={isLoading}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <button
                  disabled={isLoading}
                  type="button"
                  className="absolute inset-y-0 right-1 flex cursor-pointer items-center rounded-full p-3 text-muted-foreground outline-none ring-primary focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => toggleVisibility("pineconeApiKey")}
                >
                  {visibleFields.pineconeApiKey ? (
                    <EyeOffIcon className="size-5" />
                  ) : (
                    <EyeIcon className="size-5" />
                  )}
                </button>
              </div>
              <FormDescription>
                Get your API key from{" "}
                <Link
                  href="https://app.pinecone.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-2 opacity-100 hover:opacity-75"
                >
                  Pinecone
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pineconeIndex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pinecone Index</FormLabel>
              <FormControl>
                <Input
                  placeholder="companion"
                  disabled={isLoading}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                Name of the Pinecone index that stores companion embeddings.{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-primary underline underline-offset-2 font-medium opacity-100 hover:opacity-75"
                    >
                      How to create an index?
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create a Pinecone index</DialogTitle>
                      <DialogDescription>
                        <VisuallyHidden>
                          Companion needs a dense index with 1536 dimensions and
                          cosine similarity for OpenAI embeddings.
                        </VisuallyHidden>
                      </DialogDescription>
                    </DialogHeader>

                    <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                      {PINECONE_INDEX_STEPS.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>

                    <div className="overflow-hidden rounded-md border bg-muted/30">
                      <Image
                        src="/pinecone-setup.png"
                        alt="Pinecone create index form with Custom settings, Dense vector type, dimension 1536, and cosine metric"
                        width={1280}
                        height={900}
                        className="h-auto w-full dark:hidden block"
                      />

                      <Image
                        src="/pinecone-setup-dark.png"
                        alt="Pinecone create index form with Custom settings, Dense vector type, dimension 1536, and cosine metric"
                        width={1280}
                        height={900}
                        className="h-auto w-full dark:block hidden"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          {hasSavedKeys && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  type="button"
                  className="gap-1"
                  disabled={isLoading}
                >
                  <Trash2Icon className="size-4" />
                  Remove API Keys
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove API Keys</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove your API keys? Chat will
                    stop working until you add them again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isRemoving}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isRemoving}
                    onClick={onRemove}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
