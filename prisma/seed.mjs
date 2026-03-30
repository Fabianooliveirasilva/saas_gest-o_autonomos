import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("Demo1234!", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@facturafacil.es" },
    update: {
      name: "Demo Autónomo",
      password: passwordHash,
    },
    create: {
      name: "Demo Autónomo",
      email: "demo@facturafacil.es",
      password: passwordHash,
    },
  });

  await prisma.invoice.deleteMany({ where: { userId: user.id } });
  await prisma.expense.deleteMany({ where: { userId: user.id } });

  await prisma.invoice.createMany({
    data: [
      {
        userId: user.id,
        clientName: "Estudio Creativo BCN",
        cifNif: "B12345678",
        series: "FF-2026",
        sequence: 1,
        invoiceNumber: "FF-2026-000001",
        amount: 1200,
        ivaPercent: 21,
        irpfPercent: 15,
        total: 1272,
        status: "emitida",
      },
      {
        userId: user.id,
        clientName: "Madrid Growth SL",
        cifNif: "B87654321",
        series: "FF-2026",
        sequence: 2,
        invoiceNumber: "FF-2026-000002",
        amount: 850,
        ivaPercent: 21,
        irpfPercent: 15,
        total: 901,
        status: "emitida",
      },
      {
        userId: user.id,
        clientName: "Valencia Digital Hub",
        cifNif: "B11223344",
        series: "FF-2026",
        sequence: 3,
        invoiceNumber: "FF-2026-000003",
        amount: 640,
        ivaPercent: 21,
        irpfPercent: 7,
        total: 729.6,
        status: "emitida",
      },
    ],
  });

  await prisma.expense.createMany({
    data: [
      {
        userId: user.id,
        description: "Suscripción software diseño",
        category: "herramientas",
        amount: 49.99,
      },
      {
        userId: user.id,
        description: "Alquiler coworking Madrid",
        category: "alquiler",
        amount: 220,
      },
      {
        userId: user.id,
        description: "Transporte cliente Barcelona",
        category: "transporte",
        amount: 38.5,
      },
      {
        userId: user.id,
        description: "Comida reunión comercial",
        category: "comida",
        amount: 24,
      },
    ],
  });

  console.log("Seed ejecutado correctamente.");
  console.log("Usuario demo: demo@facturafacil.es");
  console.log("Password demo: Demo1234!");
}

main()
  .catch((error) => {
    console.error("Error ejecutando seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
