import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import Finance from "@/pages/Finance";
import Formulations from "@/pages/Formulations";
import Suppliers from "@/pages/Suppliers";
import Vehicles from "@/pages/Vehicles";
import Orders from "@/pages/Orders";
import Expenses from "@/pages/Expenses";
import Payments from "@/pages/Payments";
import Invoices from "@/pages/Invoices";
import ClientPayments from "@/pages/finance/ClientPayments";
import SupplierPayments from "@/pages/finance/SupplierPayments";
import Quotes from "@/pages/finance/Quotes";
import Billing from "@/pages/finance/Billing";
import Reports from "@/pages/finance/Reports";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <div className="container mx-auto py-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/formulations" element={<Formulations />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/finance/payments/clients" element={<ClientPayments />} />
                <Route path="/finance/payments/suppliers" element={<SupplierPayments />} />
                <Route path="/finance/quotes" element={<Quotes />} />
                <Route path="/finance/billing" element={<Billing />} />
                <Route path="/finance/reports" element={<Reports />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;