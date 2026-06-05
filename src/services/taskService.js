import api from "./api.js";

export const getTasks = () => api.get("/tasks").then((r) => r.data.data);

export const createTask = async (payload) => {
  const response = await api.post("/tasks", payload);
  return response.data.data;
};

export const completeTask = async (id, completed = true) => {
  const response = await api.patch(`/tasks/${id}/complete`, { completed });
  return response.data.data;
};

export const assignTask = async (id, responsable) => {
  const response = await api.patch(`/tasks/${id}/assign`, { responsable });
  return response.data.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data.data;
};

export const createUser = async (payload) => {
  const response = await api.post("/users", payload);
  return response.data.data;
};

export const updateUser = async (id, payload) => {
  const response = await api.patch(`/users/${id}`, payload);
  return response.data.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
