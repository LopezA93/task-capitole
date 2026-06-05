import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const AssignDialog = ({ open, users = [], currentId = "", onConfirm, onCancel }) => {
  const [selected, setSelected] = useState(currentId);

  useEffect(() => {
    if (open) setSelected(currentId);
  }, [open, currentId]);

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle>Reasignar responsable</DialogTitle>
      <DialogContent>
        <FormControl size="small" fullWidth sx={{ mt: 1 }}>
          <InputLabel>Responsable</InputLabel>
          <Select
            label="Responsable"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <MenuItem value="">Sin asignar</MenuItem>
            {users.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button
          variant="contained"
          disabled={!selected}
          onClick={() => onConfirm(selected)}
        >
          Reasignar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignDialog;
