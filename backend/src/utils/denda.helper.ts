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
