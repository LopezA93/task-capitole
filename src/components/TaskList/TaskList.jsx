import { useState } from "react";
import { Box, Paper, Typography, Chip, Button } from "@mui/material";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog.jsx";
import AssignDialog from "../AssignDialog/AssignDialog.jsx";

const nameOf = (users, id) =>
  users.find((u) => u.id === id)?.name || "Sin asignar";

const TaskList = ({
  tasks,
  role,
  users = [],
  onComplete,
  onAssign,
  onDelete,
}) => {
  const [toDelete, setToDelete] = useState(null);
  const [toAssign, setToAssign] = useState(null);

  const confirmDelete = () => {
    if (toDelete) onDelete(toDelete.id);
    setToDelete(null);
  };

  const assignCurrentId = toAssign
    ? toAssign.responsable?.id || toAssign.responsable || ""
    : "";

  const confirmAssign = (userId) => {
    if (toAssign) onAssign(toAssign.id, userId);
    setToAssign(null);
  };

  if (!tasks.length)
    return <Typography color="text.secondary">No hay tareas.</Typography>;

  return (
    <Box>
      {tasks.map((t) => {
        const responsableId =
          t.responsable?.id || t.responsable || "";
        const responsableName =
          t.responsable?.name || nameOf(users, responsableId);
        return (
          <Paper
            key={t.id}
            elevation={1}
            sx={{
              p: 2,
              mb: 1,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    textDecoration: t.completed ? "line-through" : "none",
                    color: t.completed ? "text.secondary" : "text.primary",
                  }}
                >
                  {t.title}
                </Typography>
                <Chip
                  size="small"
                  label={t.completed ? "Completada" : "Pendiente"}
                  color={t.completed ? "success" : "warning"}
                  variant="outlined"
                />
              </Box>
              {t.description && (
                <Typography variant="body2" color="text.secondary">
                  {t.description}
                </Typography>
              )}
              {role === "admin" && (
                <Typography variant="caption" color="text.secondary">
                  Responsable: {responsableName}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexWrap: "wrap",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {!t.completed && (
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => onComplete(t.id, true)}
                >
                  Completar
                </Button>
              )}
              {t.completed && role === "admin" && (
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  onClick={() => onComplete(t.id, false)}
                >
                  Marcar pendiente
                </Button>
              )}
              {role === "admin" && (
                <>
                  <Button size="small" onClick={() => setToAssign(t)}>
                    Reasignar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setToDelete(t)}
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        );
      })}

      <AssignDialog
        open={Boolean(toAssign)}
        users={users}
        currentId={assignCurrentId}
        onConfirm={confirmAssign}
        onCancel={() => setToAssign(null)}
      />

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Eliminar tarea"
        message={
          toDelete
            ? `¿Seguro que querés eliminar "${toDelete.title}"? Esta acción no se puede deshacer.`
            : ""
        }
        confirmText="Eliminar"
        confirmColor="error"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </Box>
  );
};

export default TaskList;
