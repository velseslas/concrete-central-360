
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ClientForm from "./pages/ClientForm";
import Suppliers from "./pages/Suppliers";
import Finance from "./pages/Finance";
import Invoices from "./pages/Invoices";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Vehicles from "./pages/Vehicles";
import Expenses from "./pages/Expenses";
import Formulations from "./pages/Formulations";
import Production from "./pages/Production";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/client/new" element={<ClientForm />} />
        <Route path="/client/:clientId" element={<ClientForm />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/formulations" element={<Formulations />} />
        <Route path="/production" element={<Production />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
