import { useQuery } from "@tanstack/react-query";
import { bukuService } from "../../lib/buku.service";
import { peminjamanService } from "../../lib/peminjaman.service";
import { dendaService } from "../../lib/denda.service";

export default function DashboardPage() {
  const { data: bukuList = [] } = useQuery({
    queryKey: ["katalog"],
    queryFn: bukuService.getAll,
  });

  const { data: peminjamanList = [] } = useQuery({
    queryKey: ["admin-peminjaman"],
    queryFn: peminjamanService.getAdminAll,
  });

  const { data: dendaList = [] } = useQuery({
    queryKey: ["admin-denda"],
    queryFn: dendaService.getAllAdmin,
  });

  const totalBuku = bukuList.length;
  const pesanan = peminjamanList.filter((p: any) => p.status === "MENUNGGU").length;
  const dipinjam = peminjamanList.filter((p: any) => p.status === "DIPINJAM").length;
  
  const totalDendaPending = dendaList
    .filter((d: any) => d.status === "BELUM_LUNAS")
    .reduce((sum: number, current: any) => sum + Number(current.jumlah), 0);

  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Admin</h1>
        <p className="text-sm text-gray-500">Ringkasan aktivitas operasional perpustakaan hari ini.</p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-2xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Total Koleksi Buku</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalBuku} <span className="text-xs font-normal text-gray-400">eks</span></p>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-2xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Pesanan Menunggu</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">{pesanan} <span className="text-xs font-normal text-gray-400">buku</span></p>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-2xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Sedang Dipinjam</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{dipinjam} <span className="text-xs font-normal text-gray-400">buku</span></p>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-2xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Total Denda Pending</p>
          <p className="text-2xl font-bold text-red-600 mt-2">Rp {totalDendaPending.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {/* Aktivitas Terbaru (Placeholder) */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Log Transaksi Terkini</h2>
        <p className="text-xs text-gray-400">Pembaruan transaksi akan tampil di sini pada iterasi selanjutnya.</p>
      </div>
    </main>
  );
}