import { useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import InvoiceTable from "../components/invoices/InvoiceTable";
import InvoiceModal from "../components/invoices/InvoiceModal";
import CreateInvoiceForm from "../components/invoices/CreateInvoiceForm";

export default function InvoicesPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <Container sx={{ mt: 6 ,direction:"rtl", textAlign:"center" }}>
      <Typography variant="h4" gutterBottom>
        חשבוניות
      </Typography>

      

      <InvoiceTable onSelect={(inv) => setSelectedInvoice(inv)} />

      {/* מודאל ליצירת חשבונית */}
      {openCreate && (
        <InvoiceModal onClose={() => setOpenCreate(false)}>
          <CreateInvoiceForm onSuccess={() => setOpenCreate(false)} />
        </InvoiceModal>
      )}

      {/* מודאל להצגת פרטי חשבונית */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreate(true)}
        sx={{ mb: 2 , mt: 4}}
      >
        יצירת חשבונית חדשה
      </Button>
    </Container>
  );
}
