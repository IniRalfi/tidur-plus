import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const mockUser = {
      name: "Upin",
      email: "upin@student.untan.ac.id",
      avatarUrl: "https://i.pinimg.com/1200x/b1/28/06/b128063075048888e07d7eba24d9de5c.jpg", 
      role: "ANGGOTA",
      idAnggota: "LIB-2026-UPIN-001",
      dendaAktif: "Rp 0",
      bukuDipinjam: 2
    };

    localStorage.setItem("user_session", JSON.stringify(mockUser));

    const timer = setTimeout(() => {
      navigate("/profil");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 font-sans text-center" style={{ backgroundColor: '#fdfcfb' }}>
      <div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-sm border space-y-6" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: 'var(--color-sun-glow)', borderTopColor: 'transparent' }}></div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-clay-coffee)' }}>Menyinkronkan Akun</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mohon tunggu sebentar, kami sedang memproses kredensial Google OAuth aman Anda.
          </p>
        </div>
      </div>
    </div>
  );
}