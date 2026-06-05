import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Paper, TextField, Button, Typography, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import Logos from "../components/Logos.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password mínimo 6 caracteres");
      return;
    }
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Paper elevation={2} sx={{ p: 4, width: "100%", maxWidth: 360 }}>
        <Logos />
        <Typography align="center" color="text.secondary" sx={{ mb: 2 }}>
          Creá tu cuenta
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Contraseña (mín 6)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={submitting}
            sx={{ mt: 2 }}
          >
            {submitting ? "Creando..." : "Registrarme"}
          </Button>
        </form>

        <Typography align="center" variant="body2" sx={{ mt: 2 }}>
          ¿Ya tenés cuenta?{" "}
          <Link component={RouterLink} to="/login">
            Iniciá sesión
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
