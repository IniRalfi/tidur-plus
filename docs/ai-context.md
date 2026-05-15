# 🧠 AI Context — Sistem Perpustakaan Digital (RBAC)

> **Cara pakai**: Copy seluruh isi dokumen ini, paste ke AI kamu (ChatGPT / Claude / Gemini dll) di awal sesi baru. Setelah itu langsung tanya apa yang kamu butuhkan terkait koding.

---

## Gambaran Proyek

Kita sedang membangun **sistem manajemen perpustakaan digital** dengan fitur RBAC (Role-Based Access Control). Proyek ini adalah tugas kuliah yang dikerjakan oleh tim 8 orang. Terinspirasi dari sistem BOBO+.

Arsitektur: **Bun Monorepo** — satu repository berisi tiga package terpisah.

---

## Tech Stack

**Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui (Radix UI)

**Backend**: ElysiaJS + TypeScript + Prisma ORM + PostgreSQL

**Auth**: Google OAuth 2.0 + JWT (Access Token + Refresh Token)

**Monorepo**: Bun Workspaces

**Shared Package**: TypeScript types dan constants yang dipakai bersama FE dan BE

---

## Struktur Folder (Ringkasan)

```
tidur-plus/
├── package.json          ← Bun workspaces root
├── docker-compose.yml    ← PostgreSQL lokal
├── docs/                 ← Dokumentasi (PRD, API, struktur)
├── shared/               ← Types & constants bersama
│   └── src/
│       ├── types/        ← user.types.ts, buku.types.ts, dll
│       └── constants/    ← roles.ts, status.ts, config.ts
├── backend/
│   ├── prisma/           ← schema.prisma, migrations, seed
│   └── src/
│       ├── config/       ← app, cors, jwt config
│       ├── lib/          ← prisma client, google oauth, storage
│       ├── middlewares/  ← auth, rbac, error handler
│       ├── modules/      ← auth, users, buku, kategori, peminjaman, perpanjangan, denda, konfigurasi
│       └── utils/        ← response format, denda helper, pagination
└── frontend/
    ├── vite.config.ts
    ├── index.html        ← di root frontend (bukan di src/)
    ├── styles/
    │   └── globals.css   ← Tailwind v4 design tokens, warna, font
    └── src/
        ├── main.tsx      ← entry point
        ├── App.tsx       ← router utama
        ├── assets/       ← font, gambar
        ├── lib/          ← api instance, auth, utils, query-client
        ├── hooks/        ← useAuth, useBuku, usePeminjaman, useDenda
        ├── stores/       ← auth.store, ui.store (Zustand)
        ├── components/
        │   ├── ui/       ← shadcn base components
        │   ├── layout/   ← Navbar, Sidebar, GuestLayout, MemberLayout, AdminLayout
        │   ├── shared/   ← StatusBadge, Pagination, SearchBar, dll
        │   ├── buku/     ← BukuCard, BukuGrid, BukuDetail, BukuForm, BukuFilter
        │   ├── peminjaman/ ← PeminjamanCard, PerpanjanganForm, StatusTimeline
        │   ├── admin/    ← ValidasiCard, DendaTable, StatCard
        │   └── auth/     ← GoogleLoginButton, ProtectedRoute, RoleGate
        └── pages/
            ├── public/   ← HomePage, KatalogPage, BukuDetailPage
            ├── auth/     ← LoginPage, CallbackPage
            ├── anggota/  ← Dashboard, Peminjaman, PeminjamanDetail, Profil
            ├── admin/    ← Dashboard, Buku, Anggota, Peminjaman, Denda
            └── superadmin/ ← Users, Konfigurasi, AuditLog
```

---

## Role & Akses

**Guest (tidak login)**: lihat katalog buku, lihat detail buku, bisa daftar/login

**Anggota**: semua guest + pesan buku, lihat status peminjaman, ajukan perpanjangan, kelola profil

**Admin / Pustakawan**: dashboard statistik, CRUD buku, kelola kategori, lihat daftar anggota, validasi peminjaman (update status), validasi perpanjangan (acc/tolak), kelola denda

**Super Admin**: semua admin + CRUD user & role, konfigurasi sistem, audit log

---

## Business Rules Penting

1. **Pinjam**: Wajib login. Admin harus validasi dulu sebelum status jadi "dipinjam". Maks 2 buku aktif per anggota.

2. **Durasi pinjam default**: 14 hari sejak validasi Admin.

3. **Perpanjangan**: Maks 2 kali per transaksi. Durasi pilih 1, 2, atau 3 hari (via input). Harus disetujui Admin.

4. **Denda**: Dihitung otomatis jika terlambat. Formula: `jumlah_hari_telat × tarif_per_hari`. Tarif dikonfigurasi Super Admin (default Rp 1.000/hari). Admin tandai lunas secara manual. Anggota yang punya denda belum lunas tidak bisa pesan buku baru.

5. **Auth**: Login hanya via Google OAuth. Tidak ada form email/password. Akun langsung aktif setelah login pertama kali.

6. **Cover buku**: Bisa upload file langsung atau input URL eksternal.

---

## Alur Status Peminjaman

```
Dipesan → (Admin validasi) → Dipinjam → (cek tanggal) → Dikembalikan
                                  ↓                            ↑
                          (Ajukan perpanjangan)         (Cek denda jika terlambat)
                          max 2x, +1/2/3 hari
```

---

## Data Model (Ringkasan)

**User**: id, name, email, google_id, avatar_url, role (anggota/admin/super_admin)

**Buku**: id, judul, pengarang, penerbit, tahun, isbn, kategori_id, stok, cover_url, cover_source (upload/url)

**Peminjaman**: id, user_id, buku_id, status, tgl_pinjam, tgl_kembali_rencana, tgl_kembali_aktual, counter_perpanjangan (max 2)

**Perpanjangan**: id, peminjaman_id, durasi_hari (1/2/3), status (menunggu/disetujui/ditolak), admin_id

**Denda**: id, peminjaman_id, user_id, jumlah_hari_telat, tarif_per_hari, total_denda, status (belum_lunas/lunas), admin_id

**Konfigurasi**: id, key (unique), value — untuk aturan bisnis yang bisa diubah Super Admin

---

## Pembagian Tim

- **Timo**: Frontend Lead — pages, layout, routing
- **Sheren**: Frontend — komponen anggota (buku, peminjaman)
- **Tirani**: Frontend — komponen admin (dashboard, validasi)
- **Nayla**: Frontend — komponen UI shared (button, card, modal, form)
- **Naomy**: Frontend — halaman auth (Google login, profil)
- **Bila**: Frontend — styling, animasi, responsive, globals.css
- **Marcel**: Backend — API routes, controllers, Prisma schema
- **Rafli**: Backend + DevOps — auth, middleware RBAC, CI/CD, monorepo config

---

## Git Flow

- Branch utama: `main`
- Branch develop: `dev`
- Branch fitur: `feat/<namamu>/<deskripsi>` — contoh: `feat/sheren/buku-card`
- Branch fix: `fix/<namamu>/<deskripsi>`
- Wajib PR ke `dev`, dilarang push langsung ke `main`

---

## Naming Convention

- **File komponen**: PascalCase — `BukuCard.tsx`
- **File hooks/utils**: camelCase — `useBuku.ts`, `response.ts`
- **CSS class**: gunakan Tailwind utility, hindari CSS custom kecuali di `globals.css`
- **API response format**: selalu pakai helper `utils/response.ts` di backend
- **Environment variable FE**: prefix `VITE_` — contoh: `VITE_API_URL`
- **Environment variable BE**: akses via `process.env.NAMA_VAR`

---

_Dokumen ini cukup sebagai konteks awal. Untuk detail lebih lanjut, lihat `docs/prd.md` dan `docs/structure.md` di repository._
