import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Superadmin Pages
import UsersPage from "./pages/superadmin/UsersPage";
import KonfigurasiPage from "./pages/superadmin/KonfigurasiPage";
import AuditLogPage from "./pages/superadmin/AuditLogPage";

// Auth & Profil
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilPage from "./pages/anggota/ProfilPage";
import CallbackPage from "./pages/auth/CallbackPage";

// Layout
import AdminLayout from "./components/layout/AdminLayout";

// Admin Pages
import DashboardPage from "./pages/admin/DashboardPage";
import BukuPage from "./pages/admin/BukuPage";
import AnggotaPage from "./pages/admin/AnggotaPage";
import PeminjamanPage from "./pages/admin/PeminjamanPage";
import PeminjamanDetailPage from "./pages/admin/PeminjamanDetailPage";
import DendaPage from "./pages/admin/DendaPage";

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
      <Routes>
        {/* Redirect halaman utama ke login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Routing Umum / Autentikasi & Profil */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/auth/google/callback" element={<CallbackPage />} />

        {/* 🔐 Routing Kelompok Admin menggunakan Pembungkus AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/buku" element={<BukuPage />} />
          <Route path="/admin/anggota" element={<AnggotaPage />} />
          <Route path="/admin/peminjaman" element={<PeminjamanPage />} />
          <Route path="/admin/peminjaman/:id" element={<PeminjamanDetailPage />} />
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
