// src/components/sites/SitesTable.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSites } from "../../redux/sitesSlice";
import SiteModal from "./SiteModal";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, CircularProgress, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function SitesTable() {
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.sites.sites);
  const loading = useSelector((state) => state.sites.loading);
  const [selected, setSelected] = useState(null);

  // מפת UUID עבור כל site
  const [siteKeys, setSiteKeys] = useState({});

  const clients = useSelector(state => state.clients.clients);

  useEffect(() => {
    dispatch(fetchSites());
  }, [dispatch]);

  // מייצרים UUID חדש רק אם הוא לא קיים עבור site זה
  useEffect(() => {
    if (sites) {
      const newKeys = { ...siteKeys };
      sites.forEach(site => {
        if (!newKeys[site.id]) {
          newKeys[site.id] = uuidv4();
        }
      });
      setSiteKeys(newKeys);
    }
  }, [sites]);

  const getActiveStyle = (active) => active ? { bg: "#4caf50", color: "#fff" } : { bg: "#d32f2f", color: "#fff" };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", direction: "rtl" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>מספר אתר</TableCell>
              <TableCell sx={{ textAlign: "center" }}>שם אתר</TableCell>
              <TableCell sx={{ textAlign: "center" }}>לקוח</TableCell>
              <TableCell sx={{ textAlign: "center" }}>סטטוס</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites?.map((site) => {
              const client = clients.find(c => c.id === site.clientId);
              const style = getActiveStyle(site.isActive);
              const rowKey = siteKeys[site.id] || site.id; // שימוש ב-UUID קבוע או fallback ל-id
              return (
                <TableRow key={rowKey} hover onClick={() => setSelected(site)} sx={{ cursor: "pointer" }}>
                  <TableCell sx={{ textAlign: "center" }}>{site.id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{site.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{client?.name ?? "-"}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip label={site.isActive ? "פעיל" : "לא פעיל"} size="small" sx={{ backgroundColor: style.bg, color: style.color, fontWeight: "bold" }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {selected && <SiteModal site={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
