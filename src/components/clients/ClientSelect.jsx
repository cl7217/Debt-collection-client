// src/components/clients/ClientSelect.jsx
<FormControl fullWidth variant="outlined">
  <InputLabel id="client-select-label">בחר לקוח</InputLabel>
  <Select
    labelId="client-select-label"
    label="בחר לקוח" // <--- חשוב! כאן
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
