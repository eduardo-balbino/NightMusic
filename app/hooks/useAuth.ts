import { useState } from 'react';
import { login as loginService, logout as logoutService } from '../services/auth.js';

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const userData = await loginService(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
