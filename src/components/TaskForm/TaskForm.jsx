import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const TaskForm = ({ users, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responsable, setResponsable] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onCreate({
        title,
        description,
        responsable: responsable || undefined,
      });
      setTitle("");
      setDescription("");
      setResponsable("");
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
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{ flex: { xs: "1 1 100%", sm: 1 }, minWidth: 140 }}
      />
      <TextField
        size="small"
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ flex: { xs: "1 1 100%", sm: 1 }, minWidth: 140 }}
      />
      <FormControl
        size="small"
        sx={{ minWidth: 160, width: { xs: "100%", sm: "auto" } }}
      >
        <InputLabel>Responsable</InputLabel>
        <Select
          label="Responsable"
          value={responsable}
          onChange={(e) => setResponsable(e.target.value)}
        >
          {users.map((u) => (
            <MenuItem key={u.id} value={u.id}>
              {u.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        disabled={submitting}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        {submitting ? "..." : "Crear"}
      </Button>
    </Paper>
  );
};

export default TaskForm;
