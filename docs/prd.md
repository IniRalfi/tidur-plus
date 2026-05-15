# 📚 PRD — Sistem Manajemen Perpustakaan Digital (RBAC)

> Terinspirasi dari **BOBO+** | Versi: `v0.2` | Tanggal: 15 Mei 2026

---

## 1. Latar Belakang

Sistem ini dibangun untuk mendigitalkan proses manajemen perpustakaan konvensional. Pengunjung dapat menelusuri koleksi buku secara publik, sementara anggota terdaftar dapat meminjam, memesan, dan mengajukan perpanjangan. Pustakawan dan Super Admin mengelola seluruh operasional sistem melalui dashboard terpisah.

---

## 2. Tujuan Produk

- Mempermudah anggota dalam menemukan dan meminjam buku secara digital.
- Memberikan pustakawan alat yang efisien untuk memvalidasi dan mengelola transaksi peminjaman.
- Memastikan keamanan akses data melalui sistem RBAC yang ketat.

---

## 3. Stakeholder & Role

| Role                   | Deskripsi                                              |
| ---------------------- | ------------------------------------------------------ |
| **Guest**              | Pengunjung tidak terdaftar, hanya bisa melihat katalog |
| **Anggota**            | Masyarakat / anggota perpustakaan terdaftar            |
| **Admin / Pustakawan** | Pengelola buku dan transaksi peminjaman                |
| **Super Admin**        | Pengelola sistem, user, dan konfigurasi global         |

---

## 4. Fitur & Matriks Akses (RBAC)

### 4.1 Fitur Per Role

#### 👤 Guest (Tidak Login)

- Melihat katalog / daftar buku (judul, pengarang, ketersediaan)
- Melihat detail buku
- Mendaftar sebagai Anggota
- Login ke sistem

#### 📖 Anggota

> Semua akses Guest, ditambah:

- Memesan buku (booking sebelum dipinjam)
- Meminjam buku (setelah divalidasi Admin)
- Melihat riwayat peminjaman pribadi
- Mengajukan perpanjangan masa pinjam
- Melihat status peminjaman aktif
- Mengelola profil akun

#### 🧑‍💼 Admin / Pustakawan

> Tidak mewarisi akses Anggota secara default

- Dashboard ringkasan (statistik buku, peminjaman aktif, dll)
- **CRUD Buku**: Tambah, ubah, hapus, lihat detail buku
- **Kelola Kategori Buku**
- **Kelola Anggota**: Lihat daftar, detail profil anggota
- **Kelola Peminjaman**:
  - Lihat semua transaksi peminjaman
  - Update status: `Dipesan → Dipinjam → Dikembalikan`
  - Validasi pengajuan perpanjangan: `Acc` atau `Tolak`
- Manajemen stok / jumlah eksemplar buku

#### 🛡️ Super Admin

> Semua akses Admin, ditambah:

- **Kelola User & Role**: CRUD user, assign / ubah role
- **Konfigurasi Sistem**: Atur aturan bisnis (durasi pinjam, maks perpanjangan, dll)
- **Audit Log**: Lihat seluruh aktivitas sistem
- **Kelola Admin**: Buat, nonaktifkan akun Admin/Pustakawan

---

## 5. Business Rules

### BR-01: Pinjam Buku

- **Durasi pinjam default: 14 hari** sejak tanggal validasi Admin.
- **Maksimal 2 buku** yang boleh dipinjam secara bersamaan per anggota.
- Jika anggota sudah meminjam 2 buku aktif, fitur "Pesan Buku" akan dinonaktifkan sampai salah satu dikembalikan.
- Anggota **wajib login** untuk memesan atau meminjam buku.
- Status peminjaman harus divalidasi oleh **Admin** sebelum buku dianggap "dipinjam".
- Satu anggota hanya bisa meminjam buku yang sama sekali (tidak bisa duplikat aktif).

### BR-05: Denda Keterlambatan

- Denda dikenakan jika buku **belum dikembalikan melewati `tgl_kembali_rencana`**.
- **Tarif denda**: Ditentukan oleh Super Admin via halaman Konfigurasi (default: Rp 1.000/hari).
- Denda dihitung otomatis: `(tgl_kembali_aktual - tgl_kembali_rencana) × tarif_per_hari`.
- Jika ada perpanjangan yang disetujui, `tgl_kembali_rencana` ter-update sehingga denda dihitung dari tanggal baru.
- **Status denda**: `belum_lunas` | `lunas` — Admin yang menandai lunas secara manual (asumsi pembayaran cash di lokasi).
- Anggota yang masih punya denda **belum_lunas** tidak bisa melakukan pesanan baru.

### BR-02: Perpanjangan Masa Pinjam

- Anggota dapat mengajukan perpanjangan masa pinjam.
- **Maksimal perpanjangan: 2 kali** per transaksi peminjaman.
- Durasi perpanjangan: **1, 2, atau 3 hari** (dipilih oleh anggota via input).
- Pengajuan perpanjangan harus mendapat **validasi dari Admin** (Acc / Tolak).
- Perpanjangan **tidak bisa diajukan** jika sudah mencapai batas 2 kali.

### BR-06: Registrasi & Autentikasi

- Registrasi dan Login menggunakan **Google OAuth** — tidak ada form email/password manual.
- Setelah login pertama via Google, akun **langsung aktif** sebagai Anggota tanpa verifikasi email tambahan.
- Admin dan Super Admin tetap dibuat manual oleh Super Admin (bukan via OAuth publik).

### BR-03: Status Peminjaman

Alur status transaksi peminjaman:

```
[Dipesan] → [Diproses Admin] → [Dipinjam] ──────────────────────────► [Dikembalikan]
                                    │              ↑                        │
                                    │   [Perpanjangan Disetujui]            │
                                    │   (maks 2x, +1/2/3 hari)             │
                                    │                                       ▼
                                    └──────────────────────────► [Cek Denda]
                                                                  (jika terlambat)
```

### BR-04: Registrasi

- Registrasi terbuka untuk publik (Guest).
- Role default setelah registrasi adalah **Anggota**.
- Admin dan Super Admin hanya bisa dibuat oleh **Super Admin**.

---

## 6. Alur Utama (User Flows)

### Flow 1: Anggota Meminjam Buku

```
1. Anggota buka halaman katalog
2. Pilih buku yang tersedia
3. Klik "Pesan Buku" → Sistem buat transaksi status: Dipesan
4. Admin melihat daftar pesanan
5. Admin klik "Validasi" → Update status: Dipinjam
6. Anggota bisa lihat status di "Peminjaman Saya"
```

### Flow 2: Anggota Ajukan Perpanjangan

```
1. Anggota buka "Peminjaman Saya"
2. Pilih pinjaman aktif → Klik "Ajukan Perpanjangan"
3. Input durasi (1 / 2 / 3 hari) → Submit
4. Status perpanjangan: Menunggu Validasi
5. Admin melihat notifikasi pengajuan
6. Admin Acc → Tanggal kembali ter-update | Admin Tolak → Ditolak
7. Sistem catat counter perpanjangan (+1), maks 2x
```

### Flow 3: Admin Kelola Buku

```
1. Admin login → Masuk Dashboard
2. Navigasi ke "Manajemen Buku"
3. CRUD: Tambah buku baru / Edit info / Hapus / Lihat detail
4. Update stok / jumlah eksemplar
```

---

## 7. Halaman / Screens

### Public / Guest

| Halaman        | Keterangan                           |
| -------------- | ------------------------------------ |
| `/`            | Landing page                         |
| `/katalog`     | Daftar buku (bisa difilter & search) |
| `/katalog/:id` | Detail buku                          |
| `/login`       | Form login                           |
| `/register`    | Form registrasi anggota              |

### Anggota (Protected)

| Halaman           | Keterangan                                  |
| ----------------- | ------------------------------------------- |
| `/dashboard`      | Ringkasan aktivitas anggota                 |
| `/peminjaman`     | Daftar peminjaman aktif & riwayat           |
| `/peminjaman/:id` | Detail transaksi + form ajukan perpanjangan |
| `/profil`         | Kelola profil akun                          |

### Admin / Pustakawan (Protected)

| Halaman                 | Keterangan                      |
| ----------------------- | ------------------------------- |
| `/admin/dashboard`      | Statistik sistem                |
| `/admin/buku`           | CRUD buku                       |
| `/admin/anggota`        | Daftar anggota                  |
| `/admin/peminjaman`     | Kelola semua transaksi          |
| `/admin/peminjaman/:id` | Detail + tombol validasi status |

| `/admin/denda` | Kelola denda & tandai lunas |

### Super Admin (Protected)

| Halaman                   | Keterangan             |
| ------------------------- | ---------------------- |
| `/superadmin/users`       | CRUD semua user & role |
| `/superadmin/konfigurasi` | Aturan bisnis sistem   |
| `/superadmin/audit-log`   | Log aktivitas sistem   |

---

## 8. Data Model (Ringkasan)

```
User
  id, name, email, google_id, avatar_url,
  role (ENUM: anggota|admin|super_admin),
  created_at

Buku
  id, judul, pengarang, penerbit, tahun, isbn,
  kategori_id, stok, cover_url, cover_source (ENUM: upload|url),
  deskripsi, created_at

Kategori
  id, nama

Peminjaman
  id, user_id, buku_id,
  status (ENUM: dipesan|dipinjam|dikembalikan|ditolak),
  tgl_pinjam, tgl_kembali_rencana, tgl_kembali_aktual,
  counter_perpanjangan (default: 0, max: 2)

Perpanjangan
  id, peminjaman_id, durasi_hari (1|2|3),
  status (ENUM: menunggu|disetujui|ditolak),
  tgl_pengajuan, tgl_diproses, admin_id

Denda
  id, peminjaman_id, user_id,
  jumlah_hari_telat, tarif_per_hari, total_denda,
  status (ENUM: belum_lunas|lunas),
  tgl_lunas, admin_id

Konfigurasi
  id, key (UNIQUE), value, updated_by, updated_at
  -- Contoh key: 'tarif_denda_per_hari', 'durasi_pinjam_default', 'maks_buku_per_anggota'
```

---

## 9. Tech Stack (Monorepo)

| Layer        | Tech                                            |
| ------------ | ----------------------------------------------- |
| **Frontend** | React + Vite + Tailwind v4                      |
| **Backend**  | ElysiaJS / Express + TypeScript                 |
| **Database** | PostgreSQL + Prisma ORM                         |
| **Auth**     | Google OAuth 2.0 + JWT (Access + Refresh Token) |
| **Monorepo** | Bun Workspaces                                  |
| **Shared**   | `shared/` package untuk types & constants       |

---

## 10. Out of Scope (v1)

- Notifikasi email / SMS (reminder jatuh tempo)
- Pembayaran denda online / payment gateway (denda dicatat manual)
- Fitur ulasan / rating buku
- Export laporan PDF
- Registrasi manual via email/password

> Fitur-fitur di atas bisa dipertimbangkan untuk **v2**.

---

## 11. Keputusan Desain (Resolved)

> [!NOTE]
> Semua pertanyaan awal sudah dijawab dan diimplementasikan ke PRD.

| #   | Pertanyaan            | Keputusan                                                  |
| --- | --------------------- | ---------------------------------------------------------- |
| 1   | Durasi pinjam default | **14 hari** sejak validasi Admin                           |
| 2   | Maks buku per anggota | **2 buku** aktif bersamaan                                 |
| 3   | Cover buku            | **Upload file** atau **URL eksternal** (keduanya didukung) |
| 4   | Sistem denda          | **Ada** — tarif konfigurabel, pencatatan manual oleh Admin |
| 5   | Verifikasi email      | **Tidak perlu** — gunakan **Google OAuth**, langsung aktif |

---

## 12. Next Steps

- [ ] Review & sign-off PRD ini
- [ ] Setup monorepo: `frontend/`, `backend/`, `shared/`
- [ ] Desain skema database final (Prisma schema)
- [ ] Setup Google OAuth credentials
- [ ] Implementasi autentikasi & middleware RBAC
- [ ] Implementasi modul Buku & Katalog
- [ ] Implementasi modul Peminjaman & Perpanjangan
- [ ] Implementasi modul Denda
- [ ] Dashboard Admin & Super Admin
