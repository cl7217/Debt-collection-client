import { useState, useEffect } from "react";
import { Container, Typography, Paper, Stack, Button } from "@mui/material";
import { getClients } from "../services/clientsApi";
import PaymentsChart from "../components/collections/PaymentsChart";
import { getCollections, aggregateByMonth } from "../services/collectionsApi";
import SiteInvoicesPage from "../components/collections/SiteInvoicesPage";

export default function CollectionsPage() {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [charts, setCharts] = useState({});
  useEffect(()=>{
    getClients().then(clients => {
      const allSites = [];
      clients.forEach(client => {
        client.sites.forEach(site => {
          allSites.push({ ...site, clientName: client.name });
        });
      });
      setSites(allSites);
      // טען דיאגרמות תשלום לכל אתר
      allSites.forEach(site => {
        getCollections({ siteId: site.id, monthsBack: 6 }).then(invs => {
          setCharts(prev => ({ ...prev, [site.id]: aggregateByMonth(invs) }));
        });
      });
    });
  },[]);
  if (selectedSite) return <SiteInvoicesPage site={selectedSite} onBack={()=>setSelectedSite(null)} />;
  return (
    <Container sx={{ mt: 6, direction: "rtl", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>גביה לפי אתר ולקוח</Typography>
      <Paper sx={{ p:2, maxWidth:600, margin:"auto" }}>
        <Stack spacing={4}>
          {sites.map(site => (
            <Stack key={site.id} spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography>{site.clientName} - {site.name}</Typography>
                <Button variant="contained" color="primary" onClick={()=>setSelectedSite(site)}>צפה בגביה</Button>
              </Stack>
              <PaymentsChart agg={charts[site.id] || {}} />
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}
