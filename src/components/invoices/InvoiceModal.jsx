import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Typography, Chip, Button } from "@mui/material";

export default function InvoiceModal({ invoice, onClose, children }) {
    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
    const formatAmount = (amt) => `₪${amt.toFixed(2)}`;

    const getStatusStyle = (status) => {
        switch (status) {
            case "שולם-נכנס לבנק":
                return { bg: "#8000ff", color: "#fff" }; // סגול

            case "שולם":
                return { bg: "#4caf50", color: "#fff" }; // ירוק

            case "בהליך משפטי":
                return { bg: "#424242", color: "#fff" }; // אפור כהה

            case "ללא אישור":
                return { bg: "#d32f2f", color: "#fff" }; // אדום

            case "התקבל אסמכתה":
                return { bg: "#ffcc80", color: "#000" }; // כתום בהיר

            case "שולם ביתר":
                return { bg: "#e0e0e0", color: "#000" }; // אפור בהיר

            case "ללא אסמכתא":
                return { bg: "#9e9e9e", color: "#fff" }; // אפור רגיל

            case "אין שעות":
                return { bg: "#90caf9", color: "#000" }; // כחול בהיר

            case "צ'ק דחוי":
                return { bg: "#f48fb1", color: "#000" }; // ורוד

            default:
                return { bg: "#e0e0e0", color: "#000" }; // ברירת מחדל
        }
    };


    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ textAlign: "center" }}>{invoice ? `חשבונית #${invoice.id}` : "יצירת חשבונית חדשה"}</DialogTitle>

            <DialogContent dividers>
                {invoice ? (
                    <Stack spacing={2} dir="rtl">
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" color="textSecondary">אתר:</Typography>
                            <Typography>{invoice.site?.name ?? "-"}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" color="textSecondary">תאריך הנפקה:</Typography>
                            <Typography>{invoice.issueDate ? formatDate(invoice.issueDate) : "-"}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" color="textSecondary">תאריך תשלום:</Typography>
                            <Typography>{invoice.dueDate ? formatDate(invoice.dueDate) : "-"}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" color="textSecondary">סכום:</Typography>
                            <Typography>{invoice.amount != null ? formatAmount(invoice.amount) : "-"}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" color="textSecondary">שולם:</Typography>
                            <Typography>{invoice.paidAmount != null ? formatAmount(invoice.paidAmount) : "₪0.00"}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2" color="textSecondary">סטטוס:</Typography>

                            {(() => {
                                const style = getStatusStyle(invoice.status);
                                return (
                                    <Chip
                                        label={invoice.status ?? "-"}
                                        size="small"
                                        sx={{
                                            backgroundColor: style.bg,
                                            color: style.color,
                                            fontWeight: "bold"
                                        }}
                                    />
                                );
                            })()}
                        </Stack>

                        <Stack>
                            <Typography variant="subtitle2" color="textSecondary">הערות:</Typography>
                            <Typography sx={{ textAlign: "left" }}>{invoice.notes ?? "-"}</Typography>
                        </Stack>
                    </Stack>
                ) : (
                    children
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" onClick={onClose}>
                    סגור
                </Button>
            </DialogActions>

        </Dialog>
    );
}
