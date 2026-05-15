# 🗂️ Struktur Folder Monorepo — Sistem Perpustakaan Digital

> Versi: `v0.2` | 8 Anggota Tim | Stack: Bun + React + Vite + ElysiaJS + PostgreSQL

---

## 👥 Pembagian Tim

| Nama       | Role             | Tampilan / Area yang Dikerjakan                                                        |
| ---------- | ---------------- | -------------------------------------------------------------------------------------- |
| **Timo**   | Frontend Lead    | Landing page, routing, layout sistem (Navbar, Sidebar, Footer, semua wrapper layout)   |
| **Bila**   | Frontend         | Design system & styling — globals.css, animasi, responsive, aset visual                |
| **Naomy**  | Frontend         | Tampilan Auth — halaman Login Google, Callback, halaman Profil Anggota                 |
| **Sheren** | Frontend         | Tampilan Anggota — Katalog Buku, Detail Buku, Rak Pinjaman, Form Perpanjangan          |
| **Nadya**  | Frontend         | Tampilan Admin — Panel Dashboard Admin, Kelola Buku, Validasi Peminjaman, Kelola Denda |
| **Nayla**  | Frontend         | Tampilan Super Admin — Kelola User & Role, Konfigurasi Sistem, Audit Log               |
| **Marcel** | Backend          | Bebas — API routes, controllers, services, Prisma schema                               |
| **Rafli**  | Backend + DevOps | Bebas — Auth, middleware RBAC, CI/CD, konfigurasi monorepo                             |

---

## 📁 Struktur Lengkap

```
tidur-plus/                                  ← ROOT MONOREPO
│
├── 📄 package.json                          ← [Rafli] Bun workspaces config
├── 📄 tsconfig.json                         ← [Rafli] TS project references root
├── 📄 bun.lock
├── 📄 .env.example                          ← [Rafli] Template env vars
├── 📄 .gitignore
├── 📄 README.md
│
├── 🐳 docker-compose.yml                    ← [Rafli] PostgreSQL lokal
├── 📁 .github/
│   └── workflows/
│       ├── ci.yml                           ← [Rafli] GitHub Actions CI
│       └── deploy.yml                       ← [Rafli] Deploy pipeline
│
├── 📁 docs/
│   ├── prd.md                               ← PRD sistem
│   ├── structure.md                         ← File ini
│   ├── ai-context.md                        ← Konteks untuk AI tim
│   ├── api.md                               ← [Marcel] Dokumentasi API endpoint
│   ├── database.md                          ← [Marcel/Rafli] ERD & schema notes
│   └── git-flow.md                          ← [Rafli] Panduan Git untuk tim
│
│
├── 📦 shared/                               ← Package bersama (@tidur-plus/shared)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts                         ← Re-export semua
│       ├── types/
│       │   ├── user.types.ts                ← Role, User interface
│       │   ├── buku.types.ts                ← Buku, Kategori
│       │   ├── peminjaman.types.ts          ← Peminjaman, Perpanjangan
│       │   └── denda.types.ts               ← Denda
│       └── constants/
│           ├── roles.ts                     ← ENUM Role constants
│           ├── status.ts                    ← ENUM Status constants
│           └── config.ts                    ← Default config values
│
│
├── 🖥️  backend/                             ← [Marcel + Rafli] @tidur-plus/backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                                 ← (gitignored)
│   ├── .env.example
│   │
│   ├── prisma/
│   │   ├── schema.prisma                    ← Database schema
│   │   ├── seed.ts                          ← Data seeder (super admin awal)
│   │   └── migrations/                      ← Auto-generated oleh Prisma
│   │
│   └── src/
│       ├── index.ts                         ← Entry point ElysiaJS
│       │
│       ├── config/
│       │   ├── app.config.ts
│       │   ├── cors.config.ts
│       │   └── jwt.config.ts
│       │
│       ├── lib/
│       │   ├── prisma.ts                    ← Prisma client singleton
│       │   ├── google-oauth.ts              ← Google OAuth setup
│       │   └── storage.ts                   ← Upload handler (file/url)
│       │
│       ├── middlewares/
│       │   ├── auth.middleware.ts           ← Validasi JWT token
│       │   ├── rbac.middleware.ts           ← Guard berdasarkan role
│       │   └── error.middleware.ts          ← Global error handler
│       │
│       ├── modules/                         ← Feature-based
│       │   ├── auth/
│       │   │   ├── auth.routes.ts
│       │   │   ├── auth.controller.ts
│       │   │   └── auth.service.ts
│       │   ├── users/
│       │   │   ├── users.routes.ts
│       │   │   ├── users.controller.ts
│       │   │   └── users.service.ts
│       │   ├── buku/
│       │   │   ├── buku.routes.ts
│       │   │   ├── buku.controller.ts
│       │   │   └── buku.service.ts
│       │   ├── kategori/
│       │   │   ├── kategori.routes.ts
│       │   │   ├── kategori.controller.ts
│       │   │   └── kategori.service.ts
│       │   ├── peminjaman/
│       │   │   ├── peminjaman.routes.ts
│       │   │   ├── peminjaman.controller.ts
│       │   │   └── peminjaman.service.ts
│       │   ├── perpanjangan/
│       │   │   ├── perpanjangan.routes.ts
│       │   │   ├── perpanjangan.controller.ts
│       │   │   └── perpanjangan.service.ts
│       │   ├── denda/
│       │   │   ├── denda.routes.ts
│       │   │   ├── denda.controller.ts
│       │   │   └── denda.service.ts
│       │   └── konfigurasi/
│       │       ├── konfigurasi.routes.ts
│       │       ├── konfigurasi.controller.ts
│       │       └── konfigurasi.service.ts
│       │
│       └── utils/
│           ├── response.ts                  ← Standar format API response
│           ├── denda.helper.ts              ← Hitung denda otomatis
│           └── pagination.ts               ← Helper pagination
│
│
└── 🎨 frontend/                             ← [Timo lead] @tidur-plus/frontend
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts                       ← Vite + React + Tailwind v4
    ├── vite-env.d.ts
    ├── index.html                           ← Entry HTML (root frontend, bukan src/)
    ├── .env                                 ← (gitignored)
    ├── .env.example
    │
    ├── styles/
    │   └── globals.css                      ← [Bila] Tailwind v4, design tokens, font, warna
    │
    └── src/
        ├── main.tsx                         ← [Timo] Entry point React
        ├── App.tsx                          ← [Timo] Router utama
        │
        ├── assets/                          ← [Bila] Font, gambar, ikon
        │   ├── fonts/
        │   └── images/
        │
        ├── lib/
        │   ├── api.ts                       ← [Timo] Fetch/axios instance
        │   ├── auth.ts                      ← [Naomy] Google OAuth helper FE
        │   ├── utils.ts                     ← cn(), format tanggal, dll
        │   └── query-client.ts              ← [Timo] React Query setup
        │
        ├── hooks/
        │   ├── useAuth.ts                   ← [Naomy] Hook auth & user state
        │   ├── useBuku.ts                   ← [Sheren] Hook fetch buku
        │   ├── usePeminjaman.ts             ← [Sheren] Hook peminjaman
        │   └── useDenda.ts                  ← [Nadya] Hook denda
        │
        ├── stores/
        │   ├── auth.store.ts                ← [Naomy] User session store
        │   └── ui.store.ts                  ← [Bila] Sidebar, modal state
        │
        ├── components/
        │   ├── ui/                          ← Shadcn base components (semua bisa pakai)
        │   │   ├── button.tsx
        │   │   ├── label.tsx
        │   │   ├── card.tsx
        │   │   ├── badge.tsx
        │   │   ├── modal.tsx
        │   │   ├── input.tsx
        │   │   ├── select.tsx
        │   │   ├── table.tsx
        │   │   ├── skeleton.tsx
        │   │   └── toast.tsx
        │   │
        │   ├── layout/                      ← [Timo + Bila]
        │   │   ├── Navbar.tsx
        │   │   ├── Sidebar.tsx              ← Sidebar panel admin
        │   │   ├── Footer.tsx
        │   │   ├── GuestLayout.tsx
        │   │   ├── MemberLayout.tsx
        │   │   └── AdminLayout.tsx
        │   │
        │   └── shared/                      ← Komponen kecil reusable
        │       ├── StatusBadge.tsx
        │       ├── LoadingSpinner.tsx
        │       ├── EmptyState.tsx
        │       ├── Pagination.tsx
        │       ├── SearchBar.tsx
        │       ├── ProtectedRoute.tsx       ← [Naomy] HOC guard route
        │       └── RoleGate.tsx             ← [Naomy] Render kondisional by role
        │
        └── pages/                           ← Halaman utama (per tampilan)
            │
            ├── public/                      ← [Timo + Bila] Bisa diakses guest
            │   ├── HomePage.tsx             ← Landing page
            │   ├── KatalogPage.tsx          ← Rak buku / daftar koleksi
            │   └── BukuDetailPage.tsx       ← Detail buku
            │
            ├── auth/                        ← [Naomy]
            │   ├── LoginPage.tsx            ← Halaman login via Google
            │   └── CallbackPage.tsx         ← Handler redirect OAuth
            │
            ├── anggota/                     ← [Sheren] Protected: role anggota
            │   ├── DashboardPage.tsx        ← Ringkasan aktivitas anggota
            │   ├── PeminjamanPage.tsx       ← Daftar pinjaman aktif & riwayat
            │   ├── PeminjamanDetailPage.tsx ← Detail + form ajukan perpanjangan
            │   └── ProfilPage.tsx           ← Edit profil akun
            │
            ├── admin/                       ← [Nadya] Protected: role admin
            │   ├── DashboardPage.tsx        ← Panel statistik admin
            │   ├── BukuPage.tsx             ← Kelola buku (CRUD)
            │   ├── AnggotaPage.tsx          ← Daftar anggota
            │   ├── PeminjamanPage.tsx       ← Semua transaksi peminjaman
            │   ├── PeminjamanDetailPage.tsx ← Detail + tombol validasi status
            │   └── DendaPage.tsx            ← Kelola denda & tandai lunas
            │
            └── superadmin/                  ← [Nayla] Protected: role super_admin
                ├── UsersPage.tsx            ← CRUD semua user & assign role
                ├── KonfigurasiPage.tsx      ← Atur tarif denda, durasi pinjam, dll
                └── AuditLogPage.tsx         ← Log seluruh aktivitas sistem
```

---

## 📌 Catatan Penting

> [!IMPORTANT]
> Baca ini dulu sebelum mulai coding!

### Git Flow

- Branch utama: `main` (production-ready, jangan disentuh langsung)
- Branch develop: `dev` (integration, semua PR masuk ke sini)
- Branch fitur: `feat/<namamu>/<deskripsi>` — contoh: `feat/sheren/katalog-page`
- Branch fix: `fix/<namamu>/<deskripsi>`
- **Wajib PR ke `dev`, dilarang push langsung ke `main`**

### Pembagian Task Awal (Urutan Prioritas)

**Backend (Marcel + Rafli) — Kerjakan duluan biar FE bisa nyambung:**

1. `prisma/schema.prisma` — schema DB final
2. `middlewares/auth.middleware.ts` + `rbac.middleware.ts`
3. `modules/auth/` — Google OAuth flow
4. `modules/buku/` — CRUD buku (paling dibutuhkan FE duluan)
5. `modules/peminjaman/` + `modules/perpanjangan/` + `modules/denda/`

**Frontend — Kerjakan paralel, sesuai tampilan masing-masing:**

1. **Bila** — polish `globals.css`, setup design system, layout dasar
2. **Timo** — setup router, `GuestLayout`, `MemberLayout`, `AdminLayout`
3. **Naomy** — tampilan Login Google + Callback + Profil
4. **Sheren** — tampilan Katalog, Detail Buku, Rak Pinjaman, Form Perpanjangan
5. **Nadya** — tampilan Panel Admin (Dashboard, Buku, Peminjaman, Denda)
6. **Nayla** — tampilan Super Admin (Users, Konfigurasi, Audit Log)
