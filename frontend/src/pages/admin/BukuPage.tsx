// frontend/src/pages/admin/BukuPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bukuService } from "../../lib/buku.service";
import { Buku } from "@tidur-plus/shared";

export default function BukuPage() {
  const queryClient = useQueryClient();

  // 1. Fetch data dari backend
  const { data: dataBuku = [], isLoading } = useQuery({
    queryKey: ["buku"],
    queryFn: bukuService.getAll,
  });

  // 2. Mutations untuk CRUD
  const createMutation = useMutation({
    mutationFn: bukuService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buku"] });
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Buku> }) =>
      bukuService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buku"] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: bukuService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buku"] });
    },
  });

  // 3. State untuk mengontrol Modal (Pop-up Form)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 4. State untuk menangkap inputan Form
  const [formBuku, setFormBuku] = useState<Partial<Buku>>({
    judul: "",
    pengarang: "",
    penerbit: "",
    tahun: new Date().getFullYear(),
    stok: 0,
    kategoriId: "", // butuh fetch kategori di real app
  });
  
  // State pembantu untuk mencatat ID buku mana yang sedang diedit
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ─── FUNGSI OPERASIONAL CRUD ───

  // Buka Modal untuk Tambah Buku Baru
  const handleOpenTambah = () => {
    setIsEditing(false);
    setSelectedId(null);
    setFormBuku({ judul: "", pengarang: "", penerbit: "", tahun: new Date().getFullYear(), stok: 1, kategoriId: "cly0u6n6p0000j2s8q7a7b8c9" /* placeholder kategori */ });
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
      stok: buku.stok,
      kategoriId: buku.kategoriId,
    });
    setIsModalOpen(true);
  };

  // Fungsi Simpan (Aksi Submit untuk Tambah maupun Edit)
  const handleSimpanBuku = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && selectedId) {
      updateMutation.mutate({ id: selectedId, data: formBuku });
    } else {
      createMutation.mutate(formBuku);
    }
  };

  // Fungsi Hapus Buku (D)
  const handleHapusBuku = (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus buku ini?")) {
      deleteMutation.mutate(id);
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">Memuat data buku...</td>
                </tr>
              ) : dataBuku.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">Belum ada koleksi buku</td>
                </tr>
              ) : (
                dataBuku.map((buku) => (
                  <tr key={buku.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-5 font-mono font-medium text-slate-500">{buku.id.substring(0, 8)}...</td>
                    <td className="py-4 px-5 font-semibold text-slate-900">{buku.judul}</td>
                    <td className="py-4 px-5 text-slate-600 font-medium">{buku.pengarang}</td>
                    <td className="py-4 px-5 text-slate-500">{buku.penerbit || "-"} ({buku.tahun || "-"})</td>
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
                ))
              )}
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
                    value={formBuku.tahun || ""}
                    onChange={(e) => setFormBuku({ ...formBuku, tahun: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 text-slate-800"
                    placeholder="1980"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Kategori ID</label>
                <input 
                  type="text" 
                  required
                  value={formBuku.kategoriId}
                  onChange={(e) => setFormBuku({ ...formBuku, kategoriId: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 text-slate-800"
                  placeholder="ID Kategori (sementara manual)"
                />
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
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-medium cursor-pointer shadow-xs disabled:opacity-50"
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