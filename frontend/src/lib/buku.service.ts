import api from './api';
import { Buku } from '@tidur-plus/shared';

export const bukuService = {
  getAll: async () => {
    const response = await api.get('/katalog');
    return response.data.data as Buku[];
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/katalog/${id}`);
    return response.data.data as Buku;
  },

  create: async (data: Partial<Buku>) => {
    const response = await api.post('/admin/buku', data);
    return response.data.data as Buku;
  },

  update: async (id: string, data: Partial<Buku>) => {
    const response = await api.put(`/admin/buku/${id}`, data);
    return response.data.data as Buku;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/admin/buku/${id}`);
    return response.data;
  }
};
