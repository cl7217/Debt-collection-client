import { useState, useEffect } from "react";
import { getClients } from "../../services/clientsApi"; 
import ClientModal from "./ClientModal";

import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip
} from "@mui/material";

export default function ClientTable() {
    const [clients, setClients] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getClients().then(data => setClients(data));
    }, []);

    const boolToText = (v) => (v ? "כן" : "לא");

    const getActiveStyle = (active) => {
        return active
            ? { bg: "#4caf50", color: "#fff" }
            : { bg: "#d32f2f", color: "#fff" };
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", direction: "rtl" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>מספר לקוח</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>שם</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>איש קשר לחשבוניות</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>טלפון</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>אימייל</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>סטטוס</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{ direction: "rtl" }}>
                        {clients.map(client => {
                            const style = getActiveStyle(client.isActive);

                            return (
                                <TableRow
                                    key={client.id}
                                    hover
                                    onClick={() => setSelected(client)}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <TableCell sx={{ textAlign: "center" }}>{client.id}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{client.name ?? "-"}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{client.invoiceContact ?? "-"}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{client.phone ?? "-"}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{client.email ?? "-"}</TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Chip
                                            label={client.isActive ? "פעיל" : "לא פעיל"}
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
                <ClientModal client={selected} onClose={() => setSelected(null)} />
            )}
        </>
    );
}
