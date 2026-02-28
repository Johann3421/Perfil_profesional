import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  console.log("Seed ejecutado correctamente. No hay datos iniciales que cargar.");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
