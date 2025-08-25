import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const todos = await prisma.professor.findMany();
  console.log(todos);
}

main();
