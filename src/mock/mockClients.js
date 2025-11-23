export const mockClients = [
    {
        id: 1,
        name: "לקוח א'",
        invoiceContact: "יוסי כהן",
        phone: "050-1234567",
        email: "clientA@test.com",
        regularEmployeeRate: 35,
        professionalEmployeeRate: 55,
        paysBreaks: true,
        isActive: true,
        paymentForecast: 12000,
        agentRate: 5,
        agentName: "ישראל ישראלי",
        agentId: 1,
        sites: [
            { id: 1, name: "אתר מרכזי" },
            { id: 2, name: "מחסן צפוני" }
        ]
    },
    {
        id: 2,
        name: "לקוח ב'",
        invoiceContact: "דוד לוי",
        phone: "052-9876543",
        email: "clientB@test.com",
        regularEmployeeRate: 40,
        professionalEmployeeRate: 60,
        paysBreaks: false,
        isActive: false,
        paymentForecast: 8000,
        agentRate: 6,
        agentName: "משה כהן",
        agentId: 2,
        sites: [
            { id: 3, name: "אתר לוגיסטי" }
        ]
    }
];
