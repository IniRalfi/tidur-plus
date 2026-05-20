import api from './api';
import { User } from '@tidur-plus/shared';

export const usersService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data.data as User[];
  },

  getById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data.data as User;
  },

  updateRole: async (id: string, roles: string[]) => {
    const response = await api.patch(`/users/${id}/role`, { roles });
    return response.data.data as User;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};
