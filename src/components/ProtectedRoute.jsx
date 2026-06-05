import { Navigate, Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
