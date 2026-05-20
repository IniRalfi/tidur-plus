-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ANGGOTA', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "StatusPeminjaman" AS ENUM ('MENUNGGU', 'DIPINJAM', 'DIKEMBALIKAN', 'DITOLAK');

-- CreateEnum
CREATE TYPE "StatusPerpanjangan" AS ENUM ('MENUNGGU', 'DISETUJUI', 'DITOLAK');

-- CreateEnum
CREATE TYPE "StatusDenda" AS ENUM ('BELUM_LUNAS', 'LUNAS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleId" TEXT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "foto" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ANGGOTA',
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buku" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "penerbit" TEXT,
    "tahunTerbit" INTEGER,
    "isbn" TEXT,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "cover" TEXT,
    "deskripsi" TEXT,
    "kategoriId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Peminjaman" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bukuId" TEXT NOT NULL,
    "tanggalPinjam" TIMESTAMP(3),
    "tanggalKembali" TIMESTAMP(3),
    "batasKembali" TIMESTAMP(3),
    "status" "StatusPeminjaman" NOT NULL DEFAULT 'MENUNGGU',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perpanjangan" (
    "id" TEXT NOT NULL,
    "peminjamanId" TEXT NOT NULL,
    "jumlahHari" INTEGER NOT NULL DEFAULT 3,
    "status" "StatusPerpanjangan" NOT NULL DEFAULT 'MENUNGGU',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perpanjangan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Denda" (
    "id" TEXT NOT NULL,
    "peminjamanId" TEXT NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "status" "StatusDenda" NOT NULL DEFAULT 'BELUM_LUNAS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Denda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Konfigurasi" (
    "id" TEXT NOT NULL,
    "tarifDenda" DOUBLE PRECISION NOT NULL DEFAULT 1000,
    "durasiPinjam" INTEGER NOT NULL DEFAULT 7,
    "maxPerpanjangan" INTEGER NOT NULL DEFAULT 2,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Konfigurasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "aksi" TEXT NOT NULL,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kategori_nama_key" ON "Kategori"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Buku_isbn_key" ON "Buku"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Denda_peminjamanId_key" ON "Denda"("peminjamanId");

-- AddForeignKey
ALTER TABLE "Buku" ADD CONSTRAINT "Buku_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_bukuId_fkey" FOREIGN KEY ("bukuId") REFERENCES "Buku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perpanjangan" ADD CONSTRAINT "Perpanjangan_peminjamanId_fkey" FOREIGN KEY ("peminjamanId") REFERENCES "Peminjaman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denda" ADD CONSTRAINT "Denda_peminjamanId_fkey" FOREIGN KEY ("peminjamanId") REFERENCES "Peminjaman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
