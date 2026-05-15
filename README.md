# 📚 Perpustakaan Digital — RBAC System

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/ElysiaJS-latest-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Bun-Workspaces-black?style=for-the-badge&logo=bun&logoColor=white" />
</p>

<p align="center">
  Sistem manajemen perpustakaan digital berbasis <strong>Role-Based Access Control (RBAC)</strong>.<br/>
  Dibangun sebagai monorepo dengan stack modern — terinspirasi dari <strong>BOBO+</strong>.
</p>

---

## ✨ Fitur Utama

- 🔍 **Katalog Buku** — Bisa dilihat siapa saja tanpa login
- 📖 **Sistem Peminjaman** — Pesan, pinjam, dan kembalikan buku
- 🔄 **Perpanjangan** — Ajukan perpanjangan hingga 2 kali (maks 3 hari)
- 💸 **Sistem Denda** — Otomatis dihitung jika terlambat
- 🛡️ **RBAC 3 Level** — Anggota, Admin/Pustakawan, Super Admin
- 🔐 **Google OAuth** — Login cukup dengan akun Google, langsung aktif

---

## 🛠️ Tech Stack

| Layer        | Teknologi                                    |
| ------------ | -------------------------------------------- |
| **Frontend** | React 19, Vite 6, Tailwind CSS v4, shadcn/ui |
| **Backend**  | ElysiaJS, TypeScript, Bun                    |
| **Database** | PostgreSQL 16, Prisma ORM v6                 |
| **Auth**     | Google OAuth 2.0 + JWT (Access + Refresh)    |
| **Monorepo** | Bun Workspaces                               |
| **Shared**   | `@tidur-plus/shared` — types & constants     |

---

## 📋 Prerequisites

Pastikan tools berikut sudah terinstall di mesin kamu:

- **[Bun](https://bun.sh)** `>= 1.1.0` — Package manager & runtime
- **[Docker](https://www.docker.com)** — Untuk menjalankan PostgreSQL secara lokal
- **[Git](https://git-scm.com)** — Version control

---

## 🚀 Setup Lokal

### 1. Clone Repository

```bash
git clone https://github.com/IniRalfi/tidur-plus.git
cd tidur-plus
```

### 2. Install Semua Dependencies

```bash
bun install
```

> Satu perintah ini menginstall semua dependencies untuk `frontend/`, `backend/`, dan `shared/` sekaligus.

### 3. Setup Environment Variables

```bash
cp .env.example .env
```

Buka `.env` dan isi nilai berikut:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/tidur_plus_db"
JWT_SECRET=isi_dengan_random_string_panjang
JWT_REFRESH_SECRET=isi_dengan_random_string_panjang_lain
GOOGLE_CLIENT_ID=dari_google_cloud_console
GOOGLE_CLIENT_SECRET=dari_google_cloud_console
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
FRONTEND_URL=http://localhost:5173
PORT=3000
```

> Untuk mendapatkan `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET`, buat project di [Google Cloud Console](https://console.cloud.google.com) dan aktifkan Google OAuth 2.0.

### 4. Jalankan Database (Docker)

```bash
docker compose up -d
```

Ini akan menjalankan PostgreSQL 16 di port `5432`. Cek statusnya:

```bash
docker compose ps
```

### 5. Jalankan Migrasi & Seed Database

```bash
cd backend
bun db:migrate   # Jalankan migrasi Prisma
bun db:seed      # Isi data awal (Super Admin)
```

### 6. Jalankan Aplikasi

**Frontend** (di terminal pertama):

```bash
bun dev:fe
# atau: cd frontend && bun dev
# Jalan di http://localhost:5173
```

**Backend** (di terminal kedua):

```bash
bun dev:be
# atau: cd backend && bun dev
# Jalan di http://localhost:3000
```

---

## 📁 Struktur Monorepo

```
tidur-plus/
├── frontend/        # React + Vite + Tailwind v4
├── backend/         # ElysiaJS + Prisma + PostgreSQL
├── shared/          # @tidur-plus/shared (types & constants)
└── docs/            # Dokumentasi lengkap
```

> Untuk struktur folder detail, lihat [`docs/structure.md`](./docs/structure.md).

---

## 📖 Dokumentasi

| Dokumen                                      | Deskripsi                                |
| -------------------------------------------- | ---------------------------------------- |
| [`docs/prd.md`](./docs/prd.md)               | Product Requirements Document            |
| [`docs/structure.md`](./docs/structure.md)   | Struktur folder & pembagian tim          |
| [`docs/ai-context.md`](./docs/ai-context.md) | Konteks proyek untuk AI assistant        |
| `docs/api.md`                                | Dokumentasi API endpoint _(coming soon)_ |
| `docs/database.md`                           | ERD & catatan schema _(coming soon)_     |

---

## 👥 Tim

| Nama       | Role             | Area                            |
| ---------- | ---------------- | ------------------------------- |
| **Timo**   | Frontend Lead    | Layout, routing, landing page   |
| **Bila**   | Frontend         | Design system, styling, animasi |
| **Naomy**  | Frontend         | Tampilan auth & profil          |
| **Sheren** | Frontend         | Tampilan anggota & katalog      |
| **Nadya**  | Frontend         | Tampilan panel admin            |
| **Nayla**  | Frontend         | Tampilan panel super admin      |
| **Marcel** | Backend          | API, controllers, Prisma schema |
| **Rafli**  | Backend + DevOps | Auth, RBAC, CI/CD, monorepo     |

---

## 🌿 Git Flow

```
main          ← Production only, jangan push langsung
 └── dev      ← Integration branch, semua PR ke sini
      ├── feat/namamu/deskripsi   ← Fitur baru
      └── fix/namamu/deskripsi    ← Bug fix
```

**Aturan wajib:**

- ✅ Buat branch dari `dev`
- ✅ Nama branch: `feat/sheren/katalog-page` atau `fix/rafli/cors-error`
- ✅ Pull Request ke `dev`
- ❌ Dilarang push langsung ke `main`

---

## 🐛 Masalah Umum

**`bun install` error "Workspace not found"**
→ Pastikan semua `package.json` di `frontend/`, `backend/`, dan `shared/` sudah punya field `"name"`.

**Database connection refused**
→ Pastikan Docker sudah jalan: `docker compose up -d`

**Google OAuth error**
→ Pastikan `GOOGLE_CALLBACK_URL` di Google Console sudah ditambahkan sebagai Authorized redirect URI.

---

<p align="center">
  Made with ☕ by Tim Tidur Plus
</p>
