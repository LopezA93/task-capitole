import { useState } from "react";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

const UserForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Contraseña mínimo 6 caracteres");
      return;
    }
    if (!role) {
      setError("Seleccionar rol");
      return;
    }
    setSubmitting(true);
    try {
      await onCreate({ name, email, password, role });
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch {
      setError("Error al crear usuario");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TextField
        size="small"
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ flex: { xs: "1 1 100%", sm: 1 }, minWidth: 140 }}
      />
      <TextField
        size="small"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        sx={{ flex: { xs: "1 1 100%", sm: 1 }, minWidth: 140 }}
      />
      <TextField
        size="small"
        type="password"
        label="Contraseña (mín 6)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{ flex: { xs: "1 1 100%", sm: 1 }, minWidth: 140 }}
      />
      <FormControl
        size="small"
        sx={{ minWidth: 140, width: { xs: "100%", sm: "auto" } }}
      >
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
      <Button
        type="submit"
        variant="contained"
        disabled={submitting}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        {submitting ? "..." : "Crear usuario"}
      </Button>
      {error && (
        <Typography color="error" variant="body2" sx={{ width: "100%" }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default UserForm;
