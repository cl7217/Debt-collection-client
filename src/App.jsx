import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";

import Sidebar from "./components/layout/Sidebar";

import ClientsPage from "./pages/ClientsPage";
import AgentsPage from "./pages/AgentsPage";

export default function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        
        {/* Sidebar בצד ימין בגלל RTL */}
        <Sidebar />

        {/* תוכן הדפים */}
        <Container maxWidth="lg" sx={{ mt: 5, p: 3 }}>
          <Routes>
            <Route path="/" element={<ClientsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/agents" element={<AgentsPage />} />
          </Routes>
        </Container>

      </Box>
    </Router>
  );
}
