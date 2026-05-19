import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ===========================
  // 1. KONFIGURASI DEFAULT
  // ===========================
  const konfigurasi = await prisma.konfigurasi.upsert({
    where: { id: "konfig-1" },
    update: {},
    create: {
      id: "konfig-1",
      tarifDenda: 1000,
      durasiPinjam: 14,
      maxPerpanjangan: 2,
    },
  });
  console.log("✅ Konfigurasi:", konfigurasi);

  // ===========================
  // 2. USERS
  // ===========================
  const superAdmin = await prisma.user.upsert({
    where: { id: "user-1" },
    update: {},
    create: {
      id: "user-1",
      nama: "Super Admin",
      email: "superadmin@tidurplus.com",
      roles: ["ANGGOTA", "SUPER_ADMIN"],
      aktif: true,
    },
  });
  console.log("✅ Super Admin:", superAdmin.email);

  const admin = await prisma.user.upsert({
    where: { id: "user-2" },
    update: {},
    create: {
      id: "user-2",
      nama: "Admin Pustakawan",
      email: "admin@tidurplus.com",
      roles: ["ANGGOTA", "ADMIN"],
      aktif: true,
    },
  });
  console.log("✅ Admin:", admin.email);

  const anggota1 = await prisma.user.upsert({
    where: { id: "user-3" },
    update: {},
    create: {
      id: "user-3",
      nama: "Budi Santoso",
      email: "budi@tidurplus.com",
      roles: ["ANGGOTA"],
      aktif: true,
    },
  });
  console.log("✅ Anggota 1:", anggota1.email);

  const anggota2 = await prisma.user.upsert({
    where: { id: "user-4" },
    update: {},
    create: {
      id: "user-4",
      nama: "Siti Rahayu",
      email: "siti@tidurplus.com",
      roles: ["ANGGOTA"],
      aktif: true,
    },
  });
  console.log("✅ Anggota 2:", anggota2.email);

  const anggotaNonaktif = await prisma.user.upsert({
    where: { id: "user-5" },
    update: {},
    create: {
      id: "user-5",
      nama: "Joko Susilo",
      email: "joko@tidurplus.com",
      roles: ["ANGGOTA"],
      aktif: false,  // nonaktif
    },
  });
  console.log("✅ Anggota Nonaktif:", anggotaNonaktif.email);

  // ===========================
  // 3. KATEGORI
  // ===========================
  const kategoriFiksi = await prisma.kategori.upsert({
    where: { id: "kat-1" },
    update: {},
    create: { id: "kat-1", nama: "Fiksi" },
  });

  const kategoriNonFiksi = await prisma.kategori.upsert({
    where: { id: "kat-2" },
    update: {},
    create: { id: "kat-2", nama: "Non-Fiksi" },
  });

  const kategoriSains = await prisma.kategori.upsert({
    where: { id: "kat-3" },
    update: {},
    create: { id: "kat-3", nama: "Sains & Teknologi" },
  });

  const kategoriSastra = await prisma.kategori.upsert({
    where: { id: "kat-4" },
    update: {},
    create: { id: "kat-4", nama: "Sastra" },
  });

  const kategoriSejarah = await prisma.kategori.upsert({
    where: { id: "kat-5" },
    update: {},
    create: { id: "kat-5", nama: "Sejarah" },
  });

  console.log("✅ Kategori: Fiksi, Non-Fiksi, Sains, Sastra, Sejarah");

  // ===========================
  // 4. BUKU
  // ===========================
  const buku1 = await prisma.buku.upsert({
    where: { id: "buku-1" },
    update: {},
    create: {
      id: "buku-1",
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      penerbit: "Bentang Pustaka",
      tahunTerbit: 2005,
      isbn: "978-979-22-9891-1",
      stok: 5,
      deskripsi: "Novel tentang perjuangan anak-anak Belitung.",
      kategoriId: "kat-1",
    },
  });

  const buku2 = await prisma.buku.upsert({
    where: { id: "buku-2" },
    update: {},
    create: {
      id: "buku-2",
      judul: "Bumi Manusia",
      penulis: "Pramoedya Ananta Toer",
      penerbit: "Lentera Dipantara",
      tahunTerbit: 1980,
      isbn: "978-979-22-9891-2",
      stok: 3,
      deskripsi: "Novel sejarah Indonesia di masa kolonial.",
      kategoriId: "kat-4",
    },
  });

  const buku3 = await prisma.buku.upsert({
    where: { id: "buku-3" },
    update: {},
    create: {
      id: "buku-3",
      judul: "Clean Code",
      penulis: "Robert C. Martin",
      penerbit: "Prentice Hall",
      tahunTerbit: 2008,
      isbn: "978-979-22-9891-3",
      stok: 2,
      deskripsi: "Panduan menulis kode yang bersih.",
      kategoriId: "kat-3",
    },
  });

  const buku4 = await prisma.buku.upsert({
    where: { id: "buku-4" },
    update: {},
    create: {
      id: "buku-4",
      judul: "Atomic Habits",
      penulis: "James Clear",
      penerbit: "Penguin",
      tahunTerbit: 2018,
      isbn: "978-979-22-9891-4",
      stok: 6,
      deskripsi: "Cara membangun kebiasaan baik.",
      kategoriId: "kat-2",
    },
  });

  const buku5 = await prisma.buku.upsert({
    where: { id: "buku-5" },
    update: {},
    create: {
      id: "buku-5",
      judul: "Sapiens",
      penulis: "Yuval Noah Harari",
      penerbit: "KPG",
      tahunTerbit: 2015,
      isbn: "978-979-22-9891-5",
      stok: 0,  // stok habis untuk testing
      deskripsi: "Riwayat singkat umat manusia.",
      kategoriId: "kat-5",
    },
  });

  console.log("✅ Buku: buku-1 sampai buku-5");

  // ===========================
  // 5. PEMINJAMAN
  // ===========================

  // Peminjaman MENUNGGU
  await prisma.peminjaman.upsert({
    where: { id: "pinjam-1" },
    update: {},
    create: {
      id: "pinjam-1",
      userId: "user-3",
      bukuId: "buku-1",
      status: "MENUNGGU",
      batasKembali: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      counterPerpanjangan: 0,
    },
  });

  // Peminjaman DIPINJAM
  await prisma.peminjaman.upsert({
    where: { id: "pinjam-2" },
    update: {},
    create: {
      id: "pinjam-2",
      userId: "user-3",
      bukuId: "buku-2",
      status: "DIPINJAM",
      tanggalPinjam: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      batasKembali: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
      counterPerpanjangan: 0,
    },
  });

  // Peminjaman DIKEMBALIKAN (terlambat → ada denda)
  await prisma.peminjaman.upsert({
    where: { id: "pinjam-3" },
    update: {},
    create: {
      id: "pinjam-3",
      userId: "user-4",
      bukuId: "buku-3",
      status: "DIKEMBALIKAN",
      tanggalPinjam: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      batasKembali: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      tanggalKembali: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      counterPerpanjangan: 1,
    },
  });

  // Peminjaman DITOLAK
  await prisma.peminjaman.upsert({
    where: { id: "pinjam-4" },
    update: {},
    create: {
      id: "pinjam-4",
      userId: "user-4",
      bukuId: "buku-4",
      status: "DITOLAK",
      counterPerpanjangan: 0,
    },
  });

  console.log("✅ Peminjaman: pinjam-1 sampai pinjam-4");

  // ===========================
  // 6. PERPANJANGAN
  // ===========================
  await prisma.perpanjangan.upsert({
    where: { id: "perpanjang-1" },
    update: {},
    create: {
      id: "perpanjang-1",
      peminjamanId: "pinjam-3",
      adminId: "user-2",
      jumlahHari: 3,
      status: "DISETUJUI",
      tglDiproses: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
  });

  console.log("✅ Perpanjangan: perpanjang-1");

  // ===========================
  // 7. DENDA
  // ===========================
  await prisma.denda.upsert({
    where: { id: "denda-1" },
    update: {},
    create: {
      id: "denda-1",
      peminjamanId: "pinjam-3",
      jumlah: 5000,
      jumlahHariTelat: 5,
      tarifPerHari: 1000,
      status: "BELUM_LUNAS",
    },
  });

  console.log("✅ Denda: denda-1");

  console.log("\n🎉 Seeding selesai!");
  console.log("================================");
  console.log("👤 Users:");
  console.log("   user-1 → Super Admin  (roles: ANGGOTA, SUPER_ADMIN)");
  console.log("   user-2 → Admin        (roles: ANGGOTA, ADMIN)");
  console.log("   user-3 → Budi         (roles: ANGGOTA) aktif");
  console.log("   user-4 → Siti         (roles: ANGGOTA) aktif");
  console.log("   user-5 → Joko         (roles: ANGGOTA) nonaktif");
  console.log("📚 Kategori : kat-1 sampai kat-5");
  console.log("📖 Buku     : buku-1 sampai buku-5");
  console.log("📋 Peminjaman: pinjam-1 sampai pinjam-4");
  console.log("🔄 Perpanjangan: perpanjang-1");
  console.log("💸 Denda    : denda-1 (BELUM_LUNAS)");
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