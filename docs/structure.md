# 🗂️ Struktur Folder Monorepo — Sistem Perpustakaan Digital

> Versi: `v0.1` | 8 Anggota Tim | Stack: Bun + React + ElysiaJS + PostgreSQL

---

## 👥 Pembagian Tim

| Nama       | Role             | Area Kerja                                         |
| ---------- | ---------------- | -------------------------------------------------- |
| **Timo**   | Frontend Lead    | Pages, layout, routing utama                       |
| **Sheren** | Frontend         | Komponen Anggota (pinjam, perpanjang, katalog)     |
| **Tirani** | Frontend         | Komponen Admin (dashboard, validasi)               |
| **Nayla**  | Frontend         | Komponen UI Shared (button, card, modal, form)     |
| **Naomy**  | Frontend         | Halaman Auth (login Google, profil)                |
| **Bila**   | Frontend         | Styling, animasi, responsive                       |
| **Marcel** | Backend          | API routes, controllers, Prisma schema             |
| **Rafli**  | Backend + DevOps | Auth, middleware RBAC, CI/CD, konfigurasi monorepo |

---

## 📁 Struktur Lengkap

```
tidur-plus/                                  ← ROOT MONOREPO
│
├── 📄 package.json                          ← [Rafli] Bun workspaces config
├── 📄 bun.lockb
├── 📄 .env.example                          ← [Rafli] Template env vars
├── 📄 .gitignore
├── 📄 README.md
│
├── 🐳 docker-compose.yml                    ← [Rafli] PostgreSQL lokal
├── 📄 .github/
│   └── workflows/
│       ├── ci.yml                           ← [Rafli] GitHub Actions CI
│       └── deploy.yml                       ← [Rafli] Deploy pipeline
│
├── 📁 docs/                                 ← Dokumentasi proyek
│   ├── prd.md                               ← PRD (sudah ada)
│   ├── api.md                               ← [Marcel] Dokumentasi API
│   ├── database.md                          ← [Marcel/Rafli] ERD & schema
│   └── git-flow.md                          ← [Rafli] Panduan Git untuk tim
│
│
├── 📦 shared/                               ← Package bersama (types, constants)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts                         ← Re-export semua
│       ├── types/
│       │   ├── user.types.ts                ← [Rafli] Role, User interface
│       │   ├── buku.types.ts                ← [Marcel] Buku, Kategori
│       │   ├── peminjaman.types.ts          ← [Marcel] Peminjaman, Perpanjangan
│       │   └── denda.types.ts               ← [Marcel] Denda
│       └── constants/
│           ├── roles.ts                     ← [Rafli] ENUM Role constants
│           ├── status.ts                    ← [Marcel] ENUM Status constants
│           └── config.ts                    ← [Rafli] Default config values
│
│
├── 🖥️  backend/                             ← [Marcel + Rafli]
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                                 ← (gitignored)
│   ├── .env.example
│   │
│   ├── prisma/
│   │   ├── schema.prisma                    ← [Marcel] Database schema
│   │   ├── seed.ts                          ← [Marcel] Data seeder (super admin)
│   │   └── migrations/                      ← Auto-generated
│   │
│   └── src/
│       ├── index.ts                         ← [Rafli] Entry point ElysiaJS
│       │
│       ├── config/
│       │   ├── app.config.ts                ← [Rafli] App settings
│       │   ├── cors.config.ts               ← [Rafli] CORS setup
│       │   └── jwt.config.ts                ← [Rafli] JWT secret & expiry
│       │
│       ├── lib/
│       │   ├── prisma.ts                    ← [Rafli] Prisma client singleton
│       │   ├── google-oauth.ts              ← [Rafli] Google OAuth setup
│       │   └── storage.ts                   ← [Marcel] Upload handler (file/url)
│       │
│       ├── middlewares/
│       │   ├── auth.middleware.ts           ← [Rafli] Cek JWT token
│       │   ├── rbac.middleware.ts           ← [Rafli] Cek role (guard)
│       │   └── error.middleware.ts          ← [Rafli] Global error handler
│       │
│       ├── modules/                         ← Feature-based structure
│       │   │
│       │   ├── auth/
│       │   │   ├── auth.routes.ts           ← [Rafli] /auth/google, /auth/callback, /auth/logout
│       │   │   ├── auth.controller.ts       ← [Rafli]
│       │   │   └── auth.service.ts          ← [Rafli]
│       │   │
│       │   ├── users/
│       │   │   ├── users.routes.ts          ← [Marcel] /users (super admin only)
│       │   │   ├── users.controller.ts      ← [Marcel]
│       │   │   └── users.service.ts         ← [Marcel]
│       │   │
│       │   ├── buku/
│       │   │   ├── buku.routes.ts           ← [Marcel] /buku CRUD
│       │   │   ├── buku.controller.ts       ← [Marcel]
│       │   │   └── buku.service.ts          ← [Marcel]
│       │   │
│       │   ├── kategori/
│       │   │   ├── kategori.routes.ts       ← [Marcel]
│       │   │   ├── kategori.controller.ts   ← [Marcel]
│       │   │   └── kategori.service.ts      ← [Marcel]
│       │   │
│       │   ├── peminjaman/
│       │   │   ├── peminjaman.routes.ts     ← [Marcel] /peminjaman
│       │   │   ├── peminjaman.controller.ts ← [Marcel]
│       │   │   └── peminjaman.service.ts    ← [Marcel]
│       │   │
│       │   ├── perpanjangan/
│       │   │   ├── perpanjangan.routes.ts   ← [Marcel]
│       │   │   ├── perpanjangan.controller.ts ← [Marcel]
│       │   │   └── perpanjangan.service.ts  ← [Marcel]
│       │   │
│       │   ├── denda/
│       │   │   ├── denda.routes.ts          ← [Marcel]
│       │   │   ├── denda.controller.ts      ← [Marcel]
│       │   │   └── denda.service.ts         ← [Marcel]
│       │   │
│       │   └── konfigurasi/
│       │       ├── konfigurasi.routes.ts    ← [Rafli] Super admin config
│       │       ├── konfigurasi.controller.ts ← [Rafli]
│       │       └── konfigurasi.service.ts   ← [Rafli]
│       │
│       └── utils/
│           ├── response.ts                  ← [Rafli] Standar format API response
│           ├── denda.helper.ts              ← [Marcel] Hitung denda otomatis
│           └── pagination.ts                ← [Marcel] Helper pagination
│
│
└── 🎨 frontend/                             ← [Timo lead + Tim Frontend]
    ├── package.json                         ← (sudah ada)
    ├── tsconfig.json
    ├── bun-env.d.ts
    ├── build.ts
    ├── bunfig.toml
    ├── .env                                 ← (gitignored)
    ├── .env.example
    │
    ├── styles/
    │   └── globals.css                      ← [Bila] Design tokens, Tailwind v4 (sudah ada)
    │
    └── src/
        ├── index.ts                         ← [Timo] Entry point
        ├── index.html                       ← [Timo] HTML template
        ├── frontend.tsx                     ← [Timo] React root render
        ├── App.tsx                          ← [Timo] Router utama
        │
        ├── assets/                          ← [Bila] Gambar, ikon, font
        │   ├── fonts/
        │   └── images/
        │
        ├── lib/                             ← Utilities & config FE
        │   ├── api.ts                       ← [Timo] Axios/fetch instance (base URL)
        │   ├── auth.ts                      ← [Naomy] Google OAuth handler FE
        │   ├── utils.ts                     ← [Nayla] cn(), format tanggal, dll
        │   └── query-client.ts              ← [Timo] React Query setup
        │
        ├── hooks/                           ← Custom hooks
        │   ├── useAuth.ts                   ← [Naomy] Hook auth & user state
        │   ├── useBuku.ts                   ← [Sheren] Hook fetch buku
        │   ├── usePeminjaman.ts             ← [Sheren] Hook peminjaman
        │   └── useDenda.ts                  ← [Tirani] Hook denda
        │
        ├── stores/                          ← Global state (Zustand / Context)
        │   ├── auth.store.ts                ← [Naomy] User session store
        │   └── ui.store.ts                  ← [Bila] Sidebar, modal state
        │
        ├── components/
        │   │
        │   ├── ui/                          ← [Nayla] Shadcn/base components
        │   │   ├── button.tsx               ← (sudah ada via shadcn)
        │   │   ├── label.tsx                ← (sudah ada)
        │   │   ├── card.tsx
        │   │   ├── badge.tsx
        │   │   ├── modal.tsx
        │   │   ├── input.tsx
        │   │   ├── select.tsx
        │   │   ├── table.tsx
        │   │   ├── skeleton.tsx
        │   │   └── toast.tsx
        │   │
        │   ├── layout/                      ← [Timo] Wrapper halaman
        │   │   ├── Navbar.tsx               ← [Timo/Bila] Navigasi utama
        │   │   ├── Sidebar.tsx              ← [Tirani] Sidebar Admin
        │   │   ├── Footer.tsx               ← [Bila]
        │   │   ├── GuestLayout.tsx          ← [Timo] Layout untuk guest
        │   │   ├── MemberLayout.tsx         ← [Timo] Layout untuk anggota
        │   │   └── AdminLayout.tsx          ← [Tirani] Layout untuk admin
        │   │
        │   ├── shared/                      ← [Nayla] Komponen reusable lintas fitur
        │   │   ├── StatusBadge.tsx          ← Badge status peminjaman
        │   │   ├── LoadingSpinner.tsx
        │   │   ├── EmptyState.tsx
        │   │   ├── Pagination.tsx
        │   │   └── SearchBar.tsx
        │   │
        │   ├── buku/                        ← [Sheren] Komponen terkait buku
        │   │   ├── BukuCard.tsx             ← Card buku di katalog
        │   │   ├── BukuGrid.tsx             ← Grid/list katalog
        │   │   ├── BukuDetail.tsx           ← Detail buku
        │   │   ├── BukuForm.tsx             ← [Tirani] Form tambah/edit (Admin)
        │   │   └── BukuFilter.tsx           ← Filter & search katalog
        │   │
        │   ├── peminjaman/                  ← [Sheren] Komponen peminjaman anggota
        │   │   ├── PeminjamanCard.tsx
        │   │   ├── PeminjamanList.tsx
        │   │   ├── StatusTimeline.tsx       ← Visual alur status
        │   │   └── PerpanjanganForm.tsx     ← Form ajukan perpanjangan (1/2/3 hari)
        │   │
        │   ├── admin/                       ← [Tirani] Komponen khusus Admin
        │   │   ├── ValidasiPeminjamanCard.tsx
        │   │   ├── ValidasiPerpanjanganCard.tsx
        │   │   ├── DendaTable.tsx
        │   │   └── StatCard.tsx             ← Card statistik dashboard
        │   │
        │   └── auth/                        ← [Naomy] Komponen auth
        │       ├── GoogleLoginButton.tsx
        │       ├── ProtectedRoute.tsx       ← HOC guard route
        │       └── RoleGate.tsx             ← Render kondisional by role
        │
        └── pages/                           ← Halaman lengkap
            │
            ├── public/                      ← [Timo + Bila] Bisa diakses guest
            │   ├── HomePage.tsx             ← Landing page
            │   ├── KatalogPage.tsx          ← Daftar buku
            │   └── BukuDetailPage.tsx       ← Detail buku
            │
            ├── auth/                        ← [Naomy]
            │   ├── LoginPage.tsx
            │   └── CallbackPage.tsx         ← Google OAuth callback handler
            │
            ├── anggota/                     ← [Sheren] Protected (role: anggota)
            │   ├── DashboardPage.tsx
            │   ├── PeminjamanPage.tsx
            │   ├── PeminjamanDetailPage.tsx
            │   └── ProfilPage.tsx
            │
            ├── admin/                       ← [Tirani] Protected (role: admin)
            │   ├── DashboardPage.tsx
            │   ├── BukuPage.tsx
            │   ├── AnggotaPage.tsx
            │   ├── PeminjamanPage.tsx
            │   ├── PeminjamanDetailPage.tsx
            │   └── DendaPage.tsx
            │
            └── superadmin/                  ← [Rafli/Timo] Protected (role: super_admin)
                ├── UsersPage.tsx
                ├── KonfigurasiPage.tsx
                └── AuditLogPage.tsx
```

---

## 📌 Catatan Penting

> [!IMPORTANT]
> Sebelum mulai coding, ada beberapa hal yang perlu disepakati tim:

### Git Flow

- Branch utama: `main` (production-ready)
- Branch develop: `dev` (integration)
- Branch fitur: `feat/<nama>/<deskripsi>` — contoh: `feat/sheren/buku-card`
- Branch fix: `fix/<nama>/<deskripsi>`
- **Wajib PR ke `develop`, tidak boleh push langsung ke `main`**

### Pembagian Task Awal (Prioritas)

**Backend (Marcel + Rafli) — Kerjakan duluan:**

1. `prisma/schema.prisma` — schema DB final
2. `middlewares/auth.middleware.ts` + `rbac.middleware.ts`
3. `modules/auth/` — Google OAuth flow
4. `modules/buku/` — CRUD buku (needed by FE)
5. `modules/peminjaman/` + `modules/denda/`

**Frontend — Bisa paralel setelah API buku ready:**

1. **Nayla**: Semua komponen `ui/` dulu (design system)
2. **Bila**: `globals.css` polish + layout dasar
3. **Timo**: Setup router + `GuestLayout`, `MemberLayout`, `AdminLayout`
4. **Naomy**: Google login flow
5. **Sheren**: Halaman katalog + peminjaman anggota
6. **Tirani**: Dashboard + halaman admin
