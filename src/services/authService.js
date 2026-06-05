import api from "./api.js";

export const loginRequest = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data.data;
};

export const registerRequest = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data.data;
};

export const refreshRequest = async (refreshToken) => {
  const response = await api.post("/auth/refresh", { refreshToken });
  return response.data.data;
};

export const logoutRequest = async (refreshToken) => {
  const response = await api.post("/auth/logout", { refreshToken });
  return response.data;
};
