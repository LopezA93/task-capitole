import { Box, Typography, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import TaskForm from "../../components/TaskForm/TaskForm.jsx";
import TaskList from "../../components/TaskList/TaskList.jsx";
import {
  createTask,
  completeTask,
  assignTask,
  deleteTask,
} from "../../services/taskService.js";
import { useAdminData } from "../../context/AdminDataContext.jsx";

const AdminPanel = () => {
  const { tasks, users, loading, error, setTasks } = useAdminData();

  const handleCreate = async (payload) => {
    try {
      const nueva = await createTask(payload);
      setTasks((prev) => [...prev, nueva]);
      toast.success("Tarea creada");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al crear la tarea");
    }
  };

  const handleComplete = async (id, completed) => {
    try {
      const upd = await completeTask(id, completed);
      setTasks((prev) => prev.map((t) => (t.id === id ? upd : t)));
      toast.success(completed ? "Tarea completada" : "Tarea marcada pendiente");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al cambiar estado");
    }
  };

  const handleAssign = async (id, responsable) => {
    if (!responsable) return;
    try {
      const upd = await assignTask(id, responsable);
      setTasks((prev) => prev.map((t) => (t.id === id ? upd : t)));
      toast.success("Responsable asignado");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al asignar");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Tarea eliminada");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al eliminar");
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
        Tareas
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        Crear tarea
      </Typography>
      <TaskForm users={users} onCreate={handleCreate} />
      <TaskList
        tasks={tasks}
        role="admin"
        users={users}
        onComplete={handleComplete}
        onAssign={handleAssign}
        onDelete={handleDelete}
      />
    </>
  );
};

export default AdminPanel;
