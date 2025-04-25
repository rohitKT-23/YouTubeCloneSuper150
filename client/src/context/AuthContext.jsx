import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (userData) => {
    if (userData.token) {
      localStorage.setItem('token', userData.token);
      setUser({
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.username)}&background=random`
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setUser({
            ...response.data,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(response.data.username)}&background=random`
          });
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};