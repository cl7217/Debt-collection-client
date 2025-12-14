// src/components/clients/ClientSelect.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../redux/clientsSlice";
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";

export default function ClientSelect({ value, onChange }) {
  const dispatch = useDispatch();
  const { clients, loading } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  if (loading) return <CircularProgress size={24} />;

  return (
    <FormControl fullWidth>
      <InputLabel id="client-select-label">בחר לקוח</InputLabel>
      <Select
        labelId="client-select-label"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {clients.map((client) => (
          <MenuItem key={client.id} value={client.id}>
            {client.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
