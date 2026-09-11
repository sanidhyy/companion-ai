import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import { db } from "@/lib/db";
import { hasUserApiKeys } from "@/lib/user-api-keys";

type HomePageProps = {
  searchParams: Promise<{
    categoryId: string;
    name: string;
  }>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { categoryId, name } = await searchParams;

  const [data, categories, hasApiKeys] = await Promise.all([
    db.companion.findMany({
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
    }),
    db.category.findMany(),
    hasUserApiKeys(),
  ]);

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />

      <Categories data={categories} />
      <Companions data={data} hasApiKeys={hasApiKeys} />
    </div>
  );
};

export default HomePage;
