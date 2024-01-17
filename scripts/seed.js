const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const CATEGORIES = [
  {
    name: "Famous People",
  },
  {
    name: "Movies & TV",
  },
  {
    name: "Musicians",
  },
  {
    name: "Games",
  },
  {
    name: "Animals",
  },
  {
    name: "Philosophy",
  },
  {
    name: "Scientists",
  },
];

async function main() {
  try {
    await db.category.createMany({
      data: CATEGORIES,
    });

    console.log("Categories seeded successfully to database.");
  } catch (error) {
    console.error("Error seeding default categories: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
