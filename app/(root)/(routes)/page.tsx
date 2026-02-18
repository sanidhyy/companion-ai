import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import { db } from "@/lib/db";

type HomePageProps = {
  searchParams: Promise<{
    categoryId: string;
    name: string;
  }>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { categoryId, name } = await searchParams;

  const data = await db.companion.findMany({
    where: {
      categoryId: categoryId,
      name: {
        search: name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await db.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />

      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default HomePage;
