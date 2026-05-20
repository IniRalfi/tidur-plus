// frontend/src/pages/admin/PeminjamanDetailPage.tsx
import { useState } from "react";

interface TransaksiDetail {
  id: string;
  namaAnggota: string;
  emailAnggota: string;
  judulBuku: string;
  isbn: string;
  tanggalPesan: string;
  tanggalPinjam?: string;
  tanggalKembali?: string;
  status: "Dipesan" | "Dipinjam" | "Dikembalikan" | "Terlambat";
  jumlahPerpanjangan: number; // Maksimal 2 kali berdasarkan BR-04
}

export default function PeminjamanDetailPage() {
  // Simulasi data detail transaksi
  const [detail, setDetail] = useState<TransaksiDetail>({
    id: "TX-9921",
    namaAnggota: "Sheren Frontend",
    emailAnggota: "sheren@tidurplus.com",
    judulBuku: "Modern Web Development with React 19",
    isbn: "978-3-16-148410-0",
    tanggalPesan: "10 Mei 2026",
    tanggalPinjam: "11 Mei 2026",
    tanggalKembali: "25 Mei 2026", // Durasi 14 hari default (BR-03)
    status: "Dipinjam",
    jumlahPerpanjangan: 1,
  });

  // Handler Aksi Pustakawan
  const handleSetujuiPerpanjangan = () => {
    if (detail.jumlahPerpanjangan >= 2) {
      alert("Sudah mencapai batas maksimal perpanjangan (2 kali)!");
      return;
    }
    
    setDetail(prev => ({
      ...prev,
      jumlahPerpanjangan: prev.jumlahPerpanjangan + 1,
      // Contoh simulasi penambahan tanggal kembali (+3 hari sesuai BR-04)
      tanggalKembali: "28 Mei 2026" 
    }));
    alert("Perpanjangan selama 3 hari berhasil disetujui!");
  };

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">PeminjamanDetailPage</h1>
        <p className="text-sm text-gray-500">ID Transaksi: <span className="font-mono text-blue-600">{detail.id}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detail Anggota & Buku */}
        <div className="lg:col-span-2 space-y-6">
          {/* Kartu Anggota */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
            <h2 className="text-sm font-semibold uppercase text-gray-400 tracking-wider mb-4">Informasi Anggota</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Nama Lengkap</p>
                <p className="font-medium text-gray-900 mt-0.5">{detail.namaAnggota}</p>
              </div>
              <div>
                <p className="text-gray-500">Email Akun Google</p>
                <p className="font-medium text-gray-900 mt-0.5">{detail.emailAnggota}</p>
              </div>
            </div>
          </div>

          {/* Kartu Buku */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
            <h2 className="text-sm font-semibold uppercase text-gray-400 tracking-wider mb-4">Buku yang Dipinjam</h2>
            <div className="text-sm">
              <p className="font-semibold text-base text-gray-900">{detail.judulBuku}</p>
              <p className="text-xs text-gray-500 font-mono mt-1">ISBN: {detail.isbn}</p>
            </div>
          </div>
        </div>

        {/* Status Transaksi & Panel Aksi */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs space-y-4">
            <h2 className="text-sm font-semibold uppercase text-gray-400 tracking-wider">Status & Tanggal</h2>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
              <span className="text-gray-500">Status Aktif</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {detail.status}
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Tanggal Dipesan:</span>
                <span className="font-medium text-gray-900">{detail.tanggalPesan}</span>
              </div>
              <div className="flex justify-between">
                <span>Tanggal Dipinjam:</span>
                <span className="font-medium text-gray-900">{detail.tanggalPinjam || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span>Batas Pengembalian:</span>
                <span className="font-medium text-red-600">{detail.tanggalKembali || "-"}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dashed border-gray-200">
                <span>Kuota Perpanjangan:</span>
                <span className="font-medium text-gray-900">{detail.jumlahPerpanjangan} / 2 Kali</span>
              </div>
            </div>

            {/* Tombol Aksi untuk Admin */}
            <div className="pt-4 space-y-2">
              {detail.status === "Dipinjam" && detail.jumlahPerpanjangan < 2 && (
                <button 
                  onClick={handleSetujuiPerpanjangan}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Setujui Perpanjangan (+3 Hari)
                </button>
              )}
              
              {detail.status === "Dipinjam" && (
                <button 
                  onClick={() => setDetail(prev => ({ ...prev, status: "Dikembalikan" }))}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Selesai / Tandai Dikembalikan
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}