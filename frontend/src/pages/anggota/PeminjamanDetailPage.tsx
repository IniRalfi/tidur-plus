// TODO: [PeminjamanDetailPage]
// export default function PeminjamanDetailPage() {
//   return (
//     <main>
//       <h1>PeminjamanDetailPage</h1>
//       {/* TODO: implement */}
//     </main>
//   )
// }


import React, { useState } from 'react';

// Data dummy spesifik untuk 1 transaksi yang sedang dipinjam
const DUMMY_TRX_DETAIL = {
  id: 'trx-1',
  buku: { 
    id: 'buku-1',
    judul: 'Mastering React 19', 
    pengarang: 'Timo',
    penerbit: 'Tidur Plus Press',
    coverUrl: 'https://placehold.co/300x400/e2e8f0/475569?text=React+19' 
  },
  status: 'dipinjam',
  tglPinjam: '15 Mei 2026',
  tglKembaliRencana: '29 Mei 2026',
  counterPerpanjangan: 1, // Ceritanya udah pernah perpanjang 1x (sisa 1x lagi)
};

export default function PeminjamanDetailPage() {
  const trx = DUMMY_TRX_DETAIL;
  
  // State untuk nyimpen pilihan hari dari user
  const [durasiPerpanjangan, setDurasiPerpanjangan] = useState<number>(1);

  return (
    <main className="min-h-screen bg-background font-primary pb-16 pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Tombol Kembali */}
        <button className="text-moss-sage hover:text-clay-coffee flex items-center gap-2 mb-8 transition-colors font-inter-medium text-sm cursor-pointer group">
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali ke Rak Pinjaman
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: Info Buku Singkat */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
              <div className="aspect-[3/4] bg-muted rounded-xl overflow-hidden mb-4 border border-border">
                {trx.buku.coverUrl ? (
                  <img src={trx.buku.coverUrl} alt={trx.buku.judul} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No Cover</div>
                )}
              </div>
              <h2 className="font-inter-bold text-clay-coffee text-lg leading-tight mb-1">{trx.buku.judul}</h2>
              <p className="text-sm text-moss-sage font-inter-medium">{trx.buku.pengarang}</p>
            </div>
          </div>

          {/* KOLOM KANAN: Detail Transaksi & Form Perpanjangan */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* Kartu Status Transaksi */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-inter-bold text-clay-coffee uppercase tracking-wider mb-4 border-b border-border/50 pb-2">Detail Peminjaman</h3>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-xs text-moss-sage font-inter-medium mb-1">Status Saat Ini</p>
                  <span className="inline-block px-3 py-1 bg-moss-sage/10 text-moss-drab border border-moss-sage/20 text-xs font-inter-bold uppercase tracking-wide rounded-md">
                    Sedang Dipinjam
                  </span>
                </div>
                <div>
                  <p className="text-xs text-moss-sage font-inter-medium mb-1">ID Transaksi</p>
                  <p className="text-sm font-inter-bold text-clay-coffee">#{trx.id.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-moss-sage font-inter-medium mb-1">Tanggal Pinjam</p>
                  <p className="text-sm font-inter-bold text-clay-coffee">{trx.tglPinjam}</p>
                </div>
                <div>
                  <p className="text-xs text-moss-sage font-inter-medium mb-1">Jatuh Tempo</p>
                  <p className="text-sm font-inter-bold text-sun-burn">{trx.tglKembaliRencana}</p>
                </div>
              </div>
            </div>

            {/* Area Form Perpanjangan (BR-02 Logic) */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4 border-b border-border/50 pb-2">
                <h3 className="text-sm font-inter-bold text-clay-coffee uppercase tracking-wider">Ajukan Perpanjangan</h3>
                <span className="text-xs font-inter-medium text-moss-sage bg-muted px-2 py-1 rounded-md">
                  Sisa Kuota: {2 - trx.counterPerpanjangan}x
                </span>
              </div>

              {trx.status === 'dipinjam' && trx.counterPerpanjangan < 2 ? (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-clay-coffee/80 font-inter-medium">
                    Pilih durasi tambahan hari untuk masa pinjam buku ini (Maksimal 3 hari). Pengajuan harus divalidasi oleh Admin.
                  </p>
                  
                  {/* Pilihan Durasi 1, 2, atau 3 Hari */}
                  <div className="flex gap-3">
                    {[1, 2, 3].map((hari) => (
                      <button 
                        key={hari}
                        onClick={() => setDurasiPerpanjangan(hari)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-inter-bold transition-all ${
                          durasiPerpanjangan === hari 
                            ? 'bg-clay-tan/10 border-clay-tan text-clay-tan shadow-sm' 
                            : 'bg-card border-border text-moss-sage hover:border-clay-tan/50'
                        }`}
                      >
                        + {hari} Hari
                      </button>
                    ))}
                  </div>

                  {/* Tombol Submit */}
                  <button className="w-full mt-2 py-3 bg-sun-glow hover:bg-sun-burn text-white text-sm font-inter-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    Kirim Pengajuan
                  </button>
                </div>
              ) : (
                <div className="py-4 text-center bg-muted rounded-xl border border-border/50">
                  <p className="text-sm text-muted-foreground font-inter-medium">
                    {trx.counterPerpanjangan >= 2 
                      ? 'Kamu sudah mencapai batas maksimal perpanjangan (2 kali) untuk buku ini.'
                      : 'Buku ini tidak dalam status bisa diperpanjang.'}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}