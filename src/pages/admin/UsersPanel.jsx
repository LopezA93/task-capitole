import { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import UserForm from "../../components/UserForm/UserForm.jsx";
import UserList from "../../components/UserList/UserList.jsx";
import UserEditDialog from "../../components/UserEditDialog/UserEditDialog.jsx";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog.jsx";
import { createUser, updateUser, deleteUser } from "../../services/taskService.js";
import { useAdminData } from "../../context/AdminDataContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const UsersPanel = () => {
  const { users, loading, error, setUsers, setTasks } = useAdminData();
  const { user: currentUser } = useAuth();
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const handleCreateUser = async (payload) => {
    try {
      const nuevo = await createUser(payload);
      setUsers((prev) => [...prev, nuevo]);
      toast.success("Usuario creado correctamente");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al crear usuario");
      throw err;
    }
  };

  const handleUpdateUser = async (payload) => {
    try {
      const upd = await updateUser(toEdit.id, payload);
      setUsers((prev) => prev.map((u) => (u.id === upd.id ? upd : u)));
      toast.success("Usuario actualizado");
      setToEdit(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al actualizar usuario");
      throw err;
    }
  };

  const handleDeleteUser = async () => {
    const target = toDelete;
    setToDelete(null);
    try {
      await deleteUser(target.id);
      setUsers((prev) => prev.filter((u) => u.id !== target.id));
      setTasks((prev) =>
        prev.map((t) => {
          const respId = t.responsable?.id || t.responsable;
          return respId === target.id ? { ...t, responsable: null } : t;
        }),
      );
      toast.success("Usuario eliminado");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al eliminar usuario");
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
        Usuarios
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        Crear usuario
      </Typography>
      <UserForm onCreate={handleCreateUser} />

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        Listado
      </Typography>
      <UserList
        users={users}
        currentUserId={currentUser?.id}
        onEdit={setToEdit}
        onDelete={setToDelete}
      />

      <UserEditDialog
        open={Boolean(toEdit)}
        user={toEdit}
        onConfirm={handleUpdateUser}
        onCancel={() => setToEdit(null)}
      />

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Eliminar usuario"
        message={
          toDelete
            ? `¿Seguro que querés eliminar a "${toDelete.name}"? Sus tareas quedarán sin asignar.`
            : ""
        }
        confirmText="Eliminar"
        confirmColor="error"
        onConfirm={handleDeleteUser}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
};

export default UsersPanel;
