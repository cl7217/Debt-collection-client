import { mockInvoices } from "../mock/mockInvoices";
// קבלת חשבוניות לפי לקוח/אתר וטווח חודשים
export async function getCollections({ clientId, siteId, monthsBack = 6 }) {
  try {
    let url = "/api/collections?";
    if (clientId) url += `clientId=${clientId}&`;
    if (siteId) url += `siteId=${siteId}&`;
    url += `monthsBack=${monthsBack}`;
    const response = await fetch(url);
    if (!response.ok) return mockInvoices;
    return await response.json();
  } catch (error) {
    // fallback ל־mock
    return mockInvoices;
  }
}
// אגגרציה חודשית
export function aggregateByMonth(invoices) {
  const result = {};
  invoices.forEach(inv => {
    const month = inv.issueDate?.slice(0,7) || "unknown";
    if (!result[month]) result[month] = { total: 0, paid: 0, count: 0 };
    result[month].total += inv.amount || 0;
    result[month].paid += inv.paidAmount || 0;
    result[month].count++;
  });
  return result;
}
