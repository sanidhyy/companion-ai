import { ApiKeysForm } from "@/components/api-keys-form";
import { SubscriptionButton } from "@/components/subscription-button";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";
import { getUserApiKeys } from "@/lib/user-api-keys";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  const apiKeys = await getUserApiKeys();

  return (
    <div className="h-full p-4 space-y-6 max-w-3xl">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Settings</h3>

        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are currently on a pro plan."
            : "You are currently on a free plan."}
        </div>

        <SubscriptionButton isPro={isPro} />
      </div>

      <Separator className="bg-primary/10" />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">API Keys</h3>
          <p className="text-sm text-muted-foreground">
            Provide your own OpenAI and Pinecone credentials to use chat. Keys
            are stored encrypted in your browser and expire after 30 days.
          </p>
        </div>

        <ApiKeysForm
          initialValues={{
            openaiApiKey: apiKeys?.openaiApiKey ?? "",
            pineconeApiKey: apiKeys?.pineconeApiKey ?? "",
            pineconeIndex: apiKeys?.pineconeIndex ?? "",
          }}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
