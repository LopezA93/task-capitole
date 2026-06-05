import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken, setOnLogout } from "../services/api.js";
import {
  loginRequest,
  registerRequest,
  refreshRequest,
  logoutRequest,
} from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const applySession = (data) => {
    setAccessToken(data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const clearSession = () => {
    setAccessToken(null);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    applySession(data);
    return data.user;
  };

  const register = async (name, email, password) => {
    const data = await registerRequest(name, email, password);
    applySession(data);
    return data.user;
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) await logoutRequest(refreshToken);
    clearSession();
  };

  useEffect(() => {
    setOnLogout(clearSession);
  }, []);

  useEffect(() => {
    const init = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const savedUser = localStorage.getItem("user");
      if (!refreshToken) {
        setLoading(false);
        return;
      }
      try {
        const data = await refreshRequest(refreshToken);
        setAccessToken(data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        if (savedUser) setUser(JSON.parse(savedUser));
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
