import { useState } from "react";
import { Container, Typography } from "@mui/material";
import ClientTable from "../components/clients/ClientTable";
import ClientModal from "../components/clients/ClientModal";

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <Container sx={{ mt: 6, direction: "rtl", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        לקוחות
      </Typography>

      {/* טבלת לקוחות */}
      <ClientTable onSelect={(client) => setSelectedClient(client)} />

      {/* מודאל להצגת פרטי לקוח */}
      {selectedClient && (
        <ClientModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </Container>
  );
}
