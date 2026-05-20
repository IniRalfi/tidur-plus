import api from './api';

export const dendaService = {
  getAll: async () => {
    const response = await api.get('/denda');
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/denda/${id}`);
    return response.data.data;
  },

  pay: async (id: string, amount: number) => {
    const response = await api.post(`/denda/${id}/pay`, { amount });
    return response.data.data;
  }
};
