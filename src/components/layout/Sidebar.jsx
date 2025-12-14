import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 200,
        backgroundColor: "#f0f0f0",
        height: "100vh",
        p: 2,
        borderLeft: "1px solid #ddd",
        direction: "rtl"
      }}
    >
      <Stack spacing={2}>
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to="/clients"
        >
          לקוחות
        </Button>

        <Button
          variant="contained"
          fullWidth
          component={Link}
          to="/agents"
        >
          סוכנים
        </Button>

        <Button
          variant="contained"
          fullWidth
          component={Link}
          to="/sites"
        >
          אתרים
        </Button>
      </Stack>
    </Box>
  );
}
