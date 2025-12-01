import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Divider
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { createClient } from "../../redux/clientsSlice";

export default function NewClientForm({ onCancel }) {
  const dispatch = useDispatch();

  const [clientData, setClientData] = useState({
    name: "",
    invoiceContact: "",
    phone: "",
    email: "",
    paysBreaks: false,
    isActive: true,
    paymentForecast: "",
    agentRate: "",
    agentId: "",
    employeeRates: [],
  });

  const [newRate, setNewRate] = useState({ name: "", rate: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRateChange = (e) => {
    const { name, value } = e.target;
    setNewRate((prev) => ({ ...prev, [name]: value }));
  };

  const addRate = () => {
    if (!newRate.name.trim() || !newRate.rate) return;

    setClientData((prev) => ({
      ...prev,
      employeeRates: [
        ...prev.employeeRates,
        {
          name: newRate.name.trim(),
          rate: Number(newRate.rate),
        },
      ],
    }));

    setNewRate({ name: "", rate: "" });
  };

  const removeRate = (index) => {
    setClientData((prev) => ({
      ...prev,
      employeeRates: prev.employeeRates.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...clientData,
      paymentForecast: clientData.paymentForecast
        ? Number(clientData.paymentForecast)
        : null,
      agentRate: clientData.agentRate ? Number(clientData.agentRate) : null,
      agentId: clientData.agentId ? Number(clientData.agentId) : null,
      employeeRates: clientData.employeeRates.map((r) => ({
        name: r.name,
        rate: Number(r.rate),
      })),
    };

    try {
      await dispatch(createClient(payload)).unwrap();

      setClientData({
        name: "",
        invoiceContact: "",
        phone: "",
        email: "",
        paysBreaks: false,
        isActive: true,
        paymentForecast: "",
        agentRate: "",
        agentId: "",
        employeeRates: [],
      });

      if (onCancel) onCancel();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        maxWidth: 650,
        margin: "auto",
        direction: "rtl",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        יצירת לקוח חדש
      </Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={handleSubmit}
      >
        <TextField label="שם לקוח" name="name" value={clientData.name} onChange={handleChange} required />

        <TextField label="איש קשר לחשבוניות" name="invoiceContact" value={clientData.invoiceContact} onChange={handleChange} />

        <TextField label="טלפון" name="phone" value={clientData.phone} onChange={handleChange} />

        <TextField label="אימייל" name="email" value={clientData.email} onChange={handleChange} />

        <TextField label="מספר סוכן" name="agentId" type="number" value={clientData.agentId} onChange={handleChange} />

        <TextField label="תחזית תשלום" name="paymentForecast" type="number" value={clientData.paymentForecast} onChange={handleChange} />

        <TextField label="עמלת סוכן" name="agentRate" type="number" value={clientData.agentRate} onChange={handleChange} />

        <FormControlLabel
          control={<Checkbox checked={clientData.paysBreaks} name="paysBreaks" onChange={handleChange} />}
          label="משלם הפסקות"
        />

        <FormControlLabel
          control={<Checkbox checked={clientData.isActive} name="isActive" onChange={handleChange} />}
          label="פעיל"
        />

        {/* Rates Section */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">תעריפים</Typography>

        {clientData.employeeRates.map((rate, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography>{rate.name} — {rate.rate}</Typography>
            <IconButton color="error" onClick={() => removeRate(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            label="שם תעריף"
            name="name"
            value={newRate.name}
            onChange={handleRateChange}
            size="small"
            fullWidth
          />

          <TextField
            label="תעריף"
            name="rate"
            value={newRate.rate}
            onChange={handleRateChange}
            type="number"
            size="small"
            fullWidth
          />

          <IconButton color="primary" onClick={addRate}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            צור לקוח
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            ביטול
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
