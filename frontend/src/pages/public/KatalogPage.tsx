import React from 'react';

const DUMMY_BUKU = [
  {
    id: 'buku-1',
    judul: 'Mastering React 19',
    pengarang: 'Timo',
    penerbit: 'Tidur Plus Press',
    tahun: 2026,
    kategoriId: 'k-1',
    kategori: { id: 'k-1', nama: 'Teknologi' },
    stok: 5,
    coverSource: 'url' as const,
    coverUrl: 'https://placehold.co/300x400/e2e8f0/475569?text=React+19',
    deskripsi: 'Buku panduan lengkap belajar React 19 dari nol.',
  },
  {
    id: 'buku-2',
    judul: 'Seni Rebahan Produktif',
    pengarang: 'Shé',
    penerbit: 'Santai Publisher',
    tahun: 2025,
    kategoriId: 'k-2',
    kategori: { id: 'k-2', nama: 'Self Improvement' },
    stok: 0, 
    coverSource: 'upload' as const,
  },
  {
    id: 'buku-3',
    judul: 'Misteri Database Hilang',
    pengarang: 'Marcel',
    tahun: 2024,
    kategoriId: 'k-3',
    kategori: { id: 'k-3', nama: 'Fiksi IT' },
    stok: 2,
    coverSource: 'url' as const,
  }
];

export default function KatalogPage() {
  return (
    // bg-background otomatis ngambil dari :root (warna warm #fdfcfb)
    <main className="min-h-screen bg-background font-primary pb-12">
      <div className="container mx-auto px-4 pt-8">
        
        <div className="mb-8 flex justify-between items-end border-b border-border pb-4">
          <div>
            {/* Pakai warna custom clay-coffee untuk judul */}
            <h1 className="text-3xl font-inter-bold text-clay-coffee tracking-tight">Katalog Buku</h1>
            <p className="text-clay-sepia mt-1 text-sm font-inter-medium">Temukan bacaan menarik di Perpustakaan Digital</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          
          {DUMMY_BUKU.map((buku) => (
            // bg-card otomatis ngambil dari oklch(1 0 0) putih bersih
            <div key={buku.id} className="flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-sun-glow/30 transition-all duration-200 group">
              
              <div className="aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden relative">
                {buku.coverUrl ? (
                  <img src={buku.coverUrl} alt={buku.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center gap-1.5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    <span className="text-xs font-inter-medium">No Cover</span>
                  </div>
                )}
                {/* Badge Kategori dengan warna clay-tan */}
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-card/95 text-clay-tan border border-clay-tan/20 text-[10px] uppercase tracking-wider font-inter-bold rounded-md shadow-sm backdrop-blur-sm">
                  {buku.kategori?.nama || 'Umum'}
                </span>
              </div>
              
              <div className="p-3.5 flex flex-col flex-grow">
                {/* Judul buku pakai font-inter-bold dan warna clay-coffee */}
                <h2 className="font-inter-bold text-clay-coffee line-clamp-2 mb-1 text-sm leading-snug" title={buku.judul}>
                  {buku.judul}
                </h2>
                
                <p className="text-xs text-moss-sage mb-3 font-inter-medium">
                  {buku.pengarang} {buku.tahun && `• ${buku.tahun}`}
                </p>
                
                <div className="mt-auto pt-3 border-t border-border/50">
                  <div className="flex justify-between items-center mb-3">
                    {/* Indikator Stok memanfaatkan palet moss dan sun */}
                    <span className={`text-[11px] font-inter-bold px-2 py-0.5 rounded-full ${buku.stok > 0 ? 'bg-moss-sage/10 text-moss-drab' : 'bg-sun-set/10 text-sun-set'}`}>
                      {buku.stok > 0 ? `Tersedia: ${buku.stok}` : 'Habis'}
                    </span>
                  </div>
                  
                  {buku.stok > 0 ? (
                    // Tombol Pesan pakai warna sun-glow (orange cerah)
                    <button className="w-full bg-sun-glow hover:bg-sun-burn text-white text-xs font-inter-bold py-2 rounded-lg transition-colors cursor-pointer shadow-sm">
                      Pesan Buku
                    </button>
                  ) : (
                    <button disabled className="w-full bg-muted text-muted-foreground text-xs font-inter-bold py-2 rounded-lg cursor-not-allowed border border-border">
                      Tidak Tersedia
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </main>
  );
}