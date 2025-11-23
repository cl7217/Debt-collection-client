import { useState, useEffect } from "react";
import { getCollections, aggregateByMonth } from "../../services/collectionsApi";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from "@mui/material";
import PaymentsChart from "./PaymentsChart";

export default function CollectionsView({ clientId, siteId, onClose }) {
  const [invoices, setInvoices] = useState([]);
  useEffect(()=>{
    getCollections({ clientId, siteId, monthsBack: 6 }).then(setInvoices);
  },[clientId, siteId]);
  const agg = aggregateByMonth(invoices);
  // חישוב אמינות
  const reliability = invoices.length ? (invoices.filter(i=>i.paidAmount>=i.amount).length / invoices.length * 100).toFixed(0) : 0;
  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>גביה - פירוט חשבוניות</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography>מדד אמינות: {reliability}%</Typography>
          <PaymentsChart agg={agg} />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>חודש</TableCell>
                  <TableCell>סה"כ</TableCell>
                  <TableCell>שולם</TableCell>
                  <TableCell>מס' חשבוניות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(agg).map(([month, data]) => (
                  <TableRow key={month}>
                    <TableCell>{month}</TableCell>
                    <TableCell>{data.total}</TableCell>
                    <TableCell>{data.paid}</TableCell>
                    <TableCell>{data.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>סגור</Button>
      </DialogActions>
    </Dialog>
  );
}
