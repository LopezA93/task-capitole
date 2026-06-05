import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import TaskList from "../components/TaskList/TaskList.jsx";
import { getTasks, completeTask } from "../services/taskService.js";

const UserPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setTasks(await getTasks());
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar tareas");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleComplete = async (id, completed) => {
    try {
      const upd = await completeTask(id, completed);
      setTasks((prev) => prev.map((t) => (t._id === id ? upd : t)));
      toast.success(completed ? "Tarea completada" : "Tarea marcada pendiente");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al cambiar estado");
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Mis tareas
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TaskList tasks={tasks} role="user" onComplete={handleComplete} />
    </>
  );
};

export default UserPanel;
