import api from './api';

export const dendaService = {
  getAllAdmin: async () => {
    const response = await api.get('/admin/denda');
    return response.data.data;
  },

  getByIdAdmin: async (id: string) => {
    const response = await api.get(`/admin/denda/${id}`);
    return response.data.data;
  },

  getByPeminjaman: async (peminjamanId: string) => {
    const response = await api.get(`/peminjaman/${peminjamanId}/denda`);
    return response.data.data;
  },

  lunasi: async (id: string) => {
    const response = await api.patch(`/admin/denda/${id}/lunas`);
    return response.data.data;
  }
};
