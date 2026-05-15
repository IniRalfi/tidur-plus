import { StatusDenda } from '../constants/status'

export interface Denda {
  id: string
  peminjamanId: string
  userId: string
  jumlahHariTelat: number
  tarifPerHari: number
  totalDenda: number
  status: StatusDenda
  tglLunas?: string
  adminId?: string
  createdAt: string
}
