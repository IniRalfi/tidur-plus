// frontend/src/hooks/admin/usePeminjaman.ts
import { useState } from "react";

// Struktur data model transaksi perpustakaan kita
export interface Peminjaman {
  id: string;
  namaAnggota: string;
  judulBuku: string;
  tglPinjam: string;
  tglKembaliRencana: string;
  status: "Dipesan" | "Dipinjam" | "Dikembalikan" | "Ditolak";
}

export function usePeminjaman() {
  // 1. State utama penyimpan daftar seluruh transaksi peminjaman
  const [dataPeminjaman, setDataPeminjaman] = useState<Peminjaman[]>([
    { id: "PMJ-001", namaAnggota: "Christina S.", judulBuku: "Laskar Pelangi", tglPinjam: "20 Mei 2026", tglKembaliRencana: "03 Juni 2026", status: "Dipesan" },
    { id: "PMJ-002", namaAnggota: "Rodi R.", judulBuku: "Bumi Manusia", tglPinjam: "14 Mei 2026", tglKembaliRencana: "28 Mei 2026", status: "Dipinjam" },
    { id: "PMJ-003", namaAnggota: "Citra M.", judulBuku: "Perahu Kertas", tglPinjam: "01 Mei 2026", tglKembaliRencana: "15 Mei 2026", status: "Dikembalikan" }
  ]);

  // 2. State untuk filter pencarian atau kategori status
  const [filterStatus, setFilterStatus] = useState<string>("Semua Status");

  // 3. Aksi Pustakawan: Menyetujui Booking (Ubah status 'Dipesan' -> 'Dipinjam')
  // Sesuai aturan bisnis: Durasi pinjam default berlaku sejak validasi Admin (14 hari)
  const setujuiPeminjaman = (id: string) => {
    setDataPeminjaman(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: "Dipinjam" } : item
      )
    );
    console.log(`Transaksi ${id} telah disetujui. Buku fisik diambil.`);
  };

  // 4. Aksi Pustakawan: Menolak Booking (Ubah status 'Dipesan' -> 'Ditolak')
  const tolakPeminjaman = (id: string) => {
    setDataPeminjaman(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: "Ditolak" } : item
      )
    );
  };

  // 5. Aksi Pustakawan: Menyelesaikan Peminjaman (Saat buku dikembalikan ke perpustakaan)
  const selesaikanPeminjaman = (id: string) => {
    setDataPeminjaman(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: "Dikembalikan" } : item
      )
    );
  };

  // 6. Menyaring data berdasarkan filter yang dipilih admin
  const dataTersaring = dataPeminjaman.filter(item => {
    if (filterStatus === "Semua Status") return true;
    return item.status === filterStatus;
  });

  // Retur semua variabel dan fungsi agar bisa dicolok ke komponen halaman
  return {
    dataPeminjaman: dataTersaring,
    filterStatus,
    setFilterStatus,
    setujuiPeminjaman,
    tolakPeminjaman,
    selesaikanPeminjaman
  };
}