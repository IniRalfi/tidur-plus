import api from './api';
import { Buku } from '@tidur-plus/shared';

export const bukuService = {
  getAll: async () => {
    const response = await api.get('/buku');
    return response.data.data as Buku[];
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/buku/${id}`);
    return response.data.data as Buku;
  },

  create: async (data: Partial<Buku>) => {
    const response = await api.post('/buku', data);
    return response.data.data as Buku;
  },

  update: async (id: string, data: Partial<Buku>) => {
    const response = await api.patch(`/buku/${id}`, data);
    return response.data.data as Buku;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/buku/${id}`);
    return response.data;
  }
};
