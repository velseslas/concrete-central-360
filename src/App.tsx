import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
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
import Quotes from "./pages/finance/Quotes";
import { LazyMotion, domAnimation } from "framer-motion";

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-900">
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Header />
              <main className="p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/clients/production" element={<Production />} />
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
                  <Route path="/finance/reports" element={<Reports />} />
                  <Route path="/finance/quotes" element={<Quotes />} />
                </Routes>
              </main>
            </div>
          </div>
          <Toaster />
        </div>
      </BrowserRouter>
    </LazyMotion>
  );
}

export default App;