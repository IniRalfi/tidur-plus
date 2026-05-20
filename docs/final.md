# 🏗️ TIDUR+ — Progress Tracker & Implementation Plan

> Sistem Manajemen Perpustakaan Digital | RBAC (Anggota · Admin · Super Admin)
> Database: PostgreSQL (Local) | Stack: Bun + ElysiaJS + Prisma + React + Vite

---

## 📊 Hasil Analisis Proyek

### ✅ Yang Sudah Ada & Berfungsi

| Area                           | Status      | Catatan                                                                      |
| ------------------------------ | ----------- | ---------------------------------------------------------------------------- |
| Prisma Schema                  | ✅ Lengkap  | User, Buku, Kategori, Peminjaman, Perpanjangan, Denda, AuditLog, Konfigurasi |
| `shared/` types                | ✅ Ada      | user, buku, peminjaman, denda types + Role enum                              |
| Backend: `buku` module         | ✅ Ada      | CRUD lengkap                                                                 |
| Backend: `kategori` module     | ✅ Ada      | CRUD lengkap                                                                 |
| Backend: `peminjaman` module   | ✅ Ada      | CRUD + approve/tolak/kembalikan                                              |
| Backend: `perpanjangan` module | ✅ Ada      | Create + approve/tolak                                                       |
| Backend: `denda` module        | ✅ Ada      | getAll + lunas                                                               |
| Backend: `users` module        | ✅ Ada      | CRUD + toggle role/aktif                                                     |
| Backend: `konfigurasi` module  | ✅ Ada      | Get + update                                                                 |
| Frontend: Admin pages          | ✅ Sebagian | BukuPage, PeminjamanPage, DashboardPage, DendaPage, AnggotaPage              |
| Frontend: Superadmin pages     | ✅ Lengkap  | UsersPage, KonfigurasiPage, AuditLogPage                                     |
| Frontend: Anggota pages        | ✅ Sebagian | DashboardPage, PeminjamanPage, ProfilPage                                    |
| Frontend: Auth pages           | ✅ Sebagian | LoginPage, RegisterPage (UI sudah ada)                                       |
| Styling                        | ✅ Ada      | Tailwind v4 + custom earthy palette                                          |

### ❌ Yang Belum Ada / Kosong

| Area                                          | Status            | Catatan                                                  |
| --------------------------------------------- | ----------------- | -------------------------------------------------------- |
| Backend: `auth` module                        | ❌ **KOSONG**     | `// TODO` semua                                          |
| Backend: `auth.middleware.ts`                 | ❌ **KOSONG**     | `// TODO`                                                |
| Backend: `rbac.middleware.ts`                 | ❌ **Stub**       | Tidak berfungsi                                          |
| Backend: Auth tidak di-register di `index.ts` | ❌                | authRoutes belum dipasang                                |
| Backend: Password field di User               | ❌                | Schema tidak punya field `password` (hanya Google OAuth) |
| Backend: Seed admin/superadmin                | ❌                | Belum ada                                                |
| Frontend: `main.tsx`                          | ⚠️ **Berantakan** | Banyak kode ter-comment, perlu dibersihkan               |
| Frontend: `src/index.css`                     | ⚠️                | File sisa duplikat, bisa dihapus                         |
| Frontend: `APITester.tsx`                     | ⚠️                | File testing sisa, tidak dipakai                         |
| Frontend: Auth store/context                  | ❌                | Tidak ada state management untuk user login              |
| Frontend: Route guard (RBAC)                  | ❌                | Tidak ada proteksi route berdasarkan role                |
| Frontend: API client/service                  | ❌                | Tidak ada layer fetch ke backend                         |
| Frontend: Public pages (Katalog)              | ✅ Ada            | KatalogPage, BukuDetailPage                              |
| `.env` file                                   | ❌                | Hanya ada `.env.example`, belum dibuat `.env`            |
| Admin & SuperAdmin seed account               | ❌                | Belum ada password di schema                             |

### ⚠️ Bug & Issue yang Ditemukan

- `main.tsx` penuh kode ter-comment dan berantakan → perlu dibersihkan
- `shared/types/user.types.ts` punya field `role` (singular) tapi Prisma schema pakai `roles` (array)
- `auth.middleware.ts`, `rbac.middleware.ts` tidak berfungsi sama sekali
- Backend tidak punya field `password` di User model — perlu ditambahkan untuk login email/pass
- `requireRole()` di rbac middleware hanya return array roles, bukan middleware Elysia

---

## 🗺️ Rencana Fase Implementasi

---

### FASE 1 — Fondasi Database & Auth Backend

> **Goal:** Database berjalan, login/register bisa dipakai, seeder admin/superadmin ada

- [ ] **1.1** Buat file `.env` di root & backend berdasarkan `.env.example`
- [ ] **1.2** Update Prisma schema — tambah field `password` (nullable) ke model `User`
- [ ] **1.3** Jalankan `prisma migrate dev` untuk apply perubahan schema
- [ ] **1.4** Implementasi `auth.service.ts`:
  - [ ] `register()` — hash password, simpan user baru dengan role ANGGOTA
  - [ ] `login()` — validasi email+password, return JWT access token + refresh token
  - [ ] `refreshToken()` — validasi refresh token, return access token baru
  - [ ] `getMe()` — return profil user dari token
- [ ] **1.5** Implementasi `auth.controller.ts`
- [ ] **1.6** Implementasi `auth.routes.ts` dengan endpoint:
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /auth/refresh`
  - `GET /auth/me`
- [ ] **1.7** Implementasi `auth.middleware.ts` — verifikasi JWT, inject `user` ke context
- [ ] **1.8** Implementasi `rbac.middleware.ts` — guard berdasarkan role array
- [ ] **1.9** Register `authRoutes` di `backend/src/index.ts`
- [ ] **1.10** Buat `prisma/seed.ts` — seed akun admin & superadmin dengan password dari `.env`
- [ ] **1.11** Tambah script `db:seed` dan variabel env `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SUPER_ADMIN_EMAIL`, `SUPER_ADMIN_PASSWORD` di `.env.example`

---

### FASE 2 — Perbaikan & Cleanup Codebase

> **Goal:** Semua file bersih, tidak ada kode mati, tidak ada error

- [ ] **2.1** Bersihkan `frontend/src/main.tsx` — hapus semua comment tidak perlu
- [ ] **2.2** Hapus file sisa: `frontend/src/APITester.tsx`, `frontend/src/index.css`
- [ ] **2.3** Sinkronkan `shared/types/user.types.ts` — ubah `role` jadi `roles: Role[]`
- [ ] **2.4** Fix route konflik di `backend` (sudah sebagian selesai sebelumnya)
- [ ] **2.5** Pasang CORS di backend `index.ts` untuk izinkan request dari `localhost:5173`
- [ ] **2.6** Tambah prefix `/api` di semua routes backend untuk konsistensi

---

### FASE 3 — Frontend Auth & Route Guard

> **Goal:** Login/Register berfungsi, route terlindungi sesuai role

- [ ] **3.1** Buat `frontend/src/lib/api.ts` — axios/fetch wrapper dengan base URL & interceptor token
- [ ] **3.2** Buat `frontend/src/stores/authStore.ts` — Zustand store untuk state user, token
- [ ] **3.3** Buat `frontend/src/lib/auth.service.ts` — fungsi login, register, logout, getMe
- [ ] **3.4** Update `LoginPage.tsx` — hubungkan form ke API + simpan token ke store
- [ ] **3.5** Update `RegisterPage.tsx` — hubungkan form ke API
- [ ] **3.6** Buat `frontend/src/components/auth/ProtectedRoute.tsx` — guard berdasarkan role
- [ ] **3.7** Update `App.tsx` — pasang ProtectedRoute di semua route yang butuh auth
- [ ] **3.8** Buat `frontend/src/hooks/useAuth.ts` — hook untuk akses auth store

---

### FASE 4 — Integrasi Frontend ↔ Backend (Per Fitur)

> **Goal:** Setiap halaman bisa fetch data real dari backend

- [ ] **4.1** Setup `@tanstack/react-query` di `main.tsx` dengan `QueryClientProvider`
- [ ] **4.2** Buat API services per module: `buku.service.ts`, `peminjaman.service.ts`, dll.
- [ ] **4.3** Integrasi halaman Admin:
  - [ ] `BukuPage` — fetch katalog, CRUD buku
  - [ ] `AnggotaPage` — fetch users, toggle role/aktif
  - [ ] `PeminjamanPage` — fetch peminjaman, approve/tolak/kembalikan
  - [ ] `DendaPage` — fetch denda, tandai lunas
  - [ ] `DashboardPage` — statistik ringkasan
- [ ] **4.4** Integrasi halaman Superadmin:
  - [ ] `UsersPage` — fetch users, toggle role
  - [ ] `KonfigurasiPage` — get & update konfigurasi sistem
  - [ ] `AuditLogPage` — fetch audit log
- [ ] **4.5** Integrasi halaman Anggota:
  - [ ] `DashboardPage` — statistik peminjaman user
  - [ ] `PeminjamanPage` — riwayat peminjaman user
  - [ ] `ProfilPage` — update profil

---

### FASE 5 — Polish & Testing

> **Goal:** Aplikasi siap demo, semua flow berjalan

- [ ] **5.1** Test flow lengkap: Register → Login → Akses halaman sesuai role
- [ ] **5.2** Test seed: Login sebagai admin & superadmin
- [ ] **5.3** Error handling di frontend (toast notifikasi)
- [ ] **5.4** Loading state di semua halaman
- [ ] **5.5** Responsive check
- [ ] **5.6** Commit & push semua perubahan

---

## 📁 Struktur File yang Akan Dibuat

```
backend/src/
├── modules/auth/
│   ├── auth.service.ts      ← Fase 1
│   ├── auth.controller.ts   ← Fase 1
│   └── auth.routes.ts       ← Fase 1
├── middlewares/
│   ├── auth.middleware.ts   ← Fase 1
│   └── rbac.middleware.ts   ← Fase 1
└── prisma/seed.ts           ← Fase 1

frontend/src/
├── lib/
│   ├── api.ts               ← Fase 3
│   ├── auth.service.ts      ← Fase 3
│   └── [module].service.ts  ← Fase 4
├── stores/
│   └── authStore.ts         ← Fase 3
├── hooks/
│   └── useAuth.ts           ← Fase 3
└── components/auth/
    └── ProtectedRoute.tsx   ← Fase 3
```

---

## 🔑 Variabel ENV yang Perlu Ditambahkan

```env
# Seed Accounts
ADMIN_EMAIL=admin@tidurplus.id
ADMIN_PASSWORD=   ← isi password kuat
SUPER_ADMIN_EMAIL=superadmin@tidurplus.id
SUPER_ADMIN_PASSWORD=  ← isi password kuat
```

---

## 🚀 Urutan Eksekusi Sekarang

**MULAI DARI FASE 1** karena semua fase lain bergantung pada auth yang berfungsi.

Setelah kamu konfirmasi, saya langsung mulai dari:

1. Setup `.env` lokal
2. Update Prisma schema (tambah `password`)
3. Implementasi auth module lengkap
4. Seeder akun admin & superadmin
