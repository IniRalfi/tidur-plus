// frontend/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilPage from "./pages/anggota/ProfilPage"; 
import CallbackPage from "./pages/auth/CallbackPage";

import AdminLayout from "./components/layout/AdminLayout";


import DashboardPage from "./pages/admin/DashboardPage";
import BukuPage from "./pages/admin/BukuPage";
import AnggotaPage from "./pages/admin/AnggotaPage";
import PeminjamanPage from "./pages/admin/PeminjamanPage";
import PeminjamanDetailPage from "./pages/admin/PeminjamanDetailPage";
import DendaPage from "./pages/admin/DendaPage";

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

        {/* Fallback jika rute tidak ditemukan */}
        <Route path="*" element={<div className="p-6 text-center text-sm font-medium text-neutral-500">Halaman tidak ditemukan (404)</div>} />
      </Routes>
    </BrowserRouter>
  );
}