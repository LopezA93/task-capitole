import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Button,
  Box,
  Typography,
} from "@mui/material";

const idOf = (u) => u.id || u._id;

const UserList = ({ users, currentUserId, onEdit, onDelete }) => {
  if (!users.length)
    return <Typography color="text.secondary">No hay usuarios.</Typography>;

  return (
    <Paper elevation={1}>
      <List disablePadding>
        {users.map((u, i) => (
          <div key={idOf(u)}>
            {i > 0 && <Divider component="li" />}
            <ListItem
              sx={{ flexWrap: "wrap", gap: 1 }}
              secondaryAction={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    size="small"
                    label={u.role}
                    color={u.role === "admin" ? "primary" : "default"}
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                  />
                  <Button size="small" onClick={() => onEdit(u)}>
                    Editar
                  </Button>
                  {idOf(u) !== currentUserId && (
                    <Button size="small" color="error" onClick={() => onDelete(u)}>
                      Eliminar
                    </Button>
                  )}
                </Box>
              }
            >
              <ListItemText primary={u.name} secondary={u.email} />
            </ListItem>
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default UserList;
