import axios from 'axios';
import { API_URL } from '../utils/constants';

const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
});

export const login = async (email, password) => {
  try {
    const response = await authApi.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await authApi.post('/register', { username, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  try {
    await authApi.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Logout failed';
    throw new Error(errorMessage);
  }
};

export const checkAuthStatus = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await authApi.get('/me');
    return response.data.user;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};