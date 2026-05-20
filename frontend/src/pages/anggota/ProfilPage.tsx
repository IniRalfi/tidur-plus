import { useState } from 'react';

export default function ProfilPage() {
  const [currentUser] = useState({
    name: "Upin",
    email: "upin@student.untan.ac.id",
    avatarUrl: "https://i.pinimg.com/1200x/b1/28/06/b128063075048888e07d7eba24d9de5c.jpg",
    role: "ANGGOTA",
    idAnggota: "LIB-2026-UPIN-001",
    dendaAktif: "Rp 0",
    bukuDipinjam: 2 
  });

  return (
    <div className="min-h-screen py-10 px-4 font-sans" style={{ backgroundColor: '#fdfcfb' }}>
      <div className="max-w-3xl mx-auto space-y-6">
       
        <div className="text-center pb-4">
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-primary)', color: 'var(--color-clay-coffee)' }}>Profil Saya</h1>
        </div>

        <div className="rounded-3xl shadow-xl overflow-hidden text-white border" 
             style={{ backgroundColor: 'var(--color-clay-coffee)', borderColor: 'var(--color-border)' }}>
        
          <div className="p-8 text-center space-y-4 relative" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)' }}>
            <div className="relative inline-block">
              <img 
                src={currentUser.avatarUrl} 
                alt={currentUser.name} 
                className="w-28 h-28 rounded-full object-cover mx-auto ring-4 ring-[#eb6935]"
              />
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 px-3 py-0.5 text-[11px] font-bold rounded-full text-white bg-green-600">
                Aktif
              </span>
            </div>

            <div className="pt-2">
              <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>{currentUser.name}</h2>
              <p className="text-sm opacity-70 mt-1">{currentUser.email}</p>
            </div>
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <div className="p-8 space-y-6">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-sun-glow)' }}>Kartu Anggota Digital</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
              <div className="bg-white p-5 rounded-2xl flex flex-col justify-between h-40 text-slate-800 border" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex justify-between items-start">
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-400">Level: {currentUser.role}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase">ID Register</div>
                  <div className="text-xl font-black font-mono tracking-wide text-slate-900">{currentUser.idAnggota}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Bergabung Sejak: 1 Mei 2026</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl flex flex-col justify-between h-40" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs opacity-80">
                    <span>Buku Dipinjam:</span>
                    <span className="font-bold text-white">{currentUser.bukuDipinjam} / 2 Buku</span>
                  </div>
               
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <div className="h-full rounded-full" style={{ width: '100%', backgroundColor: 'var(--color-sun-glow)' }}></div>
                  </div>
                </div>

                <div className="text-xs space-y-1 opacity-90">
                  <div>Status: <span style={{ color: 'var(--color-sun-glow)', fontWeight: 'bold' }}>Maksimum</span></div>
                  <div>Denda Aktif: <span className="font-mono">{currentUser.dendaAktif}</span></div>
                </div>

                <button className="w-full py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 cursor-pointer text-center"
                        style={{ backgroundColor: 'var(--color-sun-glow)' }}>
                  Keluar Akun
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}