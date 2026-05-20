import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Role } from '@tidur-plus/shared';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#fdfcfb]">
        <div className="text-[#8b7355] animate-pulse">Memuat...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Redirect ke login, bawa history agar bisa balik ke halaman yang dituju
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika route butuh role khusus, cek apakah user punya minimal satu
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      // Jika nggak punya role, redirect ke halaman sesuai role-nya
      if (user.roles.includes(Role.SUPER_ADMIN)) return <Navigate to="/superadmin" replace />;
      if (user.roles.includes(Role.ADMIN)) return <Navigate to="/admin/dashboard" replace />;
      return <Navigate to="/dashboard" replace />; // fallback ke halaman anggota
    }
  }

  return <Outlet />;
}
