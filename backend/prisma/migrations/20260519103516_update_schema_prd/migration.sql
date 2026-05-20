/*
  Warnings:

  - Added the required column `jumlahHariTelat` to the `Denda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tarifPerHari` to the `Denda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Denda" ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "jumlahHariTelat" INTEGER NOT NULL,
ADD COLUMN     "tarifPerHari" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tglLunas" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Konfigurasi" ALTER COLUMN "durasiPinjam" SET DEFAULT 14;

-- AlterTable
ALTER TABLE "Peminjaman" ADD COLUMN     "counterPerpanjangan" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Perpanjangan" ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "tglDiproses" TIMESTAMP(3),
ALTER COLUMN "jumlahHari" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Perpanjangan" ADD CONSTRAINT "Perpanjangan_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denda" ADD CONSTRAINT "Denda_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
