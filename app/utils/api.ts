import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    await SecureStore.setItemAsync('userToken', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData: any) => {
  try {
    const response = await api.post('/auth/register', userData);
    await SecureStore.setItemAsync('userToken', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;