import api from './api';

export const peminjamanService = {
  getAll: async () => {
    const response = await api.get('/peminjaman');
    return response.data.data;
  },

  getAdminAll: async () => {
    const response = await api.get('/admin/peminjaman');
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/peminjaman/${id}`);
    return response.data.data;
  },

  create: async (data: any) => {
    const response = await api.post('/peminjaman', data);
    return response.data.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/peminjaman/${id}/status`, { status });
    return response.data.data;
  },
  
  kembalikanBuku: async (id: string) => {
    const response = await api.post(`/peminjaman/${id}/kembali`);
    return response.data.data;
  }
};
