import { useState, useEffect } from "react";
import { Container, Typography, Paper, Stack, Button } from "@mui/material";
import { getClients } from "../../services/clientsApi";
import SiteInvoicesPage from "./SiteInvoicesPage";

export default function CollectionsPage() {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  useEffect(()=>{
    getClients().then(clients => {
      // איגוד כל האתרים מכל הלקוחות
      const allSites = [];
      clients.forEach(client => {
        client.sites.forEach(site => {
          allSites.push({ ...site, clientName: client.name });
        });
      });
      setSites(allSites);
    });
  },[]);
  if (selectedSite) return <SiteInvoicesPage site={selectedSite} onBack={()=>setSelectedSite(null)} />;
  return (
    <Container sx={{ mt: 6, direction: "rtl", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>גביה לפי אתר ולקוח</Typography>
      <Paper sx={{ p:2, maxWidth:600, margin:"auto" }}>
        <Stack spacing={2}>
          {sites.map(site => (
            <Stack key={site.id} direction="row" justifyContent="space-between" alignItems="center">
              <Typography>{site.clientName} - {site.name}</Typography>
              <Button variant="contained" color="primary" onClick={()=>setSelectedSite(site)}>צפה בגביה</Button>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}
