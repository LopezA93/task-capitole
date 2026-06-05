import { createContext, useContext, useEffect, useState } from "react";
import { getTasks, getUsers } from "../services/taskService.js";

const AdminDataContext = createContext(null);

export const AdminDataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [t, u] = await Promise.all([getTasks(), getUsers()]);
        if (!active) return;
        setTasks(t);
        setUsers(u);
      } catch (err) {
        if (active) {
          setError(err.response?.data?.message || "Error al cargar datos");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <AdminDataContext.Provider
      value={{ tasks, users, loading, error, setTasks, setUsers }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => useContext(AdminDataContext);
