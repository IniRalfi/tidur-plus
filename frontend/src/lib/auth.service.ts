import api from './api';
import { User } from '@tidur-plus/shared';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { user, accessToken, refreshToken } = response.data.data;
    
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    
    return user as User;
  },

  register: async (nama: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { nama, email, password });
    const { user, accessToken, refreshToken } = response.data.data;
    
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    
    return user as User;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data.data as User;
  }
};
