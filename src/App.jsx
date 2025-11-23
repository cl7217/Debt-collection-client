import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoicesPage from "./pages/InvoicesPage";
import ClientsPage from "./pages/ClientsPage";
import CollectionsPage from "./pages/CollectionsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="*" element={<InvoicesPage />} /> {/* ברירת מחדל */}
      </Routes>
    </Router>
  );
}

export default App;
