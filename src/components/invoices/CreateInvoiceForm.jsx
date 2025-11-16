import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { createInvoice } from "../../services/invoicesApi";

export default function CreateInvoiceForm({ onSuccess }) {
  const [invoice, setInvoice] = useState({
    siteId: "",
    issueDate: "",
    dueDate: "",
    amount: 0,
    status: "open",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createInvoice(invoice);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Site ID"
          name="siteId"
          value={invoice.siteId}
          onChange={handleChange}
          required
        />
        <TextField
          label="Issue Date"
          name="issueDate"
          type="date"
          value={invoice.issueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={invoice.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={invoice.amount}
          onChange={handleChange}
          required
        />
        <TextField
          label="Notes"
          name="notes"
          value={invoice.notes}
          onChange={handleChange}
          multiline
        />
        <Button type="submit" variant="contained">צור חשבונית</Button>
      </Stack>
    </form>
  );
}
