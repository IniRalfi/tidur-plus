// frontend/src/pages/admin/BukuPage.tsx
import { useState } from "react";

interface Buku {
  id: string;
  judul: string;
  pengarang: string;
  penerbit: string;
  tahun: string;
  stok: number;
}

export default function BukuPage() {
  // 1. State data utama koleksi buku
  const [dataBuku, setDataBuku] = useState<Buku[]>([
    { id: "BK-001", judul: "Laskar Pelangi", pengarang: "Andrea Hirata", penerbit: "Bentang Pustaka", tahun: "2005", stok: 5 },
    { id: "BK-002", judul: "Bumi Manusia", pengarang: "Pramoedya Ananta Toer", penerbit: "Hasta Mitra", tahun: "1980", stok: 3 },
    { id: "BK-003", judul: "Negeri 5 Menara", pengarang: "Ahmad Fuadi", penerbit: "Gramedia", tahun: "2009", stok: 7 }
  ]);

  // 2. State untuk mengontrol Modal (Pop-up Form)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 3. State untuk menangkap inputan Form
  const [formBuku, setFormBuku] = useState<Omit<Buku, "id">>({
    judul: "",
    pengarang: "",
    penerbit: "",
    tahun: "",
    stok: 0
  });
  
  // State pembantu untuk mencatat ID buku mana yang sedang diedit
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ─── FUNGSI OPERASIONAL CRUD ───

  // Buka Modal untuk Tambah Buku Baru
  const handleOpenTambah = () => {
    setIsEditing(false);
    setSelectedId(null);
    setFormBuku({ judul: "", pengarang: "", penerbit: "", tahun: "", stok: 1 });
    setIsModalOpen(true);
  };

  // Buka Modal untuk Edit Buku (Membawa data lama ke form)
  const handleOpenEdit = (buku: Buku) => {
    setIsEditing(true);
    setSelectedId(buku.id);
    setFormBuku({
      judul: buku.judul,
      pengarang: buku.pengarang,
      penerbit: buku.penerbit,
      tahun: buku.tahun,
      stok: buku.stok
    });
    setIsModalOpen(true);
  };

  // Fungsi Simpan (Aksi Submit untuk Tambah maupun Edit)
  const handleSimpanBuku = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && selectedId) {
      // PROSES UPDATE (U)
      setDataBuku(prev => prev.map(item => 
        item.id === selectedId ? { ...item, ...formBuku } : item
      ));
    } else {
      // PROSES CREATE (C)
      const idBaru = `BK-00${dataBuku.length + 1}`;
      setDataBuku(prev => [...prev, { id: idBaru, ...formBuku }]);
    }

    setIsModalOpen(false); // Tutup modal setelah simpan
  };

  // Fungsi Hapus Buku (D)
  const handleHapusBuku = (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus buku ini?")) {
      setDataBuku(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ATAS: Judul Halaman & Tombol Tambah */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-wide">Kelola Koleksi Buku</h2>
          <p className="text-xs text-slate-500 mt-0.5">Tambah, edit, dan pantau stok buku perpustakaan digital.</p>
        </div>
        
        <button 
          onClick={handleOpenTambah}
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 rounded-lg transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          ➕ Tambah Buku
        </button>
      </div>

      {/* TABEL UTAMA (TEMA PUTIH MINIMALIS) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">ID Buku</th>
                <th className="py-3.5 px-5">Judul Buku</th>
                <th className="py-3.5 px-5">Pengarang</th>
                <th className="py-3.5 px-5">Penerbit / Tahun</th>
                <th className="py-3.5 px-5 text-center">Stok Eksemplar</th>
                <th className="py-3.5 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {dataBuku.map((buku) => (
                <tr key={buku.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-5 font-mono font-medium text-slate-500">{buku.id}</td>
                  <td className="py-4 px-5 font-semibold text-slate-900">{buku.judul}</td>
                  <td className="py-4 px-5 text-slate-600 font-medium">{buku.pengarang}</td>
                  <td className="py-4 px-5 text-slate-500">{buku.penerbit} ({buku.tahun})</td>
                  <td className="py-4 px-5 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-md font-mono font-bold text-xs ${
                      buku.stok > 3 ? "bg-slate-100 text-slate-700" : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {buku.stok}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => handleOpenEdit(buku)}
                        className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleHapusBuku(buku.id)}
                        className="bg-white hover:bg-red-50 text-red-500 border border-slate-200 hover:border-red-200 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md shadow-xl animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {isEditing ? "Edit Informasi Buku" : "Input Buku Baru"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSimpanBuku} className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Judul Buku</label>
                <input 
                  type="text" 
                  required
                  value={formBuku.judul}
                  onChange={(e) => setFormBuku({ ...formBuku, judul: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 text-slate-800"
                  placeholder="Contoh: Bumi Manusia"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Nama Pengarang</label>
                <input 
                  type="text" 
                  required
                  value={formBuku.pengarang}
                  onChange={(e) => setFormBuku({ ...formBuku, pengarang: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 text-slate-800"
                  placeholder="Contoh: Pramoedya Ananta Toer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Penerbit</label>
                  <input 
                    type="text" 
                    required
                    value={formBuku.penerbit}
                    onChange={(e) => setFormBuku({ ...formBuku, penerbit: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 text-slate-800"
                    placeholder="Hasta Mitra"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Tahun Terbit</label>
                  <input 
                    type="number" 
                    required
                    value={formBuku.tahun}
                    onChange={(e) => setFormBuku({ ...formBuku, tahun: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 text-slate-800"
                    placeholder="1980"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Jumlah Stok (Eksemplar)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={formBuku.stok}
                  onChange={(e) => setFormBuku({ ...formBuku, stok: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 text-slate-800 font-mono"
                />
              </div>

              {/* Tombol Aksi Modal */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 mt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-4 py-2 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-medium cursor-pointer shadow-xs"
                >
                  {isEditing ? "Perbarui Data" : "Tambahkan Buku"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}