import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import Formulations from "@/pages/Formulations";
import Suppliers from "@/pages/Suppliers";
import Vehicles from "@/pages/Vehicles";
import Expenses from "@/pages/Expenses";
import Production from "@/pages/Production";
import Finance from "@/pages/Finance";
import ClientPayments from "@/pages/finance/ClientPayments";
import SupplierPayments from "@/pages/finance/SupplierPayments";
import Invoices from "@/pages/finance/Invoices";
import Reports from "@/pages/finance/Reports";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/formulations" element={<Formulations />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/production" element={<Production />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/finance/payments/clients" element={<ClientPayments />} />
                <Route path="/finance/payments/suppliers" element={<SupplierPayments />} />
                <Route path="/finance/invoices" element={<Invoices />} />
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