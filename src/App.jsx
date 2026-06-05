import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout/Layout.jsx";
import AdminDataLayout from "./pages/admin/AdminDataLayout.jsx";

const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel.jsx"));
const UsersPanel = lazy(() => import("./pages/admin/UsersPanel.jsx"));
const UserPanel = lazy(() => import("./pages/UserPanel.jsx"));

const App = () => (
  <Suspense
    fallback={
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    }
  >
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<UserPanel />} />
          <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<AdminDataLayout />}>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/users" element={<UsersPanel />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default App;
