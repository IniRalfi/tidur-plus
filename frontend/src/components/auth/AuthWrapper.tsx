import React, { useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../lib/auth.service';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');

      // Tidak ada token — langsung set loading false, user = null
      if (!token) {
        setUser(null);
        return;
      }

      // Ada token — coba verifikasi ke server
      try {
        const user = await authService.getMe();
        setUser(user);
      } catch (error: any) {
        // Jangan hapus token jika errornya adalah Network Error atau server down (5xx)
        // Biarkan interceptor (api.ts) yang membersihkan token jika refresh token gagal / 401
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setUser(null);
        } else {
          // Jika error lain (misal server down), kita biarkan user=null dulu, tapi jangan hapus token.
          // Atau set user(null) agar redirect ke login
          setUser(null);
        }
      }
    };

    initAuth();
  }, [setUser]);

  return <>{children}</>;
}
