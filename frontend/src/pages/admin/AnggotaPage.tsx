// frontend/src/pages/admin/AnggotaPage.tsx
import { useState } from "react";

export default function AnggotaPage() {
  const [anggota] = useState([
    { id: 1, nama: "Sheren Frontend", email: "sheren@tidurplus.com", statusPinjam: "2 Buku Aktif" },
    { id: 2, nama: "Naomy Auth", email: "naomy@tidurplus.com", statusPinjam: "Bebas Pinjam" },
  ]);

  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">AnggotaPage</h1>
        <p className="text-sm text-gray-500">Daftar pengguna dengan hak akses sebagai Anggota perpustakaan.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="p-4">Nama Anggota</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status Transaksi</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {anggota.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/40 transition-colors">
                <td className="p-4 font-medium text-gray-900">{user.nama}</td>
                <td className="p-4 text-gray-500">{user.email}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-sm font-medium ${user.statusPinjam.includes("2") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                    {user.statusPinjam}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}