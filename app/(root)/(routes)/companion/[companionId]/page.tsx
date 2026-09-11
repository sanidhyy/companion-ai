import { auth } from "@clerk/nextjs/server";

import { CompanionForm } from "@/components/companion-form";
import { db } from "@/lib/db";
import { hasUserApiKeys } from "@/lib/user-api-keys";

type CompanionIdPageProps = {
  params: Promise<{
    companionId: string;
  }>;
};

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { companionId } = await params;

  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const [companion, categories, hasApiKeys] = await Promise.all([
    db.companion.findUnique({
      where: {
        id: companionId,
        userId,
      },
    }),
    db.category.findMany(),
    hasUserApiKeys(),
  ]);

  return (
    <CompanionForm
      initialData={companion}
      categories={categories}
      hasApiKeys={hasApiKeys}
    />
  );
};

export default CompanionIdPage;
