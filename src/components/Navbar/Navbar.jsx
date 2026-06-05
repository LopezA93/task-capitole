import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext.jsx";
import { SYNECTIC_LOGO, CAPITOLE_LOGO } from "../../utils/logos.js";

const navLinkSx = {
  color: "text.secondary",
  "&.active": { bgcolor: "primary.main", color: "#fff" },
};

const adminLinks = [
  { to: "/admin", label: "Tareas", end: true, icon: <AssignmentIcon /> },
  { to: "/admin/users", label: "Usuarios", end: false, icon: <PeopleIcon /> },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ gap: { xs: 1, sm: 2 } }}>
        <Box
          component="img"
          src={SYNECTIC_LOGO}
          alt="Synectic"
          sx={{ height: { xs: 20, sm: 24 } }}
        />
        <Divider orientation="vertical" flexItem />
        <Box
          component="img"
          src={CAPITOLE_LOGO}
          alt="Capitole"
          sx={{ height: { xs: 20, sm: 24 } }}
        />

        {user?.role === "admin" && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, ml: 1 }}>
            {adminLinks.map((l) => (
              <Button
                key={l.to}
                component={NavLink}
                to={l.to}
                end={l.end}
                size="small"
                sx={navLinkSx}
              >
                {l.label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          {user?.name} —{" "}
          <Box component="strong" sx={{ textTransform: "capitalize" }}>
            {user?.role}
          </Box>
        </Typography>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={handleLogout}
          sx={{ display: { xs: "none", md: "inline-flex" } }}
        >
          Cerrar sesión
        </Button>

        <IconButton
          edge="end"
          aria-label="menú"
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 260,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          <Box
            sx={{
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              bgcolor: "primary.main",
              color: "#fff",
            }}
          >
            <Avatar
              sx={{ bgcolor: "#fff", color: "primary.main", fontWeight: 700 }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={700} noWrap>
                {user?.name}
              </Typography>
              <Chip
                label={user?.role}
                size="small"
                sx={{
                  mt: 0.5,
                  height: 20,
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  textTransform: "capitalize",
                }}
              />
            </Box>
          </Box>

          {user?.role === "admin" && (
            <>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ px: 2, pt: 2, pb: 0.5 }}
              >
                Navegación
              </Typography>
              <List sx={{ px: 1 }}>
                {adminLinks.map((l) => (
                  <ListItem key={l.to} disablePadding>
                    <ListItemButton
                      component={NavLink}
                      to={l.to}
                      end={l.end}
                      onClick={() => setOpen(false)}
                      sx={{
                        borderRadius: 1,
                        "&.active": {
                          bgcolor: "action.selected",
                          color: "primary.main",
                          "& .MuiListItemIcon-root": { color: "primary.main" },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {l.icon}
                      </ListItemIcon>
                      <ListItemText primary={l.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Divider />
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
