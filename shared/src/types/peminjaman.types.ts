import { StatusPeminjaman, StatusPerpanjangan } from '../constants/status'

export interface Peminjaman {
  id: string
  userId: string
  bukuId: string
  status: StatusPeminjaman
  tglPinjam?: string
  tglKembaliRencana?: string
  tglKembaliAktual?: string
  counterPerpanjangan: number
  createdAt: string
  updatedAt: string
}

export interface Perpanjangan {
  id: string
  peminjamanId: string
  durasiHari: 1 | 2 | 3
  status: StatusPerpanjangan
  tglPengajuan: string
  tglDiproses?: string
  adminId?: string
}
