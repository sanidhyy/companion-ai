import { CompanionForm } from "@/components/companion-form";
import { db } from "@/lib/db";

type CompanionIdPageProps = {
  params: {
    companionId: string;
  };
};

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  // TODO: Check subscription

  const companion = await db.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await db.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
