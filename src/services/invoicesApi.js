import { mockInvoices } from "../mock/mockInvoices";
export async function getInvoices() {
  try {
    const response = await fetch("/api/invoices");

    if (!response.ok) {
      // קריאה לשרת הצליחה אבל סטטוס לא 200
      return mockInvoices;
    }

    return await response.json();

  } catch (error) {
    // אם ה-fetch נכשל (שרת לא רץ/אין חיבור וכו')
    return mockInvoices;
  }
}export async function createInvoice(invoiceData) {
  try {
    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      throw new Error("Failed to create invoice");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null; // או להחזיר אובייקט עם הודעת שגיאה
  }
}

