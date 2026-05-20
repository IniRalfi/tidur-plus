import React, { useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../lib/auth.service';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const user = await authService.getMe();
        setUser(user);
      } catch (error) {
        console.error("Gagal verifikasi token:", error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
