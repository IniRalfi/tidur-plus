// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { APITester } from "./APITester";
// import { Calendar, CalendarDayButton } from "./components/ui/calendar";

// import logo from "./logo.svg";
// import reactLogo from "./react.svg";

// export function App() {
//   return (
//     <div className="container mx-auto p-8 text-center relative z-10">
//       <div className="flex justify-center items-center gap-8 mb-8">
//         <img
//           src={logo}
//           alt="Bun Logo"
//           className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
//         />
//         <img
//           src={reactLogo}
//           alt="React Logo"
//           className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
//         />
//       </div>
//       <Card>
//         <CardHeader className="gap-4">
//           <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
//           <CardDescription>
//             Edit{" "}
//             <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">src/App.tsx</code>{" "}
//             and save to test HMR
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <APITester />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KatalogPage from './pages/public/KatalogPage';
import BukuDetailPage from './pages/public/BukuDetailPage';
import PeminjamanPage from './pages/anggota/PeminjamanPage';
import PeminjamanDetailPage from './pages/anggota/PeminjamanDetailPage';
import DashboardPage from './pages/anggota/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* URL utama (localhost:5173) akan buka Home */}
        <Route path="/" element={<DashboardPage />} />

        <Route path="/katalog" element={<KatalogPage />} />
        
        {/* URL dengan ID (localhost:5173/katalog/buku-1) akan buka Detail Buku */}
        <Route path="/katalog/:id" element={<BukuDetailPage />} />
        
        {/* URL untuk halaman peminjaman (localhost:5173/peminjaman) */}
        <Route path="/peminjaman" element={<PeminjamanPage />} />
        
        {/* URL untuk halaman detail peminjaman (localhost:5173/peminjaman/:id) */}
        <Route path="/peminjaman/:id" element={<PeminjamanDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
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
