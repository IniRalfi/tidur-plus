<<<<<<< HEAD
export function hitungDenda(
  tglKembaliRencana: Date,
  tglKembaliAktual: Date,
  tarifPerHari: number
): { jumlahHariTelat: number; totalDenda: number } {
  const diffMs = tglKembaliAktual.getTime() - tglKembaliRencana.getTime()
  const jumlahHariTelat = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
  const totalDenda = jumlahHariTelat * tarifPerHari
  return { jumlahHariTelat, totalDenda }
}
=======
import prisma from "../lib/prisma";

export const hitungDenda = async (
  tanggalKembali: Date,
  batasKembali: Date
): Promise<number> => {
  const config = await prisma.konfigurasi.findFirst();
  const tarifPerHari = config?.tarifDenda ?? 1000;

  const selisihMs = tanggalKembali.getTime() - batasKembali.getTime();
  const selisihHari = Math.ceil(selisihMs / (1000 * 60 * 60 * 24));

  if (selisihHari <= 0) return 0;

  return selisihHari * tarifPerHari;
};

export const isTerlambat = (batasKembali: Date): boolean => {
  return new Date() > batasKembali;
};
>>>>>>> backend
