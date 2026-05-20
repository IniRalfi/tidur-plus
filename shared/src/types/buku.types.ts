export interface Kategori {
  id: string
  nama: string
}

export type CoverSource = 'upload' | 'url'

export interface Buku {
  id: string
  judul: string
  pengarang: string
  penerbit?: string
  tahun?: number
  isbn?: string
  kategoriId: string
  kategori?: Kategori
  stok: number
  coverUrl?: string
  coverSource: CoverSource
  deskripsi?: string
  createdAt: string
  updatedAt: string
}