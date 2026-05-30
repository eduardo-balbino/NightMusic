import { useState } from "react";
import { login as loginService, logout as logoutService } from "@services/auth.js";

// Local minimal types to avoid unresolved module '@types/type' — adjust fields as needed
type Credentials = {
  email: string;
  password: string;
};

type User = {
  id: string;
  displayName?: string;
  name?: string;
  email?: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: Credentials): Promise<User> => {
    try {
      const response = await loginService(credentials);
      const userData: User = response.user;
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
