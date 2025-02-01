import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  const login = async (credentials) => {
    const { data } = await loginUser(credentials);
    localStorage.setItem("token", data.token);
    setUser(data.token);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>
  );
}