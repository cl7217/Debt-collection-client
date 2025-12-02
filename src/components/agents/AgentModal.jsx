// src/components/agents/AgentModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Paper,
  Divider,
  Box
} from "@mui/material";

export default function AgentModal({ agent, onClose }) {
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <Box dir="rtl" sx={{ textAlign: "right" }}>

        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontSize: "1.5rem",
            py: 2
          }}
        >
          פרטי סוכן
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: "#f5f7fa", p: 3 }}>
          <Section title="פרטים כלליים">
            <Item label="קוד סוכן" value={agent.id} />
            <Item label="שם סוכן" value={agent.name ?? "-"} />
            <Item label="טלפון" value={agent.phone ?? "-"} />
            <Item label="אימייל" value={agent.email ?? "-"} />
            <Item label="סטטוס" value={agent.isActive ? "פעיל" : "לא פעיל"} />
          </Section>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" onClick={onClose}>
            סגור
          </Button>
        </DialogActions>

      </Box>
    </Dialog>
  );
}

function Section({ title, children }) {
  return (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }} elevation={2}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Paper>
  );
}

function Item({ label, value }) {
  return (
    <Typography sx={{ mb: 1 }}>
      <b>{label}:</b> {value}
    </Typography>
  );
}
