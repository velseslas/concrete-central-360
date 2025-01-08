import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Finance from "./pages/Finance";
import Formulations from "./pages/Formulations";
import Suppliers from "./pages/Suppliers";
import Vehicles from "./pages/Vehicles";
import Orders from "./pages/Orders";
import Production from "./pages/Production";
import Expenses from "./pages/Expenses";
import Payments from "./pages/Payments";
import Invoices from "./pages/Invoices";
import ClientPayments from "./pages/finance/ClientPayments";
import SupplierPayments from "./pages/finance/SupplierPayments";
import Reports from "./pages/finance/Reports";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/formulations" element={<Formulations />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/production" element={<Production />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/finance/payments/clients" element={<ClientPayments />} />
                <Route path="/finance/payments/suppliers" element={<SupplierPayments />} />
                <Route path="/finance/reports" element={<Reports />} />
              </Routes>
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;