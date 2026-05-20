import api from './api';

export const kategoriService = {
  getAll: async () => {
    const response = await api.get('/kategori');
    return response.data.data;
  },

  create: async (data: { nama: string }) => {
    const response = await api.post('/kategori', data);
    return response.data.data;
  },

  update: async (id: string, data: { nama: string }) => {
    const response = await api.patch(`/kategori/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/kategori/${id}`);
    return response.data;
  }
};
