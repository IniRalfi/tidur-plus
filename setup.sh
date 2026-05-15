#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${BLUE}[setup]${NC} $1"; }
ok()  { echo -e "${GREEN}[ok]${NC} $1"; }
sec() { echo -e "\n${YELLOW}=== $1 ===${NC}"; }

mkf() {
  local path="$1"
  local content="$2"
  mkdir -p "$(dirname "$path")"
  if [ ! -f "$path" ]; then
    echo "$content" > "$path"
    ok "created $path"
  else
    log "exists  $path (skip)"
  fi
}

# ──────────────────────────────────────────────────────────────
sec "SHARED — Types"

mkf "shared/src/types/user.types.ts" "import { Role } from '../constants/roles'

export interface User {
  id: string
  name: string
  email: string
  googleId?: string
  avatarUrl?: string
  role: Role
  createdAt: string
  updatedAt: string
}"

mkf "shared/src/types/buku.types.ts" "export interface Kategori {
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
}"

mkf "shared/src/types/peminjaman.types.ts" "import { StatusPeminjaman, StatusPerpanjangan } from '../constants/status'

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
}"

mkf "shared/src/types/denda.types.ts" "import { StatusDenda } from '../constants/status'

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
}"

# ──────────────────────────────────────────────────────────────
sec "SHARED — Constants"

mkf "shared/src/constants/roles.ts" "export enum Role {
  ANGGOTA    = 'anggota',
  ADMIN      = 'admin',
  SUPER_ADMIN = 'super_admin',
}"

mkf "shared/src/constants/status.ts" "export enum StatusPeminjaman {
  DIPESAN       = 'dipesan',
  DIPINJAM      = 'dipinjam',
  DIKEMBALIKAN  = 'dikembalikan',
  DITOLAK       = 'ditolak',
}

export enum StatusPerpanjangan {
  MENUNGGU  = 'menunggu',
  DISETUJUI = 'disetujui',
  DITOLAK   = 'ditolak',
}

export enum StatusDenda {
  BELUM_LUNAS = 'belum_lunas',
  LUNAS       = 'lunas',
}"

mkf "shared/src/constants/config.ts" "export const DEFAULT_CONFIG = {
  DURASI_PINJAM_HARI: 14,
  MAKS_BUKU_PER_ANGGOTA: 2,
  MAKS_PERPANJANGAN: 2,
  TARIF_DENDA_PER_HARI: 1000,
} as const"

# Update shared/src/index.ts
cat > "shared/src/index.ts" << 'EOF'
export * from './types/user.types'
export * from './types/buku.types'
export * from './types/peminjaman.types'
export * from './types/denda.types'
export * from './constants/roles'
export * from './constants/status'
export * from './constants/config'
EOF
ok "updated shared/src/index.ts"

# ──────────────────────────────────────────────────────────────
sec "BACKEND — Config"

mkf "backend/tsconfig.json" '{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src", "prisma"]
}'

mkf "backend/src/config/app.config.ts" "export const appConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
}"

mkf "backend/src/config/cors.config.ts" "import { appConfig } from './app.config'

export const corsConfig = {
  origin: appConfig.frontendUrl,
  credentials: true,
}"

mkf "backend/src/config/jwt.config.ts" "export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'dev-secret-change-me',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}"

# ──────────────────────────────────────────────────────────────
sec "BACKEND — Lib"

mkf "backend/src/lib/prisma.ts" "import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma"

mkf "backend/src/lib/google-oauth.ts" "// TODO: Setup Google OAuth 2.0
// Referensi: https://developers.google.com/identity/protocols/oauth2
export const googleOAuth = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
}"

mkf "backend/src/lib/storage.ts" "import path from 'path'
import fs from 'fs/promises'

export const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads'

export async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
}

export function getFileUrl(filename: string): string {
  return \`/uploads/\${filename}\`
}"

# ──────────────────────────────────────────────────────────────
sec "BACKEND — Middlewares"

mkf "backend/src/middlewares/auth.middleware.ts" "// TODO: Validasi JWT token dari header Authorization
// Inject user ke context setelah verifikasi
export {}"

mkf "backend/src/middlewares/rbac.middleware.ts" "import { Role } from '@tidur-plus/shared'

// TODO: Guard berdasarkan role
// Contoh penggunaan: .use(requireRole(Role.ADMIN))
export function requireRole(...roles: Role[]) {
  return roles
}"

mkf "backend/src/middlewares/error.middleware.ts" "// TODO: Global error handler ElysiaJS
export {}"

# ──────────────────────────────────────────────────────────────
sec "BACKEND — Utils"

mkf "backend/src/utils/response.ts" "export function success<T>(data: T, message = 'OK') {
  return { success: true, message, data }
}

export function error(message: string, statusCode = 400) {
  return { success: false, message, statusCode }
}

export function paginated<T>(data: T[], total: number, page: number, limit: number) {
  return {
    success: true,
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  }
}"

mkf "backend/src/utils/denda.helper.ts" "export function hitungDenda(
  tglKembaliRencana: Date,
  tglKembaliAktual: Date,
  tarifPerHari: number
): { jumlahHariTelat: number; totalDenda: number } {
  const diffMs = tglKembaliAktual.getTime() - tglKembaliRencana.getTime()
  const jumlahHariTelat = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
  const totalDenda = jumlahHariTelat * tarifPerHari
  return { jumlahHariTelat, totalDenda }
}"

mkf "backend/src/utils/pagination.ts" "export function getPaginationParams(query: Record<string, string | undefined>) {
  const page  = Math.max(1, Number(query.page)  || 1)
  const limit = Math.min(100, Number(query.limit) || 10)
  const skip  = (page - 1) * limit
  return { page, limit, skip }
}"

# ──────────────────────────────────────────────────────────────
sec "BACKEND — Modules"

MODULES=(auth users buku kategori peminjaman perpanjangan denda konfigurasi)
for mod in "${MODULES[@]}"; do
  mkf "backend/src/modules/${mod}/${mod}.routes.ts"     "// TODO: ${mod} routes\nexport {}"
  mkf "backend/src/modules/${mod}/${mod}.controller.ts" "// TODO: ${mod} controller\nexport {}"
  mkf "backend/src/modules/${mod}/${mod}.service.ts"    "// TODO: ${mod} service\nexport {}"
done

# ──────────────────────────────────────────────────────────────
sec "BACKEND — Entry Point & Prisma"

mkf "backend/src/index.ts" "import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { corsConfig } from './config/cors.config'
import { appConfig } from './config/app.config'

const app = new Elysia()
  .use(cors(corsConfig))
  .get('/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))

app.listen(appConfig.port, () => {
  console.log(\`🚀 Backend running at http://localhost:\${appConfig.port}\`)
})"

mkf "backend/prisma/schema.prisma" 'generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  anggota
  admin
  super_admin
}

enum StatusPeminjaman {
  dipesan
  dipinjam
  dikembalikan
  ditolak
}

enum StatusPerpanjangan {
  menunggu
  disetujui
  ditolak
}

enum StatusDenda {
  belum_lunas
  lunas
}

enum CoverSource {
  upload
  url
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  googleId  String?  @unique @map("google_id")
  avatarUrl String?  @map("avatar_url")
  role      Role     @default(anggota)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  peminjaman           Peminjaman[]
  denda                Denda[]
  adminPerpanjangan    Perpanjangan[] @relation("AdminPerpanjangan")
  adminDenda           Denda[]        @relation("AdminDenda")
  konfigurasiDiupdate  Konfigurasi[]

  @@map("users")
}

model Kategori {
  id   String @id @default(cuid())
  nama String @unique
  buku Buku[]

  @@map("kategori")
}

model Buku {
  id          String      @id @default(cuid())
  judul       String
  pengarang   String
  penerbit    String?
  tahun       Int?
  isbn        String?     @unique
  kategoriId  String      @map("kategori_id")
  stok        Int         @default(0)
  coverUrl    String?     @map("cover_url")
  coverSource CoverSource @default(url) @map("cover_source")
  deskripsi   String?
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")

  kategori   Kategori     @relation(fields: [kategoriId], references: [id])
  peminjaman Peminjaman[]

  @@map("buku")
}

model Peminjaman {
  id                  String           @id @default(cuid())
  userId              String           @map("user_id")
  bukuId              String           @map("buku_id")
  status              StatusPeminjaman @default(dipesan)
  tglPinjam           DateTime?        @map("tgl_pinjam")
  tglKembaliRencana   DateTime?        @map("tgl_kembali_rencana")
  tglKembaliAktual    DateTime?        @map("tgl_kembali_aktual")
  counterPerpanjangan Int              @default(0) @map("counter_perpanjangan")
  createdAt           DateTime         @default(now()) @map("created_at")
  updatedAt           DateTime         @updatedAt @map("updated_at")

  user         User           @relation(fields: [userId], references: [id])
  buku         Buku           @relation(fields: [bukuId], references: [id])
  perpanjangan Perpanjangan[]
  denda        Denda[]

  @@map("peminjaman")
}

model Perpanjangan {
  id           String             @id @default(cuid())
  peminjamanId String             @map("peminjaman_id")
  durasiHari   Int                @map("durasi_hari")
  status       StatusPerpanjangan @default(menunggu)
  tglPengajuan DateTime           @default(now()) @map("tgl_pengajuan")
  tglDiproses  DateTime?          @map("tgl_diproses")
  adminId      String?            @map("admin_id")

  peminjaman Peminjaman @relation(fields: [peminjamanId], references: [id])
  admin      User?      @relation("AdminPerpanjangan", fields: [adminId], references: [id])

  @@map("perpanjangan")
}

model Denda {
  id              String      @id @default(cuid())
  peminjamanId    String      @map("peminjaman_id")
  userId          String      @map("user_id")
  jumlahHariTelat Int         @map("jumlah_hari_telat")
  tarifPerHari    Int         @map("tarif_per_hari")
  totalDenda      Int         @map("total_denda")
  status          StatusDenda @default(belum_lunas)
  tglLunas        DateTime?   @map("tgl_lunas")
  adminId         String?     @map("admin_id")
  createdAt       DateTime    @default(now()) @map("created_at")

  peminjaman Peminjaman @relation(fields: [peminjamanId], references: [id])
  user       User       @relation(fields: [userId], references: [id])
  admin      User?      @relation("AdminDenda", fields: [adminId], references: [id])

  @@map("denda")
}

model Konfigurasi {
  id          String   @id @default(cuid())
  key         String   @unique
  value       String
  updatedBy   String   @map("updated_by")
  updatedAt   DateTime @updatedAt @map("updated_at")

  updatedByUser User @relation(fields: [updatedBy], references: [id])

  @@map("konfigurasi")
}'

mkf "backend/prisma/seed.ts" "import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@perpustakaan.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'superadmin@perpustakaan.com',
      role: Role.super_admin,
    },
  })
  console.log('Super Admin seeded:', superAdmin.email)

  // Seed default Konfigurasi
  const configs = [
    { key: 'tarif_denda_per_hari', value: '1000' },
    { key: 'durasi_pinjam_default', value: '14' },
    { key: 'maks_buku_per_anggota', value: '2' },
    { key: 'maks_perpanjangan', value: '2' },
  ]
  for (const config of configs) {
    await prisma.konfigurasi.upsert({
      where: { key: config.key },
      update: {},
      create: { ...config, updatedBy: superAdmin.id },
    })
  }
  console.log('Konfigurasi default seeded')
}

main()
  .catch(console.error)
  .finally(() => prisma.\$disconnect())"

# ──────────────────────────────────────────────────────────────
sec "FRONTEND — Lib"

mkf "frontend/src/lib/api.ts" "const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(\`\${BASE_URL}\${path}\`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed')
  return res.json()
}"

mkf "frontend/src/lib/auth.ts" "// TODO: Google OAuth helper (redirect ke /auth/google)
export function redirectToGoogle() {
  window.location.href = \`\${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google\`
}"

mkf "frontend/src/lib/utils.ts" "import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTanggal(date?: string | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(date))
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
}"

mkf "frontend/src/lib/query-client.ts" "import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
})"

# ──────────────────────────────────────────────────────────────
sec "FRONTEND — Hooks"

mkf "frontend/src/hooks/useAuth.ts" "// TODO: Hook untuk mengambil user session dari store
export {}"

mkf "frontend/src/hooks/useBuku.ts" "// TODO: Hook fetch daftar buku & detail
export {}"

mkf "frontend/src/hooks/usePeminjaman.ts" "// TODO: Hook fetch peminjaman anggota
export {}"

mkf "frontend/src/hooks/useDenda.ts" "// TODO: Hook fetch denda anggota
export {}"

# ──────────────────────────────────────────────────────────────
sec "FRONTEND — Stores"

mkf "frontend/src/stores/auth.store.ts" "// TODO: Zustand store untuk user session
// import { create } from 'zustand'
export {}"

mkf "frontend/src/stores/ui.store.ts" "// TODO: Zustand store untuk UI state (sidebar open, modal, dll)
export {}"

# ──────────────────────────────────────────────────────────────
sec "FRONTEND — Layout Components"

layout_files=(
  "frontend/src/components/layout/Navbar.tsx|Navbar"
  "frontend/src/components/layout/Sidebar.tsx|Sidebar"
  "frontend/src/components/layout/Footer.tsx|Footer"
  "frontend/src/components/layout/GuestLayout.tsx|GuestLayout"
  "frontend/src/components/layout/MemberLayout.tsx|MemberLayout"
  "frontend/src/components/layout/AdminLayout.tsx|AdminLayout"
)
for item in "${layout_files[@]}"; do
  IFS='|' read -r path name <<< "$item"
  mkf "$path" "// TODO: [${name}] layout component
export default function ${name}({ children }: { children?: React.ReactNode }) {
  return <div data-layout=\"${name}\">{children}</div>
}"
done

# ──────────────────────────────────────────────────────────────
sec "FRONTEND — Shared Components"

shared_files=(
  "StatusBadge" "LoadingSpinner" "EmptyState" "Pagination" "SearchBar"
  "ProtectedRoute" "RoleGate"
)
for name in "${shared_files[@]}"; do
  mkf "frontend/src/components/shared/${name}.tsx" "// TODO: [${name}] shared component
export default function ${name}() {
  return <div data-component=\"${name}\">{/* TODO */}</div>
}"
done

# ──────────────────────────────────────────────────────────────
sec "FRONTEND — Pages"

declare -A pages=(
  ["frontend/src/pages/public/HomePage.tsx"]="HomePage"
  ["frontend/src/pages/public/KatalogPage.tsx"]="KatalogPage"
  ["frontend/src/pages/public/BukuDetailPage.tsx"]="BukuDetailPage"
  ["frontend/src/pages/auth/LoginPage.tsx"]="LoginPage"
  ["frontend/src/pages/auth/CallbackPage.tsx"]="CallbackPage"
  ["frontend/src/pages/anggota/DashboardPage.tsx"]="DashboardPage"
  ["frontend/src/pages/anggota/PeminjamanPage.tsx"]="PeminjamanPage"
  ["frontend/src/pages/anggota/PeminjamanDetailPage.tsx"]="PeminjamanDetailPage"
  ["frontend/src/pages/anggota/ProfilPage.tsx"]="ProfilPage"
  ["frontend/src/pages/admin/DashboardPage.tsx"]="AdminDashboardPage"
  ["frontend/src/pages/admin/BukuPage.tsx"]="BukuPage"
  ["frontend/src/pages/admin/AnggotaPage.tsx"]="AnggotaPage"
  ["frontend/src/pages/admin/PeminjamanPage.tsx"]="AdminPeminjamanPage"
  ["frontend/src/pages/admin/PeminjamanDetailPage.tsx"]="AdminPeminjamanDetailPage"
  ["frontend/src/pages/admin/DendaPage.tsx"]="DendaPage"
  ["frontend/src/pages/superadmin/UsersPage.tsx"]="UsersPage"
  ["frontend/src/pages/superadmin/KonfigurasiPage.tsx"]="KonfigurasiPage"
  ["frontend/src/pages/superadmin/AuditLogPage.tsx"]="AuditLogPage"
)

for path in "${!pages[@]}"; do
  name="${pages[$path]}"
  mkf "$path" "// TODO: [${name}]
export default function ${name}() {
  return (
    <main>
      <h1>${name}</h1>
      {/* TODO: implement */}
    </main>
  )
}"
done

# ──────────────────────────────────────────────────────────────
sec "FRONTEND — Assets Directories"

mkdir -p frontend/src/assets/fonts
mkdir -p frontend/src/assets/images
touch frontend/src/assets/fonts/.gitkeep
touch frontend/src/assets/images/.gitkeep
ok "created frontend/src/assets/fonts/ & images/"

# ──────────────────────────────────────────────────────────────
sec "FRONTEND — .env.example"

mkf "frontend/.env.example" "VITE_API_URL=http://localhost:3000"

# ──────────────────────────────────────────────────────────────
sec "BACKEND — .env.example"

mkf "backend/.env.example" 'DATABASE_URL="postgresql://postgres:password@localhost:5432/tidur_plus_db"
JWT_SECRET=ganti_dengan_secret_panjang_random
JWT_REFRESH_SECRET=ganti_dengan_refresh_secret_panjang_random
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=dari_google_cloud_console
GOOGLE_CLIENT_SECRET=dari_google_cloud_console
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
FRONTEND_URL=http://localhost:5173
PORT=3000
UPLOAD_DIR=./uploads'

# ──────────────────────────────────────────────────────────────
echo -e "\n${GREEN}✅ Setup selesai!${NC}"
echo -e "\nLangkah selanjutnya:"
echo -e "  1. ${YELLOW}cp .env.example .env${NC}  kemudian isi nilainya"
echo -e "  2. ${YELLOW}docker compose up -d${NC}"
echo -e "  3. ${YELLOW}bun install${NC}"
echo -e "  4. ${YELLOW}cd backend && bun db:migrate && bun db:seed${NC}"
echo -e "  5. ${YELLOW}bun dev:fe${NC}  &  ${YELLOW}bun dev:be${NC}\n"
