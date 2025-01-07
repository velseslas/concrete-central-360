import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Finance from "./pages/Finance";
import Payments from "./pages/Payments";
import Orders from "./pages/Orders";
import Production from "./pages/Production";
import Suppliers from "./pages/Suppliers";
import Vehicles from "./pages/Vehicles";
import Expenses from "./pages/Expenses";
import Formulations from "./pages/Formulations";
import Invoices from "./pages/Invoices";
import ClientPayments from "./pages/finance/ClientPayments";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/finance/payments/clients" element={<ClientPayments />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/production" element={<Production />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/formulations" element={<Formulations />} />
              <Route path="/invoices" element={<Invoices />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;