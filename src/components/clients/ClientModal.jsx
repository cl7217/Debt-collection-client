import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider, List, ListItem, ListItemText, Paper, Box } from "@mui/material";

export default function ClientModal({ client, onClose }) {
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          backgroundColor: "#1976d2",
          color: "#fff",
          borderRadius: "4px 4px 0 0"
        }}
      >
        פרטי הלקוח
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#f5f5f5", p: 3 }}>
        {/* פרטים כלליים */}
        <Paper elevation={1} sx={{ p: 2, mb: 2, textAlign: "right" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>פרטים כלליים</Typography>
          <Typography><b>שם הלקוח:</b> {client.name}</Typography>
          <Typography><b>איש קשר:</b> {client.invoiceContact ?? "-"}</Typography>
          <Typography><b>טלפון:</b> {client.phone ?? "-"}</Typography>
          <Typography><b>אימייל:</b> {client.email ?? "-"}</Typography>
        </Paper>

        {/* פרטי שכר ותשלום */}
        <Paper elevation={1} sx={{ p: 2, mb: 2, textAlign: "right" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>פרטי שכר ותשלום</Typography>
          <Typography><b>שכר עובד רגיל:</b> {client.regularEmployeeRate} ₪</Typography>
          <Typography><b>שכר עובד מקצועי:</b> {client.professionalEmployeeRate} ₪</Typography>
          <Typography><b>משלם הפסקות:</b> {client.paysBreaks ? "כן" : "לא"}</Typography>
          <Typography><b>תחזית תשלום:</b> {client.paymentForecast} ₪</Typography>
          <Typography><b>עמלת סוכן:</b> {client.agentRate} ₪</Typography>
        </Paper>

        {/* סוכן */}
        <Paper elevation={1} sx={{ p: 2, mb: 2, textAlign: "right" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>סוכן אחראי</Typography>
          <Typography>{client.agentName ?? "-"}</Typography>
        </Paper>

        {/* אתרים */}
        <Paper elevation={1} sx={{ p: 2, textAlign: "right" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>אתרי הלקוח</Typography>
          {client.sites && client.sites.length > 0 ? (
            <List>
              {client.sites.map(site => (
                <ListItem key={site.id} sx={{ px: 0 }}>
                  <ListItemText
                    primary={site.name}
                    primaryTypographyProps={{ fontWeight: 500, textAlign: "right" }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>אין אתרים זמינים</Typography>
          )}
        </Paper>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", backgroundColor: "#f5f5f5", p: 2 }}>
        <Button variant="contained" color="primary" onClick={onClose}>
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
}
