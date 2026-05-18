// export interface Kategori {
//   id: string
//   nama: string
// }

// export type CoverSource = 'upload' | 'url'

// export interface Buku {
//   id: string
//   judul: string
//   pengarang: string
//   penerbit?: string
//   tahun?: number
//   isbn?: string
//   kategoriId: string
//   kategori?: Kategori
//   stok: number
//   coverUrl?: string
//   coverSource: CoverSource
//   deskripsi?: string
//   createdAt: string
//   updatedAt: string
// }

import React from 'react';
// Nanti import ini kalau path shared-nya sudah dikonfigurasi di tsconfig
// import type { Buku } from '@tidur-plus/shared';

// 1. Data dummy sekarang ngikutin strict interface Buku yang kamu kirim
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
    coverUrl: 'https://placehold.co/300x400?text=React+19',
    deskripsi: 'Buku panduan lengkap belajar React 19 dari nol.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function KatalogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Katalog Buku</h1>
          <p className="text-gray-500 mt-1">Temukan buku-buku menarik di Perpustakaan Digital</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {DUMMY_BUKU.map((buku) => (
          <div key={buku.id} className="flex flex-col border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
            
            {/* Cek apakah ada coverUrl atau tidak */}
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
              {buku.coverUrl ? (
                <img src={buku.coverUrl} alt={buku.judul} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">No Cover</span>
              )}
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="font-semibold text-gray-900 line-clamp-2 mb-1" title={buku.judul}>
                {buku.judul}
              </h2>
              
              {/* Tampilkan pengarang dan tahun (jika ada) */}
              <p className="text-sm text-gray-500 mb-2">
                {buku.pengarang} {buku.tahun && `• ${buku.tahun}`}
              </p>
              
              <div className="mt-auto pt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                    {buku.kategori?.nama || 'Umum'}
                  </span>
                  
                  {/* Indikator Stok */}
                  <span className={`text-xs font-medium ${buku.stok > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {buku.stok > 0 ? `Sisa: ${buku.stok}` : 'Habis'}
                  </span>
                </div>
                
                {buku.stok > 0 ? (
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer">
                    Lihat Detail
                  </button>
                ) : (
                  <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-medium py-2 rounded-lg cursor-not-allowed">
                    Stok Habis
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}