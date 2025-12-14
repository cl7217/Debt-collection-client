// src/components/agents/NewAgentForm.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel
} from "@mui/material";

import { createAgent } from "../../redux/agentsSlice";

export default function NewAgentForm({ onCancel }) {
  const dispatch = useDispatch();

  const [agentData, setAgentData] = useState({
    name: "",
    phone: "",
    email: "",
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAgentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createAgent(agentData)).unwrap();
      onCancel?.();
    } catch (err) {
      console.error("Error creating agent:", err);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 650, margin: "auto", direction: "rtl" }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        יצירת סוכן חדש
      </Typography>

      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
        <TextField label="שם" name="name" value={agentData.name} onChange={handleChange} required />

        <TextField label="טלפון" name="phone" value={agentData.phone} onChange={handleChange} />

        <TextField label="אימייל" name="email" value={agentData.email} onChange={handleChange} />

        <FormControlLabel
          control={<Checkbox checked={agentData.isActive} name="isActive" onChange={handleChange} />}
          label="פעיל"
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            צור סוכן
          </Button>

          <Button variant="outlined" color="secondary" onClick={onCancel}>
            ביטול
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
