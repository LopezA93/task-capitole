import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

let accessToken = null;
let onLogout = null;

export const setAccessToken = (token) => {
  accessToken = token;
};
export const setOnLogout = (fn) => {
  onLogout = fn;
};

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const is401 = error.response?.status === 401;
    const isRefreshCall = original?.url?.includes("/auth/refresh");

    if (is401 && !original._retry && !isRefreshCall) {
      original._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        if (onLogout) onLogout();
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });
        accessToken = data.data.accessToken;
        localStorage.setItem("refreshToken", data.data.refreshToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (err) {
        if (onLogout) onLogout();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
