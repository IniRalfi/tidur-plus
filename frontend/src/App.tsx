import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UsersPage from "./pages/superadmin/UsersPage";
import KonfigurasiPage from "./pages/superadmin/KonfigurasiPage";
import AuditLogPage from "./pages/superadmin/AuditLogPage";

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

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/superadmin" element={<Navigate to="/superadmin/users" replace />} />
        <Route path="/superadmin/users" element={<UsersPage />} />
        <Route path="/superadmin/konfigurasi" element={<KonfigurasiPage />} />
        <Route path="/superadmin/audit-log" element={<AuditLogPage />} />

        {/* ── 404 ── */}
        <Route path="*" element={<ComingSoon name="404 — Halaman tidak ditemukan" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;