import React from 'react';

const DUMMY_DETAIL = {
  id: 'buku-1',
  judul: 'Mastering React 19',
  pengarang: 'Shé',
  penerbit: 'Tidur Plus Press',
  tahun: 2026,
  isbn: '978-623-XXXX-XX-X',
  kategori: { id: 'k-1', nama: 'Teknologi' },
  stok: 5,
  coverUrl: null
  deskripsi: 'Buku ini dirancang khusus untuk pemula hingga tingkat lanjut yang ingin menguasai React 19 untuk membangun antarmuka web modern. Membahas tuntas fitur-fitur terbaru seperti arsitektur komponen, hooks baru, hingga integrasi dengan framework seperti Vite. Sangat cocok dibaca sambil ngopi di sore hari.',
};

export default function BukuDetailPage() {
  const buku = DUMMY_DETAIL;

  return (
    <main className="min-h-screen bg-background font-primary pb-16 pt-8">
      <div className="container mx-auto px-4 max-w-5xl">
                <button className="text-moss-sage hover:text-sun-burn flex items-center gap-2 mb-8 font-inter-medium text-sm transition-colors cursor-pointer">
          <span>←</span> Kembali ke Katalog
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          
          <div className="w-full max-w-[280px] mx-auto md:mx-0 flex-shrink-0">
            <div className="aspect-[3/4] bg-[#eef2f6] rounded-2xl overflow-hidden shadow-lg border border-border/40 flex items-center justify-center">
              {buku.coverUrl ? (
                <img src={buku.coverUrl} alt={buku.judul} className="w-full h-full object-cover" />
              ) : (
                <span className="font-inter-bold text-3xl text-slate-500 px-6 text-center leading-snug">
                  React 19
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col">
            
            <div className="mb-6 border-b border-border/60 pb-6">
              <span className="inline-block px-3 py-1 bg-transparent border border-sun-glow/40 text-sun-burn text-[10px] uppercase tracking-widest font-inter-bold rounded-md mb-4">
                {buku.kategori?.nama || 'Umum'}
              </span>
              <h1 className="text-4xl font-inter-bold text-clay-coffee tracking-tight mb-2">
                {buku.judul}
              </h1>
              <p className="text-base text-moss-sage font-inter-medium">
                oleh <span className="text-sun-burn font-inter-bold">{buku.pengarang}</span>
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-inter-bold text-clay-coffee uppercase tracking-widest mb-3">
                Sinopsis / Deskripsi
              </h3>
              <p className="text-clay-coffee/80 leading-relaxed font-inter-medium text-sm text-justify">
                {buku.deskripsi || 'Belum ada deskripsi untuk buku ini.'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6 bg-card p-5 rounded-2xl border border-border/80 shadow-sm">
              <div>
                <p className="text-xs text-moss-sage font-inter-medium mb-1">Penerbit</p>
                <p className="text-sm font-inter-bold text-clay-coffee">{buku.penerbit || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-moss-sage font-inter-medium mb-1">Tahun Terbit</p>
                <p className="text-sm font-inter-bold text-clay-coffee">{buku.tahun || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-moss-sage font-inter-medium mb-1">ISBN</p>
                <p className="text-sm font-inter-bold text-clay-coffee">{buku.isbn || '-'}</p>
              </div>
            </div>

            <div className="mt-auto bg-card p-5 rounded-2xl border border-border/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <p className="text-xs text-moss-sage font-inter-medium mb-1">Ketersediaan Fisik</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${buku.stok > 0 ? 'bg-moss-drab' : 'bg-sun-set'}`}></span>
                  <span className={`text-sm font-inter-bold ${buku.stok > 0 ? 'text-clay-coffee' : 'text-sun-set'}`}>
                    {buku.stok > 0 ? `${buku.stok} Eksemplar Tersedia` : 'Stok Habis'}
                  </span>
                </div>
              </div>

              {buku.stok > 0 ? (
                <button className="w-full sm:w-auto px-6 py-2.5 bg-sun-burn hover:bg-sun-set text-white text-sm font-inter-bold rounded-xl transition-colors cursor-pointer shadow-sm">
                  Pesan Buku Ini
                </button>
              ) : (
                <button disabled className="w-full sm:w-auto px-6 py-2.5 bg-muted text-muted-foreground text-sm font-inter-bold rounded-xl cursor-not-allowed border border-border">
                  Sedang Dipinjam
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}