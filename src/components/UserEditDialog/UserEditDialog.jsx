import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";

const UserEditDialog = ({ open, user, onConfirm, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "user");
      setPassword("");
      setError("");
    }
  }, [open, user]);

  const handleSave = async () => {
    setError("");
    if (password && password.length < 6) {
      setError("Contraseña mínimo 6 caracteres");
      return;
    }
    const payload = { name, email, role };
    if (password) payload.password = password;
    setSubmitting(true);
    try {
      await onConfirm(payload);
    } catch {
      setError("Error al guardar cambios");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle>Editar usuario</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            size="small"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            size="small"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormControl size="small" fullWidth>
            <InputLabel>Rol</InputLabel>
            <Select
              label="Rol"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            type="password"
            label="Nueva contraseña (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave} disabled={submitting}>
          {submitting ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserEditDialog;
