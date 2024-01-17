import { Categories } from "@/components/categories";
import { SearchInput } from "@/components/search-input";
import { db } from "@/lib/db";

const HomePage = async () => {
  const categories = await db.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />

      <Categories data={categories} />
    </div>
  );
};

export default HomePage;
