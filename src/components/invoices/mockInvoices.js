export const mockInvoices = [
  {
    id: 1,
    site: { name: "אתר דוגמא 1" },
    issueDate: "2024-01-01",
    dueDate: "2024-01-10",
    amount: 500,
    paidAmount: 0,
    paymentDate: null,
    status: "ללא אסמכתא",
    notes: "Mock data 1",
  },
  {
    id: 2,
    site: { name: "אתר דוגמא 2" },
    issueDate: "2024-02-01",
    dueDate: "2024-02-15",
    amount: 750,
    paidAmount: 750,
    paymentDate: "2024-02-14",
    status: "שולם-נכנס לבנק" ,
    notes: "Mock data 2",
  },
];
