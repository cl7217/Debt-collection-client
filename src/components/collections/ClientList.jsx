import { useState, useEffect } from "react";
import { getClients } from "../../services/clientsApi";
import { Button, Paper, Stack, Typography } from "@mui/material";
import SiteInvoicesPage from "./SiteInvoicesPage";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  useEffect(()=>{ getClients().then(setClients); },[]);
  if (selectedSite) return <SiteInvoicesPage site={selectedSite} onBack={()=>setSelectedSite(null)} />;
  return (
    <>
      <Paper sx={{ p:2, maxWidth:600, margin:"auto" }}>
        <Stack spacing={2}>
          {!selectedClient ? clients.map(client => (
            <Stack key={client.id} direction="row" justifyContent="space-between" alignItems="center">
              <Typography>{client.name}</Typography>
              <Button variant="outlined" onClick={()=>setSelectedClient(client)}>הצג אתרים</Button>
            </Stack>
          )) : (
            <>
              <Typography variant="h6">אתרים של {selectedClient.name}</Typography>
              {selectedClient.sites.map(site => (
                <Stack key={site.id} direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>{site.name}</Typography>
                  <Button variant="contained" color="primary" onClick={()=>setSelectedSite(site)}>הצג חשבוניות</Button>
                </Stack>
              ))}
              <Button sx={{mt:2}} onClick={()=>setSelectedClient(null)}>חזור לרשימת לקוחות</Button>
            </>
          )}
        </Stack>
      </Paper>
    </>
  );
}
