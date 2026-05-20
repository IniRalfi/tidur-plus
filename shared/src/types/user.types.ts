import { Role } from '../constants/roles'

export interface User {
  id: string
  name: string
  email: string
  googleId?: string
  avatarUrl?: string
  roles: Role[]
  createdAt: string
  updatedAt: string
}
