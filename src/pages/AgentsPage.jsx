import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";

import AgentTable from "../components/agents/AgentTable";
import AgentModal from "../components/agents/AgentModal";
import NewAgentForm from "../components/agents/NewAgentForm";

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showNewAgentForm, setShowNewAgentForm] = useState(false);

  return (
    <Container sx={{ mt: 6, direction: "rtl", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        סוכנים
      </Typography>

      {!showNewAgentForm && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
          onClick={() => setShowNewAgentForm(true)}
        >
          סוכן חדש
        </Button>
      )}

      {showNewAgentForm ? (
        <NewAgentForm onCancel={() => setShowNewAgentForm(false)} />
      ) : (
        <AgentTable onSelect={(agent) => setSelectedAgent(agent)} />
      )}

      {selectedAgent && (
        <AgentModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </Container>
  );
}
