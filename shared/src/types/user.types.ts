import { Role } from '../constants/roles'

export interface User {
  id: string
  nama: string
  email: string
  googleId?: string
  foto?: string
  roles: Role[]
  aktif: boolean
  createdAt: string
  updatedAt: string
}
