import { createScriptDb } from "./db";

const CATEGORIES = [
  { name: "Famous People" },
  { name: "Movies & TV" },
  { name: "Musicians" },
  { name: "Games" },
  { name: "Animals" },
  { name: "Philosophy" },
  { name: "Scientists" },
] as const;

async function main() {
  const db = createScriptDb();

  try {
    const existing = await db.category.findMany({
      select: { name: true },
    });
    const existingNames = new Set(existing.map((category) => category.name));

    const toCreate = CATEGORIES.filter(
      (category) => !existingNames.has(category.name),
    );

    if (toCreate.length === 0) {
      console.log("All categories already exist. Nothing to seed.");
      return;
    }

    await db.category.createMany({
      data: [...toCreate],
    });

    console.log(
      `Seeded ${toCreate.length} categor${toCreate.length === 1 ? "y" : "ies"}: ${toCreate
        .map((category) => category.name)
        .join(", ")}`,
    );
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exitCode = 1;
  } finally {
    await db.$disconnect();
  }
}

main();
