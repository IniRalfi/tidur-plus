import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/modules/auth/auth.service";

const prisma = new PrismaClient();

async function main() {
  console.log("Menjalankan seeder database...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@tidurplus.id";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "superadmin@tidurplus.id";
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || "superadmin123";

  // Upsert Admin
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      nama: "Admin Perpustakaan",
      email: adminEmail,
      password: await hashPassword(adminPassword),
      roles: ["ADMIN"],
    },
  });
  console.log(`✅ Admin seed: ${adminEmail}`);

  // Upsert Super Admin
  await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      nama: "Super Admin",
      email: superAdminEmail,
      password: await hashPassword(superAdminPassword),
      roles: ["SUPER_ADMIN"],
    },
  });
  console.log(`✅ Super Admin seed: ${superAdminEmail}`);

  // Default configuration if not exist
  const config = await prisma.konfigurasi.findFirst();
  if (!config) {
    await prisma.konfigurasi.create({
      data: {
        tarifDenda: 1000,
        durasiPinjam: 14,
        maxPerpanjangan: 2,
      },
    });
    console.log("✅ Konfigurasi default ditambahkan");
  }

  console.log("🎉 Seeder selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
