// src/pages/SitesPage.jsx
import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import SitesTable from "../components/sites/SitesTable";
import SiteModal from "../components/sites/SiteModal";
import NewSiteForm from "../components/sites/NewSiteForm";

export default function SitesPage() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [showNewSiteForm, setShowNewSiteForm] = useState(false);

  return (
    <Container sx={{ mt: 6, direction: "rtl", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom> אתרים </Typography>

      {!showNewSiteForm && (
        <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={() => setShowNewSiteForm(true)}>
          אתר חדש
        </Button>
      )}

      {showNewSiteForm ? (
        <NewSiteForm onCancel={() => setShowNewSiteForm(false)} />
      ) : (
        <SitesTable onSelect={(site) => setSelectedSite(site)} />
      )}

      {selectedSite && <SiteModal site={selectedSite} onClose={() => setSelectedSite(null)} />}
    </Container>
  );
}
