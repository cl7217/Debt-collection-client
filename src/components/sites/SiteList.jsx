import { useState, useEffect } from "react";
import { getSites } from "../../services/sitesApi";
import { Button, Paper, Stack, Typography } from "@mui/material";
import CollectionsView from "../collections/CollectionsView";

export default function SiteList() {
  const [sites, setSites] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(()=>{ getSites().then(setSites); },[]);
  return (
    <>
      <Paper sx={{ p:2, maxWidth:900, margin:"auto" }}>
        <Stack spacing={2}>
          {sites.map(site => (
            <Stack key={site.id} direction="row" justifyContent="space-between" alignItems="center">
              <Typography>{site.name}</Typography>
              <Button variant="outlined" onClick={()=>setSelected(site)}>הצג גביה</Button>
            </Stack>
          ))}
        </Stack>
      </Paper>
      {selected && <CollectionsView siteId={selected.id} onClose={()=>setSelected(null)} />}
    </>
  );
}
