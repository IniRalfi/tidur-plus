import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const user = { name: 'Shé' };
  const ringkasan = {
    bukuDipinjam: 1,
    salinanDipinjam: 350, 
    bukuDipesan: 1,
    statusAnggota: 'Aman' 
  };

  return (
    <main className="min-h-screen bg-background font-primary pb-16 pt-8 relative overflow-hidden">
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header ala iPlusnas */}
        <div className="mb-10 p-6 bg-clay-coffee rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] text-sun-glow font-inter-bold uppercase tracking-widest">Aplikasi Perpustakaan</span>
            <h1 className="text-3xl md:text-4xl font-inter-bold text-white tracking-tight">
              Tidur Plus <span className="text-sun-glow">HOME</span>
            </h1>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-white/70 font-inter-medium">Anggota Terdaftar</span>
            <h2 className="text-xl font-inter-bold text-white">{user.name}</h2>
          </div>
        </div>

        {/* Grid Ringkasan ala iPusnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Buku Dipinjam Saat Ini */}
          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-5 relative z-10">
              <h3 className="text-sm font-inter-bold text-clay-coffee uppercase tracking-wider">Pinjaman Aktif</h3>
              <span className={`w-3 h-3 rounded-full ${ringkasan.bukuDipinjam < 2 ? 'bg-moss-drab' : 'bg-sun-set'}`}></span>
            </div>
            <div className="relative z-10">
              <p className="text-5xl font-inter-bold text-clay-sepia tracking-tighter leading-none mb-1">
                {ringkasan.bukuDipinjam} <span className="text-sm font-inter-bold text-moss-sage tracking-normal">/ 2</span>
              </p>
              <p className="text-xs text-moss-sage font-inter-medium mt-1">Kuota Pinjam (Hanya BR-01)</p>
            </div>
            <svg className="absolute w-24 h-24 text-border bottom-[-10%] right-[-10%] opacity-40 group-hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>

          {/* Card 2: Total Riwayat Pinjam */}
          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <h3 className="text-sm font-inter-bold text-clay-coffee uppercase tracking-wider mb-5 relative z-10">Total Riwayat Pinjam</h3>
            <div className="relative z-10">
              <p className="text-5xl font-inter-bold text-clay-sepia tracking-tighter leading-none mb-1">
                {ringkasan.salinanDipinjam.toLocaleString()}
              </p>
              <p className="text-xs text-moss-sage font-inter-medium mt-1">Salinan buku pernah dibaca</p>
            </div>
            <svg className="absolute w-24 h-24 text-border bottom-[-10%] right-[-10%] opacity-40 group-hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>

          {/* Card 3: Menunggu Validasi */}
          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <h3 className="text-sm font-inter-bold text-clay-coffee uppercase tracking-wider mb-5 relative z-10">Dipesan</h3>
            <div className="relative z-10">
              <p className="text-5xl font-inter-bold text-sun-set tracking-tighter leading-none mb-1">
                {ringkasan.bukuDipesan} <span className="text-sm font-inter-bold text-sun-burn tracking-normal">Buku</span>
              </p>
              <p className="text-xs text-clay-sepia font-inter-medium mt-1">Menunggu persetujuan pustakawan</p>
            </div>
            <svg className="absolute w-24 h-24 text-border bottom-[-10%] right-[-10%] opacity-40 group-hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>

          {/* Card 4: Status Keuangan */}
          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <h3 className="text-sm font-inter-bold text-clay-coffee uppercase tracking-wider mb-5 relative z-10">Status Anggota</h3>
            <div className="relative z-10">
              <p className={`text-4xl font-inter-bold tracking-tight mb-1 ${ringkasan.statusAnggota === 'Aman' ? 'text-moss-drab' : 'text-sun-set'}`}>
                {ringkasan.statusAnggota}
              </p>
              <p className="text-xs text-moss-sage font-inter-medium mt-1">Bebas denda (Akses BR-05)</p>
            </div>
            <svg className="absolute w-24 h-24 text-border bottom-[-10%] right-[-10%] opacity-40 group-hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16V7m0 1v8" /></svg>
          </div>

        </div>

        {/* Kolom Akses Cepat */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5 border-b border-border pb-3">
            <h3 className="text-sm font-inter-bold text-clay-coffee uppercase tracking-wider">Akses Cepat</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link to="/" className="p-5 bg-[#fdfcfb] border border-border rounded-xl flex items-center gap-4 hover:border-sun-glow hover:bg-sun-glow/5 transition-all shadow-sm">
              <div className="p-3 bg-sun-glow/10 text-sun-set rounded-full flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <div>
                <h4 className="font-inter-bold text-clay-coffee text-base mb-1">Cari Koleksi Buku</h4>
                <p className="text-xs text-moss-sage font-inter-medium">Cek katalog digital Perpusnas.</p>
              </div>
            </Link>
            <Link to="/peminjaman" className="p-5 bg-[#fdfcfb] border border-border rounded-xl flex items-center gap-4 hover:border-clay-tan hover:bg-clay-tan/5 transition-all shadow-sm">
              <div className="p-3 bg-clay-sepia/10 text-clay-sepia rounded-full flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
              </div>
              <div>
                <h4 className="font-inter-bold text-clay-coffee text-base mb-1">Cek Rak Pinjaman</h4>
                <p className="text-xs text-moss-sage font-inter-medium">Pantau status & tanggal jatuh tempo.</p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}