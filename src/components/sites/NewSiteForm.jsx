// src/components/sites/NewSiteForm.jsx
import { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createSite } from "../../redux/sitesSlice";
import ClientSelect from "../clients/ClientSelect";

export default function NewSiteForm({ onCancel }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSite({ name, clientId: Number(clientId), isActive }));
    onCancel(); // סוגר את הפורם לאחר יצירה
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        יצירת אתר חדש
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="שם האתר"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <ClientSelect value={clientId} onChange={setClientId} />
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            שמור
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            ביטול
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
