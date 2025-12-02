import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Box
} from "@mui/material";

export default function ClientModal({ client, onClose }) {
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      
      {/* עטיפה שנותנת RTL טבעי לכל התוכן */}
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
          פרטי הלקוח
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: "#f5f7fa", p: 3 }}>
          
          {/* פרטים כלליים */}
          <Section title="פרטים כלליים">
            <Item label="שם הלקוח" value={client.name} />
            <Item label="איש קשר" value={client.invoiceContact ?? "-"} />
            <Item label="טלפון" value={client.phone ?? "-"} />
            <Item label="אימייל" value={client.email ?? "-"} />
            <Item label="סטטוס" value={client.isActive ? "פעיל" : "לא פעיל"} />
          </Section>

          {/* פרטי שכר */}
          <Section title="פרטי שכר לעובדים">
            {client.employeeRates?.length > 0 ? (
              <List>
                {client.employeeRates.map((rate) => (
                  <ListItem key={rate.id} sx={{ px: 0 }}>
                    <ListItemText
                      primary={`${rate.name} — ${rate.rate} ₪`}
                      primaryTypographyProps={{ fontWeight: 500 }}
                      sx={{ textAlign: "right" }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>אין תעריפים זמינים</Typography>
            )}
          </Section>

          {/* תשלומים */}
          <Section title="פרטי תשלום">
            <Item label="משלם הפסקות" value={client.paysBreaks ? "כן" : "לא"} />
            <Item label="תחזית תשלום" value={`${client.paymentForecast} ₪`} />
            <Item label="עמלת סוכן" value={`${client.agentRate} ₪`} />
            <Item label="קוד סוכן" value={client.agentId} />
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

/* קומפוננטות עזר */

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
