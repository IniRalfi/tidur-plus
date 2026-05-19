// frontend/src/pages/admin/DendaPage.tsx
import { useState } from "react";

export default function DendaPage() {
  const [daftarDenda, setDaftarDenda] = useState([
    { id: 1, nama: "Nayla", judul: "Clean Code", total: 4000, status: "belum_lunas" },
    { id: 2, nama: "Timo", judul: "Refactoring Buku", total: 12000, status: "lunas" },
  ]);

  const handleTandaiLunas = (id: number) => {
    setDaftarDenda(prev =>
      prev.map(item => item.id === id ? { ...item, status: "lunas" } : item)
    );
  };

  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">DendaPage</h1>
        <p className="text-sm text-gray-500">Kelola pencatatan pembayaran denda keterlambatan buku secara tunai.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="p-4">Nama Anggota</th>
              <th className="p-4">Buku Terlambat</th>
              <th className="p-4">Total Tagihan</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {daftarDenda.map((denda) => (
              <tr key={denda.id} className="hover:bg-gray-50/40 transition-colors">
                <td className="p-4 font-medium text-gray-900">{denda.nama}</td>
                <td className="p-4 text-gray-600">{denda.judul}</td>
                <td className="p-4 font-semibold text-gray-900">Rp {denda.total.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${denda.status === "lunas" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                    {denda.status === "lunas" ? "Lunas" : "Belum Lunas"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {denda.status === "belum_lunas" && (
                    <button 
                      onClick={() => handleTandaiLunas(denda.id)}
                      className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors cursor-pointer"
                    >
                      Konfirmasi Bayar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}