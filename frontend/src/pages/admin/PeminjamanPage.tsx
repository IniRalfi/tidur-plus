// frontend/src/pages/admin/PeminjamanPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Peminjaman {
  id: string;
  namaAnggota: string;
  judulBuku: string;
  tglPinjam: string;
  tglKembaliRencana: string;
  status: "Dipesan" | "Dipinjam" | "Dikembalikan" | "Ditolak";
}

export default function PeminjamanPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>("Semua Status");

  const [dataPeminjaman, setDataPeminjaman] = useState<Peminjaman[]>([
    { id: "PMJ-001", namaAnggota: "Christina S.", judulBuku: "Laskar Pelangi", tglPinjam: "20 Mei 2026", tglKembaliRencana: "03 Juni 2026", status: "Dipesan" },
    { id: "PMJ-002", namaAnggota: "Rodi R.", judulBuku: "Bumi Manusia", tglPinjam: "14 Mei 2026", tglKembaliRencana: "28 Mei 2026", status: "Dipinjam" },
    { id: "PMJ-003", namaAnggota: "Citra M.", judulBuku: "Perahu Kertas", tglPinjam: "01 Mei 2026", tglKembaliRencana: "15 Mei 2026", status: "Dikembalikan" }
  ]);

  const handleSetujui = (id: string) => {
    setDataPeminjaman(prev => prev.map(item => item.id === id ? { ...item, status: "Dipinjam" } : item));
  };

  const handleTolak = (id: string) => {
    setDataPeminjaman(prev => prev.map(item => item.id === id ? { ...item, status: "Ditolak" } : item));
  };

  const handleSelesai = (id: string) => {
    setDataPeminjaman(prev => prev.map(item => item.id === id ? { ...item, status: "Dikembalikan" } : item));
  };

  const dataTersaring = dataPeminjaman.filter(item => {
    if (filterStatus === "Semua Status") return true;
    return item.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Bagian Atas: Ringkasan Judul & Filter Dropdown (Teks diganti abu-abu gelap agar terbaca jelas) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-wide">Daftar Transaksi Peminjaman</h2>
          <p className="text-xs text-slate-500 mt-0.5">Kelola permohonan booking, validasi peminjaman, dan pengembalian buku.</p>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-slate-200 text-xs text-slate-700 rounded-lg px-3 py-2 outline-none focus:border-slate-400 cursor-pointer shadow-2xs"
          >
            <option value="Semua Status">Semua Status</option>
            <option value="Dipesan">Dipesan</option>
            <option value="Dipinjam">Dipinjam</option>
            <option value="Dikembalikan">Dikembalikan</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Kontainer Tabel Utama - Berubah Total Jadi Putih Bersih dengan Border Lembut */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* Header tabel memakai warna abu-abu sangat terang khas Light Mode */}
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">ID Pinjam</th>
                <th className="py-3.5 px-5">Anggota</th>
                <th className="py-3.5 px-5">Buku</th>
                <th className="py-3.5 px-5">Tgl Pinjam</th>
                <th className="py-3.5 px-5">Batas Kembali</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            {/* Isi baris tabel menggunakan teks gelap slate-700 */}
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {dataTersaring.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  
                  {/* ID Transaksi */}
                  <td className="py-4 px-5 font-mono text-slate-500 font-medium">{row.id}</td>
                  
                  {/* Nama Peminjam */}
                  <td className="py-4 px-5 font-semibold text-slate-900">{row.namaAnggota}</td>
                  
                  {/* Judul Buku */}
                  <td className="py-4 px-5 italic text-slate-600 font-medium">{row.judulBuku}</td>
                  
                  {/* Tanggal Ajuan Pinjam */}
                  <td className="py-4 px-5 text-slate-500">{row.tglPinjam}</td>
                  
                  {/* Batas Waktu Pengembalian */}
                  <td className="py-4 px-5 text-slate-500">{row.tglKembaliRencana}</td>
                  
                  {/* Soft Badge Status (Latar belakang pudar dengan teks tegas) */}
                  <td className="py-4 px-5 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      row.status === "Dipesan" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      row.status === "Dipinjam" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                      row.status === "Dikembalikan" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                      "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}>
                      {row.status}
                    </span>
                  </td>

                  {/* Kelompok Tombol Operasional */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex justify-end gap-1.5">
                      {row.status === "Dipesan" && (
                        <>
                          <button 
                            onClick={() => handleSetujui(row.id)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-3 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer shadow-sm"
                          >
                            Setujui
                          </button>
                          <button 
                            onClick={() => handleTolak(row.id)}
                            className="bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 font-medium px-3 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer"
                          >
                            Tolak
                          </button>
                        </>
                      )}
                      
                      {row.status === "Dipinjam" && (
                        <button 
                          onClick={() => handleSelesai(row.id)}
                          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium px-3 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer shadow-2xs"
                        >
                          Selesai Pinjam
                        </button>
                      )}

                      {(row.status === "Dikembalikan" || row.status === "Ditolak") && (
                        <button 
                          onClick={() => navigate(`/admin/peminjaman/${row.id}`)}
                          className="text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer"
                        >
                          Detail →
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}