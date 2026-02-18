import { auth, redirectToSignIn } from "@clerk/nextjs";

import { CompanionForm } from "@/components/companion-form";
import { db } from "@/lib/db";

type CompanionIdPageProps = {
  params: Promise<{
    companionId: string;
  }>;
};

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { companionId } = await params;

  const { userId } = auth();
  if (!userId) return redirectToSignIn();

  const companion = await db.companion.findUnique({
    where: {
      id: companionId,
      userId,
    },
  });

  const categories = await db.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
