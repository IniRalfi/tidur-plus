import { Role } from '@tidur-plus/shared'

// TODO: Guard berdasarkan role
// Contoh penggunaan: .use(requireRole(Role.ADMIN))
export function requireRole(...roles: Role[]) {
  return roles
}
