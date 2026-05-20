import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export default function AnggotaLayout() {
  const location = useLocation();
  const { user } = useAuthStore();
  
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfcfb] font-sans antialiased text-[#5e432f]">
      
      {/* ─── NAVBAR ATAS ─── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#d27d3f]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo & Judul */}
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#eb6935] to-[#d33a27] text-white flex items-center justify-center text-lg shadow-md group-hover:scale-105 transition-transform">
                  📚
                </div>
                <div>
                  <h1 className="font-inter-bold text-lg leading-tight tracking-tight text-[#5e432f] group-hover:text-[#d33a27] transition-colors">
                    Tidur Plus
                  </h1>
                  <p className="text-[10px] text-[#a18e62] uppercase tracking-widest font-bold -mt-0.5">
                    Anggota
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-inter-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-[#eb6935]/10 text-[#d33a27]"
                    : "text-[#814524] hover:bg-[#d27d3f]/10"
                }`}
              >
                Beranda
              </Link>
              <Link
                to="/katalog"
                className={`px-4 py-2 rounded-lg text-sm font-inter-medium transition-colors ${
                  isActive("/katalog")
                    ? "bg-[#eb6935]/10 text-[#d33a27]"
                    : "text-[#814524] hover:bg-[#d27d3f]/10"
                }`}
              >
                Katalog
              </Link>
              <Link
                to="/peminjaman"
                className={`px-4 py-2 rounded-lg text-sm font-inter-medium transition-colors ${
                  isActive("/peminjaman")
                    ? "bg-[#eb6935]/10 text-[#d33a27]"
                    : "text-[#814524] hover:bg-[#d27d3f]/10"
                }`}
              >
                Pinjaman Saya
              </Link>
            </nav>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <Link
                to="/profil"
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#d27d3f]/10 transition-colors cursor-pointer group border border-transparent hover:border-[#d27d3f]/20"
              >
                <div className="hidden sm:block text-right mr-1">
                  <p className="text-xs font-inter-bold text-[#5e432f] group-hover:text-[#d33a27] transition-colors">
                    {user?.nama || "Anggota"}
                  </p>
                </div>
                <img
                  src={user?.foto || "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Rafli"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-[#eb6935]/30 object-cover"
                />
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* ─── BOTTOM NAVIGATION (MOBILE ONLY) ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#d27d3f]/20 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center h-16 px-2">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive("/dashboard") ? "text-[#d33a27]" : "text-[#a18e62]"
            }`}
          >
            <svg className="w-5 h-5" fill={isActive("/dashboard") ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/dashboard") ? 1.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-inter-medium">Beranda</span>
          </Link>
          
          <Link
            to="/katalog"
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive("/katalog") ? "text-[#d33a27]" : "text-[#a18e62]"
            }`}
          >
            <svg className="w-5 h-5" fill={isActive("/katalog") ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/katalog") ? 1.5 : 2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-[10px] font-inter-medium">Katalog</span>
          </Link>

          <Link
            to="/peminjaman"
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive("/peminjaman") ? "text-[#d33a27]" : "text-[#a18e62]"
            }`}
          >
            <svg className="w-5 h-5" fill={isActive("/peminjaman") ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/peminjaman") ? 1.5 : 2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span className="text-[10px] font-inter-medium">Pinjaman</span>
          </Link>

          <Link
            to="/profil"
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive("/profil") ? "text-[#d33a27]" : "text-[#a18e62]"
            }`}
          >
            <svg className="w-5 h-5" fill={isActive("/profil") ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/profil") ? 1.5 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[10px] font-inter-medium">Profil</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
