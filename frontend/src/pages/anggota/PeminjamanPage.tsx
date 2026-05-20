import React from 'react';

const DUMMY_PEMINJAMAN = [
  {
    id: 'trx-1',
    buku: { 
      judul: 'Mastering React 19', 
      pengarang: 'Timo',
      coverUrl: 'https://placehold.co/300x400/e2e8f0/475569?text=React+19' 
    },
    status: 'dipinjam',
    tglPinjam: '2026-05-15',
    tglKembaliRencana: '2026-05-29',
    counterPerpanjangan: 0
  },
  {
    id: 'trx-2',
    buku: { 
      judul: 'Seni Rebahan Produktif', 
      pengarang: 'Shé',
      coverUrl: null 
    },
    status: 'dipesan',
    tglPinjam: null,
    tglKembaliRencana: null,
    counterPerpanjangan: 0
  },
  {
    id: 'trx-3',
    buku: { 
      judul: 'Misteri Database Hilang', 
      pengarang: 'Marcel',
      coverUrl: null 
    },
    status: 'dikembalikan',
    tglPinjam: '2026-04-01',
    tglKembaliRencana: '2026-04-15',
    counterPerpanjangan: 1
  }
];

export default function PeminjamanPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dipesan': return 'bg-sun-glow/10 text-sun-burn border-sun-glow/20';
      case 'dipinjam': return 'bg-moss-sage/10 text-moss-drab border-moss-sage/20';
      case 'dikembalikan': return 'bg-muted text-muted-foreground border-border';
      case 'ditolak': return 'bg-sun-set/10 text-sun-set border-sun-set/20';
      default: return 'bg-card text-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'dipesan': return 'Menunggu Validasi Admin';
      case 'dipinjam': return 'Sedang Dipinjam';
      case 'dikembalikan': return 'Selesai / Dikembalikan';
      case 'ditolak': return 'Pesanan Ditolak';
      default: return status;
    }
  };

  return (
    <main className="min-h-screen bg-background font-primary pb-16 pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="mb-8 border-b border-border pb-4">
          <h1 className="text-3xl font-inter-bold text-clay-coffee tracking-tight">Rak Pinjaman Saya</h1>
          <p className="text-clay-sepia mt-1 text-sm font-inter-medium">Pantau status buku yang kamu pesan dan pinjam di sini.</p>
        </div>

        <div className="flex flex-col gap-4">
          {DUMMY_PEMINJAMAN.map((trx) => (
            <div key={trx.id} className="bg-card border border-border/50 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-md transition-shadow items-start sm:items-center">
              
              <div className="w-20 h-28 flex-shrink-0 bg-muted rounded-lg overflow-hidden border border-border flex items-center justify-center">
                {trx.buku.coverUrl ? (
                  <img src={trx.buku.coverUrl} alt={trx.buku.judul} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-muted-foreground font-inter-medium">No Cover</span>
                )}
              </div>

              <div className="flex-grow flex flex-col justify-center">
                <div className="mb-2">
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-inter-bold border uppercase tracking-wide mb-2 ${getStatusColor(trx.status)}`}>
                    {getStatusText(trx.status)}
                  </span>
                  <h2 className="text-lg font-inter-bold text-clay-coffee leading-tight">{trx.buku.judul}</h2>
                  <p className="text-sm text-moss-sage font-inter-medium">{trx.buku.pengarang}</p>
                </div>

                {(trx.status === 'dipinjam' || trx.status === 'dikembalikan') && (
                  <div className="flex gap-4 mt-1">
                    <div>
                      <p className="text-[11px] text-muted-foreground font-inter-medium">Tgl Pinjam</p>
                      <p className="text-xs font-inter-bold text-clay-sepia">{trx.tglPinjam}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-inter-medium">Jatuh Tempo</p>
                      <p className="text-xs font-inter-bold text-sun-burn">{trx.tglKembaliRencana}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-auto flex flex-col gap-2 mt-4 sm:mt-0">
                <button className="w-full sm:w-32 py-2 bg-card border border-clay-tan/30 hover:border-clay-tan hover:bg-clay-tan/5 text-clay-tan text-xs font-inter-bold rounded-xl transition-colors">
                  Detail Transaksi
                </button>
                
                {trx.status === 'dipinjam' && trx.counterPerpanjangan < 2 && (
                  <button className="w-full sm:w-32 py-2 bg-sun-glow hover:bg-sun-burn text-white text-xs font-inter-bold rounded-xl transition-colors shadow-sm">
                    Perpanjang
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}