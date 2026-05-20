/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['ANGGOTA']::"Role"[];

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "Buku_kategoriId_idx" ON "Buku"("kategoriId");

-- CreateIndex
CREATE INDEX "Buku_judul_idx" ON "Buku"("judul");

-- CreateIndex
CREATE INDEX "Buku_penulis_idx" ON "Buku"("penulis");

-- CreateIndex
CREATE INDEX "Buku_stok_idx" ON "Buku"("stok");

-- CreateIndex
CREATE INDEX "Denda_adminId_idx" ON "Denda"("adminId");

-- CreateIndex
CREATE INDEX "Peminjaman_userId_idx" ON "Peminjaman"("userId");

-- CreateIndex
CREATE INDEX "Peminjaman_bukuId_idx" ON "Peminjaman"("bukuId");

-- CreateIndex
CREATE INDEX "Peminjaman_batasKembali_idx" ON "Peminjaman"("batasKembali");

-- CreateIndex
CREATE INDEX "Perpanjangan_peminjamanId_idx" ON "Perpanjangan"("peminjamanId");

-- CreateIndex
CREATE INDEX "Perpanjangan_adminId_idx" ON "Perpanjangan"("adminId");

-- CreateIndex
CREATE INDEX "User_aktif_idx" ON "User"("aktif");
