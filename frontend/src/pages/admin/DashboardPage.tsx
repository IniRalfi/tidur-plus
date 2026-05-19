// frontend/src/pages/admin/DashboardPage.tsx

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">DashboardPage</h1>
        <p className="text-sm text-gray-500">Ringkasan aktivitas operasional perpustakaan hari ini.</p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-2xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Total Koleksi Buku</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,240 <span className="text-xs font-normal text-gray-400">eks</span></p>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-2xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Pesanan Dipesan</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">12 <span className="text-xs font-normal text-gray-400">buku</span></p>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-2xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Sedang Dipinjam</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">45 <span className="text-xs font-normal text-gray-400">buku</span></p>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-2xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Total Denda Pending</p>
          <p className="text-2xl font-bold text-red-600 mt-2">Rp 120,000</p>
        </div>
      </div>

      {/* Aktivitas Terbaru (Placeholder) */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Log Transaksi Terkini</h2>
        <p className="text-xs text-gray-400">Belum ada aktivitas transaksi terbaru.</p>
      </div>
    </main>
  );
}