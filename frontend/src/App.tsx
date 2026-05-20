import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import { Role } from "@tidur-plus/shared";

// Landing Page
import LandingPage from "./components/landing/LandingPage";

// Public Pages
import KatalogPage from "./pages/public/KatalogPage";
import BukuDetailPage from "./pages/public/BukuDetailPage";

// Anggota Pages
import AnggotaDashboardPage from "./pages/anggota/DashboardPage";
import AnggotaPeminjamanPage from "./pages/anggota/PeminjamanPage";
import AnggotaPeminjamanDetailPage from "./pages/anggota/PeminjamanDetailPage";
import ProfilPage from "./pages/anggota/ProfilPage";

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
import AuthWrapper from "./components/auth/AuthWrapper";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Halaman "/" — cerdas: kalau sudah login redirect ke dashboard, kalau belum tampil landing
function HomePage() {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#fdfcfb]">
        <div className="text-[#8b7355] animate-pulse text-sm">Memuat...</div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    if (user.roles.includes(Role.SUPER_ADMIN)) return <Navigate to="/superadmin" replace />;
    if (user.roles.includes(Role.ADMIN)) return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
}

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

export default function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          {/* "/" — tampilkan landing jika belum login, redirect jika sudah */}
          <Route path="/" element={<HomePage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/google/callback" element={<CallbackPage />} />

          {/* Public Routes */}
          <Route path="/katalog" element={<KatalogPage />} />
          <Route path="/katalog/:id" element={<BukuDetailPage />} />

          {/* 🔐 Routing Kelompok Anggota (Default) */}
          <Route element={<ProtectedRoute allowedRoles={[Role.ANGGOTA, Role.ADMIN, Role.SUPER_ADMIN]} />}>
            <Route path="/dashboard" element={<AnggotaDashboardPage />} />
            <Route path="/peminjaman" element={<AnggotaPeminjamanPage />} />
            <Route path="/peminjaman/:id" element={<AnggotaPeminjamanDetailPage />} />
            <Route path="/profil" element={<ProfilPage />} />
          </Route>

          {/* 🔐 Routing Kelompok Admin menggunakan Pembungkus AdminLayout */}
          <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN, Role.SUPER_ADMIN]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/buku" element={<BukuPage />} />
              <Route path="/admin/anggota" element={<AnggotaPage />} />
              <Route path="/admin/peminjaman" element={<AdminPeminjamanPage />} />
              <Route path="/admin/peminjaman/:id" element={<AdminPeminjamanDetailPage />} />
              <Route path="/admin/denda" element={<DendaPage />} />
            </Route>
          </Route>

          {/* 🔐 Routing Kelompok Superadmin */}
          <Route element={<ProtectedRoute allowedRoles={[Role.SUPER_ADMIN]} />}>
            <Route path="/superadmin" element={<Navigate to="/superadmin/users" replace />} />
            <Route path="/superadmin/users" element={<UsersPage />} />
            <Route path="/superadmin/konfigurasi" element={<KonfigurasiPage />} />
            <Route path="/superadmin/audit-log" element={<AuditLogPage />} />
          </Route>

          {/* Fallback jika rute tidak ditemukan */}
          <Route path="*" element={<ComingSoon name="404 — Halaman tidak ditemukan" />} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}
