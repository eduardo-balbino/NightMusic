import { useState } from "react";
import { login as loginService, logout as logoutService } from "@services/auth.js";

interface Credentials {
  username: string;
  password: string;
  // adicione outros campos conforme necessário
}

interface User {
  id: string;
  name: string;
  email: string;
  // adicione outros campos conforme necessário
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: Credentials): Promise<User> => {
    try {
      const userData: User = await loginService(credentials);
      setUser(userData);
      return userData;
    } catch {
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
