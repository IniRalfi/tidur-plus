import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/modules/auth/auth.service";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Menjalankan seeder database...\n");

  // ─── 1. KONFIGURASI ──────────────────────────────────────────────────────────
  const config = await prisma.konfigurasi.findFirst();
  if (!config) {
    await prisma.konfigurasi.create({
      data: { tarifDenda: 1000, durasiPinjam: 14, maxPerpanjangan: 2 },
    });
    console.log("✅ Konfigurasi default dibuat");
  } else {
    console.log("⏭️  Konfigurasi sudah ada, skip");
  }

  // ─── 2. ADMIN & SUPERADMIN ───────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@tidurplus.id";
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "superadmin@tidurplus.id";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      nama: "Admin Perpustakaan",
      email: adminEmail,
      password: await hashPassword(process.env.ADMIN_PASSWORD || "admin123"),
      roles: ["ADMIN"],
    },
  });
  console.log(`✅ Admin: ${adminEmail}`);

  const superAdmin = await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      nama: "Super Admin",
      email: superAdminEmail,
      password: await hashPassword(process.env.SUPER_ADMIN_PASSWORD || "superadmin123"),
      roles: ["SUPER_ADMIN"],
    },
  });
  console.log(`✅ Super Admin: ${superAdminEmail}`);

  // ─── 3. ANGGOTA ──────────────────────────────────────────────────────────────
  const anggotaData = [
    { nama: "Budi Santoso", email: "budi@example.com" },
    { nama: "Siti Rahayu", email: "siti@example.com" },
    { nama: "Ahmad Fauzi", email: "ahmad@example.com" },
    { nama: "Dewi Lestari", email: "dewi@example.com" },
    { nama: "Rizki Pratama", email: "rizki@example.com" },
    { nama: "Putri Handayani", email: "putri@example.com" },
    { nama: "Eko Wahyudi", email: "eko@example.com" },
    { nama: "Rina Kusuma", email: "rina@example.com" },
  ];

  const anggotaList: any[] = [];
  for (const data of anggotaData) {
    const u = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        nama: data.nama,
        email: data.email,
        password: await hashPassword("password123"),
        roles: ["ANGGOTA"],
      },
    });
    anggotaList.push(u);
  }
  console.log(`✅ ${anggotaList.length} anggota dibuat`);

  // ─── 4. KATEGORI ─────────────────────────────────────────────────────────────
  const kategoriNama = [
    "Fiksi",
    "Non-Fiksi",
    "Sains & Teknologi",
    "Sejarah",
    "Filsafat",
    "Ekonomi & Bisnis",
    "Seni & Budaya",
    "Pendidikan",
    "Kesehatan",
    "Agama & Spiritual",
  ];

  const kategoriList: any[] = [];
  for (const nama of kategoriNama) {
    const k = await prisma.kategori.upsert({
      where: { nama },
      update: {},
      create: { nama },
    });
    kategoriList.push(k);
  }
  console.log(`✅ ${kategoriList.length} kategori dibuat`);

  // Helper: cari kategori by nama
  const getKat = (nama: string) => kategoriList.find((k) => k.nama === nama)!;

  // ─── 5. BUKU ─────────────────────────────────────────────────────────────────
  const bukuData = [
    {
      judul: "Bumi Manusia",
      penulis: "Pramoedya Ananta Toer",
      penerbit: "Lentera Dipantara",
      tahunTerbit: 2005,
      isbn: "9789799731234",
      stok: 5,
      kategoriId: getKat("Fiksi").id,
      deskripsi: "Novel pertama dari Tetralogi Buru karya Pramoedya Ananta Toer.",
    },
    {
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      penerbit: "Bentang Pustaka",
      tahunTerbit: 2005,
      isbn: "9789799922017",
      stok: 8,
      kategoriId: getKat("Fiksi").id,
      deskripsi: "Kisah persahabatan anak-anak di Belitung.",
    },
    {
      judul: "Dilan: Dia adalah Dilanku Tahun 1990",
      penulis: "Pidi Baiq",
      penerbit: "Pastel Books",
      tahunTerbit: 2014,
      isbn: "9786020319100",
      stok: 6,
      kategoriId: getKat("Fiksi").id,
      deskripsi: "Kisah cinta remaja di era 90-an.",
    },
    {
      judul: "Sapiens: Riwayat Singkat Umat Manusia",
      penulis: "Yuval Noah Harari",
      penerbit: "KPG",
      tahunTerbit: 2017,
      isbn: "9786020319101",
      stok: 4,
      kategoriId: getKat("Sejarah").id,
      deskripsi: "Sejarah perjalanan umat manusia dari perspektif baru.",
    },
    {
      judul: "Atomic Habits",
      penulis: "James Clear",
      penerbit: "Gramedia",
      tahunTerbit: 2019,
      isbn: "9786020319102",
      stok: 7,
      kategoriId: getKat("Non-Fiksi").id,
      deskripsi: "Panduan membangun kebiasaan baik dan menghilangkan kebiasaan buruk.",
    },
    {
      judul: "Clean Code",
      penulis: "Robert C. Martin",
      penerbit: "Prentice Hall",
      tahunTerbit: 2008,
      isbn: "9780132350884",
      stok: 3,
      kategoriId: getKat("Sains & Teknologi").id,
      deskripsi: "Panduan menulis kode yang bersih dan mudah dipahami.",
    },
    {
      judul: "Filosofi Teras",
      penulis: "Henry Manampiring",
      penerbit: "Kompas",
      tahunTerbit: 2018,
      isbn: "9786020319103",
      stok: 5,
      kategoriId: getKat("Filsafat").id,
      deskripsi: "Filosofi Stoa untuk menghadapi tantangan hidup.",
    },
    {
      judul: "Rich Dad Poor Dad",
      penulis: "Robert T. Kiyosaki",
      penerbit: "Gramedia",
      tahunTerbit: 2000,
      isbn: "9786020319104",
      stok: 6,
      kategoriId: getKat("Ekonomi & Bisnis").id,
      deskripsi: "Pelajaran tentang keuangan dari dua ayah yang berbeda.",
    },
    {
      judul: "Sejarah Indonesia Modern",
      penulis: "M.C. Ricklefs",
      penerbit: "UGM Press",
      tahunTerbit: 2011,
      isbn: "9786020319105",
      stok: 4,
      kategoriId: getKat("Sejarah").id,
      deskripsi: "Sejarah Indonesia dari abad ke-16 hingga era modern.",
    },
    {
      judul: "Ikigai: Rahasia Panjang Umur",
      penulis: "Héctor García",
      penerbit: "GPU",
      tahunTerbit: 2018,
      isbn: "9786020319106",
      stok: 5,
      kategoriId: getKat("Kesehatan").id,
      deskripsi: "Filosofi Jepang tentang menemukan makna hidup.",
    },
    {
      judul: "Pendidikan Karakter",
      penulis: "Thomas Lickona",
      penerbit: "Bumi Aksara",
      tahunTerbit: 2012,
      isbn: "9786020319107",
      stok: 3,
      kategoriId: getKat("Pendidikan").id,
      deskripsi: "Panduan mendidik anak dengan karakter yang kuat.",
    },
    {
      judul: "The Alchemist",
      penulis: "Paulo Coelho",
      penerbit: "GPU",
      tahunTerbit: 2006,
      isbn: "9786020319108",
      stok: 7,
      kategoriId: getKat("Fiksi").id,
      deskripsi: "Petualangan seorang gembala muda mencari harta karun.",
    },
    {
      judul: "Homo Deus",
      penulis: "Yuval Noah Harari",
      penerbit: "KPG",
      tahunTerbit: 2018,
      isbn: "9786020319109",
      stok: 4,
      kategoriId: getKat("Sains & Teknologi").id,
      deskripsi: "Visi masa depan umat manusia dan teknologi.",
    },
    {
      judul: "Seni Berpikir Jernih",
      penulis: "Rolf Dobelli",
      penerbit: "GPU",
      tahunTerbit: 2013,
      isbn: "9786020319110",
      stok: 5,
      kategoriId: getKat("Filsafat").id,
      deskripsi: "52 bias kognitif yang harus dihindari.",
    },
    {
      judul: "Zero to One",
      penulis: "Peter Thiel",
      penerbit: "GPU",
      tahunTerbit: 2014,
      isbn: "9786020319111",
      stok: 4,
      kategoriId: getKat("Ekonomi & Bisnis").id,
      deskripsi: "Catatan tentang startup dan bagaimana membangun masa depan.",
    },
  ];

  const bukuList: any[] = [];
  for (const data of bukuData) {
    const existing = await prisma.buku.findUnique({ where: { isbn: data.isbn } });
    if (!existing) {
      const b = await prisma.buku.create({ data });
      bukuList.push(b);
    } else {
      bukuList.push(existing);
    }
  }
  console.log(`✅ ${bukuList.length} buku tersedia`);

  // ─── 6. PEMINJAMAN ────────────────────────────────────────────────────────────
  const now = new Date();
  const daysAgo = (d: number) => {
    const t = new Date(now);
    t.setDate(t.getDate() - d);
    return t;
  };
  const daysFromNow = (d: number) => {
    const t = new Date(now);
    t.setDate(t.getDate() + d);
    return t;
  };

  // Peminjaman DIKEMBALIKAN (selesai, riwayat)
  const peminjamanSelesaiData = [
    {
      userId: anggotaList[0].id,
      bukuId: bukuList[0].id,
      tanggalPinjam: daysAgo(30),
      batasKembali: daysAgo(16),
      tanggalKembali: daysAgo(18),
      status: "DIKEMBALIKAN" as any,
    },
    {
      userId: anggotaList[0].id,
      bukuId: bukuList[2].id,
      tanggalPinjam: daysAgo(20),
      batasKembali: daysAgo(6),
      tanggalKembali: daysAgo(8),
      status: "DIKEMBALIKAN" as any,
    },
    {
      userId: anggotaList[1].id,
      bukuId: bukuList[1].id,
      tanggalPinjam: daysAgo(25),
      batasKembali: daysAgo(11),
      tanggalKembali: daysAgo(14),
      status: "DIKEMBALIKAN" as any,
    },
    {
      userId: anggotaList[2].id,
      bukuId: bukuList[3].id,
      tanggalPinjam: daysAgo(40),
      batasKembali: daysAgo(26),
      tanggalKembali: daysAgo(28),
      status: "DIKEMBALIKAN" as any,
    },
    {
      userId: anggotaList[3].id,
      bukuId: bukuList[4].id,
      tanggalPinjam: daysAgo(15),
      batasKembali: daysAgo(1),
      tanggalKembali: daysAgo(3),
      status: "DIKEMBALIKAN" as any,
    },
  ];

  for (const data of peminjamanSelesaiData) {
    const exists = await prisma.peminjaman.findFirst({
      where: { userId: data.userId, bukuId: data.bukuId, status: "DIKEMBALIKAN" },
    });
    if (!exists) {
      await prisma.peminjaman.create({ data });
    }
  }
  console.log(`✅ ${peminjamanSelesaiData.length} peminjaman selesai dibuat`);

  // Peminjaman DIPINJAM (sedang berjalan)
  const peminjamanAktifData = [
    {
      userId: anggotaList[0].id,
      bukuId: bukuList[5].id,
      tanggalPinjam: daysAgo(5),
      batasKembali: daysFromNow(9),
      status: "DIPINJAM" as any,
    },
    {
      userId: anggotaList[1].id,
      bukuId: bukuList[6].id,
      tanggalPinjam: daysAgo(3),
      batasKembali: daysFromNow(11),
      status: "DIPINJAM" as any,
    },
    {
      userId: anggotaList[2].id,
      bukuId: bukuList[7].id,
      tanggalPinjam: daysAgo(10),
      batasKembali: daysFromNow(4),
      status: "DIPINJAM" as any,
    },
    {
      userId: anggotaList[4].id,
      bukuId: bukuList[8].id,
      tanggalPinjam: daysAgo(7),
      batasKembali: daysFromNow(7),
      status: "DIPINJAM" as any,
    },
    {
      userId: anggotaList[5].id,
      bukuId: bukuList[9].id,
      tanggalPinjam: daysAgo(2),
      batasKembali: daysFromNow(12),
      status: "DIPINJAM" as any,
    },
  ];

  // Kurangi stok untuk yang DIPINJAM
  for (const data of peminjamanAktifData) {
    const exists = await prisma.peminjaman.findFirst({
      where: { userId: data.userId, bukuId: data.bukuId, status: "DIPINJAM" },
    });
    if (!exists) {
      await prisma.peminjaman.create({ data });
      await prisma.buku.update({ where: { id: data.bukuId }, data: { stok: { decrement: 1 } } });
    }
  }
  console.log(`✅ ${peminjamanAktifData.length} peminjaman aktif dibuat`);

  // Peminjaman MENUNGGU (belum disetujui)
  const peminjamanMenungguData = [
    {
      userId: anggotaList[6].id,
      bukuId: bukuList[10].id,
      batasKembali: daysFromNow(14),
      status: "MENUNGGU" as any,
    },
    {
      userId: anggotaList[7].id,
      bukuId: bukuList[11].id,
      batasKembali: daysFromNow(14),
      status: "MENUNGGU" as any,
    },
    {
      userId: anggotaList[3].id,
      bukuId: bukuList[12].id,
      batasKembali: daysFromNow(14),
      status: "MENUNGGU" as any,
    },
  ];

  for (const data of peminjamanMenungguData) {
    const exists = await prisma.peminjaman.findFirst({
      where: { userId: data.userId, bukuId: data.bukuId, status: "MENUNGGU" },
    });
    if (!exists) {
      await prisma.peminjaman.create({ data });
    }
  }
  console.log(`✅ ${peminjamanMenungguData.length} peminjaman menunggu dibuat`);

  // ─── 7. DENDA ─────────────────────────────────────────────────────────────────
  // Cari peminjaman yang sudah dikembalikan terlambat dan buat denda
  // Budi: pinjam batasKembali daysAgo(16), kembali daysAgo(18) → 2 hari LEBIH AWAL, tidak denda
  // Tambah denda manual untuk contoh
  const peminjamanUntukDenda = await prisma.peminjaman.findFirst({
    where: { userId: anggotaList[1].id, status: "DIKEMBALIKAN" },
  });

  if (peminjamanUntukDenda) {
    const existingDenda = await prisma.denda.findUnique({
      where: { peminjamanId: peminjamanUntukDenda.id },
    });
    if (!existingDenda) {
      await prisma.denda.create({
        data: {
          peminjamanId: peminjamanUntukDenda.id,
          jumlah: 3000,
          jumlahHariTelat: 3,
          tarifPerHari: 1000,
          status: "BELUM_LUNAS",
        },
      });
      console.log("✅ 1 contoh denda BELUM_LUNAS dibuat");
    }
  }

  // Denda yang sudah lunas (untuk contoh riwayat)
  const peminjamanUntukDendaLunas = await prisma.peminjaman.findFirst({
    where: { userId: anggotaList[2].id, status: "DIKEMBALIKAN" },
  });

  if (peminjamanUntukDendaLunas) {
    const existingDenda = await prisma.denda.findUnique({
      where: { peminjamanId: peminjamanUntukDendaLunas.id },
    });
    if (!existingDenda) {
      await prisma.denda.create({
        data: {
          peminjamanId: peminjamanUntukDendaLunas.id,
          jumlah: 2000,
          jumlahHariTelat: 2,
          tarifPerHari: 1000,
          status: "LUNAS",
          tglLunas: daysAgo(5),
        },
      });
      console.log("✅ 1 contoh denda LUNAS dibuat");
    }
  }

  // ─── 8. AUDIT LOG ────────────────────────────────────────────────────────────
  await prisma.auditLog.createMany({
    data: [
      { userId: admin.id, aksi: "LOGIN", detail: "Admin login pertama kali" },
      {
        userId: admin.id,
        aksi: "APPROVE_PEMINJAMAN",
        detail: "Menyetujui peminjaman Budi Santoso",
      },
      {
        userId: superAdmin.id,
        aksi: "UPDATE_KONFIGURASI",
        detail: "Mengubah tarif denda menjadi 1000/hari",
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Audit log dibuat");

  // ─── RINGKASAN ───────────────────────────────────────────────────────────────
  console.log("\n🎉 Seeder selesai!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📋 Akun yang bisa dipakai untuk testing:");
  console.log(`   Admin       : ${adminEmail} / admin123`);
  console.log(`   Superadmin  : ${superAdminEmail} / superadmin123`);
  console.log(`   Anggota     : budi@example.com / password123`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => {
    console.error("❌ Seeder error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
