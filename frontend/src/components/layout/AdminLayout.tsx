import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Fungsi penanda menu sidebar aktif (menggunakan abu-abu terang yang elegan)
  const isActive = (path: string) => location.pathname === path;

  return (
    // Mengubah background utama sistem menjadi putih abu-abu terang (#f8fafc)
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* ─── SIDEBAR (KIRI) ─── */}
      {/* Warna putih bersih dengan border pemisah abu-abu tipis */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-5 shrink-0 shadow-xs">
        <div className="space-y-6">
          
          {/* Logo Aplikasi */}
          <div className="flex items-center gap-3 px-1 py-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-sm">
              📚
            </div>
            <div>
              <h2 className="font-bold text-slate-900 tracking-wide text-sm leading-none">Perpustakaan</h2>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">Panel Admin</p>
            </div>
          </div>

          {/* Navigasi Menu internal */}
          <nav className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Utama</p>
            
            <Link 
              to="/admin/dashboard" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive("/admin/dashboard") 
                  ? "bg-slate-100 text-slate-900 font-semibold shadow-2xs" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              📊 Dashboard
            </Link>

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mt-5 mb-2">Manajemen</p>
            
            <Link 
              to="/admin/buku" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive("/admin/buku") 
                  ? "bg-slate-100 text-slate-900 font-semibold shadow-2xs" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              📖 Kelola Buku
            </Link>

            <Link 
              to="/admin/anggota" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive("/admin/anggota") 
                  ? "bg-slate-100 text-slate-900 font-semibold shadow-2xs" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              👥 Anggota
            </Link>

            <Link 
              to="/admin/peminjaman" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive("/admin/peminjaman") 
                  ? "bg-slate-100 text-slate-900 font-semibold shadow-2xs" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              📄 Peminjaman
            </Link>

            <Link 
              to="/admin/denda" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive("/admin/denda") 
                  ? "bg-slate-100 text-slate-900 font-semibold shadow-2xs" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              💳 Denda
            </Link>
          </nav>
        </div>

        {/* Tombol Keluar di Bagian Bawah */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-xs font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
        >
          🚪 Keluar
        </button>
      </aside>

      {/* ─── AREA KONTEN (KANAN) ─── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        
        {/* Header Atas Berwarna Putih */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-2xs">
          {/* Judul dinamis yang berubah otomatis mengikuti URL menu */}
          <h1 className="text-sm font-bold text-slate-800 capitalize tracking-wide">
            {location.pathname.split("/").pop()?.replace("-", " ")}
          </h1>
          
          {/* Identitas Akun Pustakawan */}
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 text-slate-400 bg-slate-50 border border-slate-200 flex items-center justify-center rounded-full text-xs cursor-pointer hover:bg-slate-100">
              🔔
            </span>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shadow-xs">
                AD
              </div>
              <span className="text-xs font-semibold text-slate-700">Admin Nadya</span>
            </div>
          </div>
        </header>

        {/* Pembungkus halaman anak (DashboardPage, BukuPage, DendaPage, dll) */}
        {/* Latar belakang di sini sengaja dibikin sedikit abu-abu lembut agar kotak card putih di dalamnya nanti kelihatan pop-out */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>

    </div>
  );
}