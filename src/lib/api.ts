import axios from 'axios';
import { supabase } from './supabase';
import { getBackendToken } from '@/services/authService';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_HOST,
});

// 请求拦截器
api.interceptors.request.use(async (config) => {
  try {
    const token = await getBackendToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Failed to get token:', error);
  }
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('Auth error:', error.response.data);
      // 清除token
      localStorage.removeItem('backend_token');
      await supabase.auth.signOut();
      window.location.href = '/signIn';
    }
    return Promise.reject(error);
  }
);

export default api; 