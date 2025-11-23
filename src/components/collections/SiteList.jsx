import { useState, useEffect } from "react";
import { getSites } from "../../services/sitesApi";
import { Button, Paper, Stack, Typography } from "@mui/material";
import SiteInvoicesPage from "./SiteInvoicesPage";

export default function SiteList() {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  useEffect(()=>{ getSites().then(setSites); },[]);
  if (selectedSite) return <SiteInvoicesPage site={selectedSite} onBack={()=>setSelectedSite(null)} />;
  return (
    <>
      <Paper sx={{ p:2, maxWidth:600, margin:"auto" }}>
        <Stack spacing={2}>
          {sites.map(site => (
            <Stack key={site.id} direction="row" justifyContent="space-between" alignItems="center">
              <Typography>{site.name}</Typography>
              <Button variant="contained" color="primary" onClick={()=>setSelectedSite(site)}>הצג חשבוניות</Button>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
