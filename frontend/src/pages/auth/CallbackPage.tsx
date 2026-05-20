import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("accessToken");
      const refreshToken = urlParams.get("refreshToken");

      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        try {
          // Import axios atau panggil service getMe
          // karena kita butuh authService dari context/store
          // atau bisa pakai dari lib
          const { authService } = await import("../../lib/auth.service");
          const { useAuthStore } = await import("../../stores/authStore");
          
          const user = await authService.getMe();
          useAuthStore.getState().setUser(user);
          
          if (user.roles.includes("SUPER_ADMIN" as any)) navigate("/superadmin", { replace: true });
          else if (user.roles.includes("ADMIN" as any)) navigate("/admin/dashboard", { replace: true });
          else navigate("/dashboard", { replace: true });
        } catch (error) {
          console.error("Gagal verifikasi token:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    processOAuth();
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