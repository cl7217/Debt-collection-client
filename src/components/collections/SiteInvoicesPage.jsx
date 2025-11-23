import { useState, useEffect } from "react";
import { getCollections } from "../../services/collectionsApi";
import { Container, Typography, Card, CardContent, Stack, Chip, Button } from "@mui/material";

export default function SiteInvoicesPage({ site, onBack }) {
  const [invoices, setInvoices] = useState([]);
  useEffect(()=>{
    getCollections({ siteId: site.id, monthsBack: 6 }).then(setInvoices);
  },[site]);
  // חישוב סטטוס צבע
  const getStatusColor = (inv) => inv.paidAmount >= inv.amount ? "success" : "error";
  return (
    <Container sx={{ mt: 4, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>חשבוניות עבור {site.name}</Typography>
      {site.clientName && (
        <Typography variant="subtitle1" color="textSecondary">לקוח: {site.clientName}</Typography>
      )}
      <Button sx={{mb:2}} onClick={onBack}>חזור</Button>
      <Stack spacing={2}>
        {invoices.map(inv => (
          <Card key={inv.id} sx={{ borderRight: `8px solid ${inv.paidAmount >= inv.amount ? '#4caf50' : '#d32f2f'}` }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">חשבונית #{inv.id}</Typography>
                <Chip label={inv.status} color={getStatusColor(inv)} />
              </Stack>
              <Typography>תאריך: {inv.issueDate}</Typography>
              <Typography>סכום: ₪{inv.amount}</Typography>
              <Typography>שולם: ₪{inv.paidAmount}</Typography>
              <Typography>הערות: {inv.notes}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
