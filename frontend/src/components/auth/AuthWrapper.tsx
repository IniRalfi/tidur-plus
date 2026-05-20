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
      } catch {
        // Token invalid/expired — bersihkan localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
      }
    };

    initAuth();
  }, [setUser]);

  return <>{children}</>;
}
