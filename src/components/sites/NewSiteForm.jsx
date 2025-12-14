// src/components/sites/NewSiteForm.jsx
import ClientSelect from "../clients/ClientSelect";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSite } from "../../redux/sitesSlice";
import { TextField, Button, Switch, FormControlLabel, Paper, Typography, Box } from "@mui/material";  

export default function NewSiteForm({ onCancel }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientId) return; // לא ניתן לשלוח בלי לקוח
    dispatch(createSite({ name, clientId, isActive }));
    onCancel();
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>אתר חדש</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="שם האתר"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        {/* כאן הקומפוננטה של בחירת לקוח */}
        <ClientSelect value={clientId} onChange={setClientId} />

        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              color="primary"
            />
          }
          label="פעיל"
        />

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">שמור</Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>ביטול</Button>
        </Box>
      </Box>
    </Paper>
  );
}
