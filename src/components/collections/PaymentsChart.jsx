import { Box } from "@mui/material";
// ניתן להחליף ל-recharts או chart.js
export default function PaymentsChart({ agg }) {
  // agg: { month: { total, paid, count } }
  // דיאגרמה פשוטה (טקסטואלית) — להחליף ל-chart בהמשך
  return (
    <Box sx={{ p:2 }}>
      <strong>דיאגרמת תשלומים (לשדרוג ל-chart):</strong>
      <ul>
        {Object.entries(agg).map(([month, data]) => (
          <li key={month}>{month}: שולם ₪{data.paid} מתוך ₪{data.total}</li>
        ))}
      </ul>
    </Box>
  );
}
