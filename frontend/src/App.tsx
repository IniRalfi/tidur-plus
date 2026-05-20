import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { FadeIn } from "./components/animations/FadeIn";
import { StaggerList } from "./components/animations/StaggerList";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-10 font-sans">
      <FadeIn direction="down">
        <h1 className="mb-2 text-3xl font-bold text-primary">UI Component Showcase</h1>
        <p className="mb-8 text-gray-500">Design System by Bila ✨</p>
      </FadeIn>

      <div className="w-full max-w-2xl">
        <StaggerList delay={0.2}>
          {/* Card 1: Form Login UI */}
          <Card className="mb-4 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Test Input & Button</h2>
            <div className="flex flex-col gap-4">
              <Input placeholder="Ketik nama kamu di sini..." />
              <div className="flex gap-2">
                <Button variant="default">Simpan</Button>
                <Button variant="outline">Batal</Button>
                <Button variant="destructive">Hapus</Button>
              </div>
            </div>
          </Card>

          {/* Card 2: Dummy Katalog Buku */}
          <Card className="p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Test Katalog Buku</h2>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Buku Panduan React 19</p>
                <p className="text-sm text-gray-500">Tersedia</p>
              </div>
              <Button size="sm">Pinjam</Button>
            </div>
          </Card>
        </StaggerList>
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import KatalogPage from "./pages/public/KatalogPage";
import BukuDetailPage from "./pages/public/BukuDetailPage";

// Anggota Pages
import ProfilPage from "./pages/anggota/ProfilPage";
import AnggotaDashboardPage from "./pages/anggota/DashboardPage";
import AnggotaPeminjamanPage from "./pages/anggota/PeminjamanPage";
import AnggotaPeminjamanDetailPage from "./pages/anggota/PeminjamanDetailPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/DashboardPage";
import BukuPage from "./pages/admin/BukuPage";
import AnggotaPage from "./pages/admin/AnggotaPage";
import AdminPeminjamanPage from "./pages/admin/PeminjamanPage";
import AdminPeminjamanDetailPage from "./pages/admin/PeminjamanDetailPage";
import DendaPage from "./pages/admin/DendaPage";

// Superadmin Pages
import UsersPage from "./pages/superadmin/UsersPage";
import KonfigurasiPage from "./pages/superadmin/KonfigurasiPage";
import AuditLogPage from "./pages/superadmin/AuditLogPage";

// Auth & Callback
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CallbackPage from "./pages/auth/CallbackPage";

// Layouts
import AdminLayout from "./components/layout/AdminLayout";

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="min-h-screen bg-[#fdfcfb] flex items-center justify-center font-primary">
      <div className="text-center space-y-2">
        <p className="text-2xl font-inter-bold text-[#5e432f]">{name}</p>
        <p className="text-sm text-[#a18e62]">Halaman ini sedang dikerjakan oleh anggota tim.</p>
      </div>
    </div>
  );
}

export default App;
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routing Umum / Autentikasi & Profil */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/auth/google/callback" element={<CallbackPage />} />

        {/* URL utama akan buka Dashboard Anggota (sebagai Home) */}
        <Route path="/" element={<AnggotaDashboardPage />} />
        
        {/* Public Routes */}
        <Route path="/katalog" element={<KatalogPage />} />
        <Route path="/katalog/:id" element={<BukuDetailPage />} />
        
        {/* Anggota Routes */}
        <Route path="/peminjaman" element={<AnggotaPeminjamanPage />} />
        <Route path="/peminjaman/:id" element={<AnggotaPeminjamanDetailPage />} />

        {/* 🔐 Routing Kelompok Admin menggunakan Pembungkus AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/buku" element={<BukuPage />} />
          <Route path="/admin/anggota" element={<AnggotaPage />} />
          <Route path="/admin/peminjaman" element={<AdminPeminjamanPage />} />
          <Route path="/admin/peminjaman/:id" element={<AdminPeminjamanDetailPage />} />
          <Route path="/admin/denda" element={<DendaPage />} />
        </Route>

        {/* 🔐 Routing Kelompok Superadmin */}
        <Route path="/superadmin" element={<Navigate to="/superadmin/users" replace />} />
        <Route path="/superadmin/users" element={<UsersPage />} />
        <Route path="/superadmin/konfigurasi" element={<KonfigurasiPage />} />
        <Route path="/superadmin/audit-log" element={<AuditLogPage />} />

        {/* Fallback jika rute tidak ditemukan */}
        <Route path="*" element={<ComingSoon name="404 — Halaman tidak ditemukan" />} />
      </Routes>
    </BrowserRouter>
  );
}

