import api from './api';
import { User } from '@tidur-plus/shared';

export const usersService = {
  getAllAnggota: async () => {
    const response = await api.get('/admin/anggota');
    return response.data.data as User[];
  },

  getAllUsers: async () => {
    const response = await api.get('/superadmin/users');
    return response.data.data as User[];
  },

  getById: async (id: string, scope: 'admin' | 'superadmin' = 'superadmin') => {
    const path = scope === 'admin' ? `/admin/anggota/${id}` : `/superadmin/users/${id}`;
    const response = await api.get(path);
    return response.data.data as User;
  },

  updateRole: async (id: string, role: string) => {
    const response = await api.patch(`/superadmin/users/${id}/toggle-role`, { role });
    return response.data.data as User;
  },

  toggleAktif: async (id: string) => {
    const response = await api.patch(`/superadmin/users/${id}/toggle-aktif`);
    return response.data.data as User;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/superadmin/users/${id}`);
    return response.data;
  }
};
