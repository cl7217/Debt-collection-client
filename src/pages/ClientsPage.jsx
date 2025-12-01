import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import ClientTable from "../components/clients/ClientTable";
import ClientModal from "../components/clients/ClientModal";
import NewClientForm from "../components/clients/NewClientForm";

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  return (
    <Container sx={{ mt: 6, direction: "rtl", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        לקוחות
      </Typography>

      {!showNewClientForm && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
          onClick={() => setShowNewClientForm(true)}
        >
          לקוח חדש
        </Button>
      )}

      {showNewClientForm ? (
        <NewClientForm
          onCancel={() => setShowNewClientForm(false)}
        />
      ) : (
        <ClientTable onSelect={(client) => setSelectedClient(client)} />
      )}

      {selectedClient && (
        <ClientModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </Container>
  );
}
