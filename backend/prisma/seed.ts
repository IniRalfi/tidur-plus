<<<<<<< HEAD
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@perpustakaan.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'superadmin@perpustakaan.com',
      role: Role.super_admin,
    },
  })
  console.log('Super Admin seeded:', superAdmin.email)

  // Seed default Konfigurasi
  const configs = [
    { key: 'tarif_denda_per_hari', value: '1000' },
    { key: 'durasi_pinjam_default', value: '14' },
    { key: 'maks_buku_per_anggota', value: '2' },
    { key: 'maks_perpanjangan', value: '2' },
  ]
  for (const config of configs) {
    await prisma.konfigurasi.upsert({
      where: { key: config.key },
      update: {},
      create: { ...config, updatedBy: superAdmin.id },
    })
  }
  console.log('Konfigurasi default seeded')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
=======
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // =============================
  // 1. KONFIGURASI DEFAULT
  // =============================
  const konfigurasi = await prisma.konfigurasi.upsert({
    where: { id: "konfigurasi-default" },
    update: {},
    create: {
      id: "konfigurasi-default",
      tarifDenda: 1000,
      durasiPinjam: 14,
      maxPerpanjangan: 2,
    },
  });
  console.log("Konfigurasi default:", konfigurasi);

  // =============================
  // 2. SUPER ADMIN
  // =============================
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@tidurplus.com" },
    update: {},
    create: {
      nama: "Super Admin",
      email: "superadmin@tidurplus.com",
      role: "SUPER_ADMIN",
      aktif: true,
    },
  });
  console.log("Super Admin:", superAdmin);

  // =============================
  // 3. ADMIN / PUSTAKAWAN
  // =============================
  const admin = await prisma.user.upsert({
    where: { email: "admin@tidurplus.com" },
    update: {},
    create: {
      nama: "Admin Pustakawan",
      email: "admin@tidurplus.com",
      role: "ADMIN",
      aktif: true,
    },
  });
  console.log("Admin:", admin);

  // =============================
  // 4. KATEGORI BUKU
  // =============================
  const kategoriFiksi = await prisma.kategori.upsert({
    where: { nama: "Fiksi" },
    update: {},
    create: { nama: "Fiksi" },
  });

  const kategoriNonFiksi = await prisma.kategori.upsert({
    where: { nama: "Non-Fiksi" },
    update: {},
    create: { nama: "Non-Fiksi" },
  });

  const kategoriSains = await prisma.kategori.upsert({
    where: { nama: "Sains & Teknologi" },
    update: {},
    create: { nama: "Sains & Teknologi" },
  });

  const kategoriSejarah = await prisma.kategori.upsert({
    where: { nama: "Sejarah" },
    update: {},
    create: { nama: "Sejarah" },
  });

  const kategoriSastra = await prisma.kategori.upsert({
    where: { nama: "Sastra" },
    update: {},
    create: { nama: "Sastra" },
  });

  console.log("Kategori:", [
    kategoriFiksi.nama,
    kategoriNonFiksi.nama,
    kategoriSains.nama,
    kategoriSejarah.nama,
    kategoriSastra.nama,
  ]);

  // =============================
  // 5. CONTOH BUKU
  // =============================
  const buku1 = await prisma.buku.upsert({
    where: { isbn: "978-979-22-9891-5" },
    update: {},
    create: {
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      penerbit: "Bentang Pustaka",
      tahunTerbit: 2005,
      isbn: "978-979-22-9891-5",
      stok: 5,
      deskripsi: "Novel tentang perjuangan anak-anak Belitung meraih mimpi.",
      kategoriId: kategoriFiksi.id,
    },
  });

  const buku2 = await prisma.buku.upsert({
    where: { isbn: "978-979-22-9892-2" },
    update: {},
    create: {
      judul: "Bumi Manusia",
      penulis: "Pramoedya Ananta Toer",
      penerbit: "Lentera Dipantara",
      tahunTerbit: 1980,
      isbn: "978-979-22-9892-2",
      stok: 3,
      deskripsi: "Novel sejarah Indonesia di masa kolonial Belanda.",
      kategoriId: kategoriSastra.id,
    },
  });

  const buku3 = await prisma.buku.upsert({
    where: { isbn: "978-979-22-9893-9" },
    update: {},
    create: {
      judul: "Sapiens: Riwayat Singkat Umat Manusia",
      penulis: "Yuval Noah Harari",
      penerbit: "KPG",
      tahunTerbit: 2015,
      isbn: "978-979-22-9893-9",
      stok: 4,
      deskripsi: "Sejarah perjalanan manusia dari zaman purba hingga modern.",
      kategoriId: kategoriSejarah.id,
    },
  });

  const buku4 = await prisma.buku.upsert({
    where: { isbn: "978-979-22-9894-6" },
    update: {},
    create: {
      judul: "Clean Code",
      penulis: "Robert C. Martin",
      penerbit: "Prentice Hall",
      tahunTerbit: 2008,
      isbn: "978-979-22-9894-6",
      stok: 2,
      deskripsi: "Panduan menulis kode yang bersih dan mudah dipelihara.",
      kategoriId: kategoriSains.id,
    },
  });

  const buku5 = await prisma.buku.upsert({
    where: { isbn: "978-979-22-9895-3" },
    update: {},
    create: {
      judul: "Atomic Habits",
      penulis: "James Clear",
      penerbit: "Penguin",
      tahunTerbit: 2018,
      isbn: "978-979-22-9895-3",
      stok: 6,
      deskripsi: "Cara membangun kebiasaan baik dan menghilangkan kebiasaan buruk.",
      kategoriId: kategoriNonFiksi.id,
    },
  });

  console.log("Buku:", [
    buku1.judul,
    buku2.judul,
    buku3.judul,
    buku4.judul,
    buku5.judul,
  ]);

  console.log("\n🎉 Seeding selesai!");
  console.log("================================");
  console.log("Super Admin : superadmin@tidurplus.com");
  console.log("Admin       : admin@tidurplus.com");
  console.log("Tarif Denda : Rp 1.000/hari");
  console.log("Durasi Pinjam: 14 hari");
  console.log("Max Perpanjangan: 2x");
  console.log("================================");
}

main()
  .catch((e) => {
    console.error("❌ Seeding gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
>>>>>>> backend
