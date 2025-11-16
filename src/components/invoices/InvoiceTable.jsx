import { useState, useEffect } from "react";
import { getInvoices } from "../../services/invoicesApi";
import InvoiceModal from "./InvoiceModal";

import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper,Chip
} from "@mui/material";

export default function InvoiceTable() {
    const [invoices, setInvoices] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getInvoices().then(data => setInvoices(data));
    }, []);

    const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('he-IL') : "-";
    const formatAmount = (amt) => amt != null ? `₪${amt.toFixed(2)}` : "₪0.00";
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
        <>
            <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", direction: "rtl" }}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{textAlign:"center"}} >מספר חשבונית</TableCell>
                            <TableCell sx={{textAlign:"center"}}>אתר</TableCell>
                            <TableCell sx={{textAlign:"center"}}>תאריך הנפקה</TableCell>
                            <TableCell sx={{textAlign:"center"}}>תאריך תשלום</TableCell>
                            <TableCell sx={{textAlign:"center"}}>סכום</TableCell>
                            <TableCell sx={{textAlign:"center"}}>סטטוס</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{ direction: "rtl" }}>
                        {invoices.map(inv => {
                            const style = getStatusStyle(inv.status);

                            return (
                                <TableRow
                                    key={inv.id}
                                    hover
                                    onClick={() => setSelected(inv)}
                                    sx={{ cursor: "pointer"}}
                                   
                                >
                                    <TableCell sx={{textAlign:"center"}}>{inv.id}</TableCell>
                                    <TableCell sx={{textAlign:"center"}}>{inv.site?.name ?? "-"}</TableCell>
                                    <TableCell sx={{textAlign:"center"}}>{formatDate(inv.issueDate)}</TableCell>
                                    <TableCell sx={{textAlign:"center"}}>{formatDate(inv.dueDate)}</TableCell>
                                    <TableCell sx={{textAlign:"center"}}>{formatAmount(inv.amount)}</TableCell>

                                    <TableCell sx={{textAlign:"center"}}>
                                        <Chip
                                            label={inv.status ?? "-"}
                                            size="small"
                                            sx={{
                                                backgroundColor: style.bg,
                                                color: style.color,
                                                fontWeight: "bold"
                                            }}
                                        />
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>


                </Table>
            </TableContainer>

            {selected && (
                <InvoiceModal invoice={selected} onClose={() => setSelected(null)} />
            )}
        </>
    );
}
