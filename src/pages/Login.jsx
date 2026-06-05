import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Paper, TextField, Button, Typography, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import Logos from "../components/Logos.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const u = await login(email, password);
      navigate(u.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography
        align="center"
        color="text.secondary"
        variant="h4"
        sx={{ mb: 2, px: 1, fontSize: { xs: "1.4rem", sm: "2.125rem" } }}
      >
        Tareas manager Capitole & Synectic
      </Typography>
      <Paper elevation={2} sx={{ p: 4, width: "100%", maxWidth: 360 }}>
        <Logos />
        <Typography align="center" color="text.secondary" sx={{ mb: 2 }}>
          Iniciá sesión para continuar
        </Typography>

        <form onSubmit={handleSubmit}>
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
            label="Contraseña"
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
            {submitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <Typography align="center" variant="body2" sx={{ mt: 2 }}>
          ¿No tenés cuenta?{" "}
          <Link component={RouterLink} to="/register">
            Registrate
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
