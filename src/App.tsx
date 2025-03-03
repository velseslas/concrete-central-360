
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
import Quotes from "./pages/finance/Quotes";
import VehicleRental from "./pages/vehicles/VehicleRental";
import VehicleList from "./pages/vehicles/VehicleList";
import VehicleMaintenance from "./pages/vehicles/VehicleMaintenance";
import VehicleDocuments from "./pages/vehicles/VehicleDocuments";
import { LazyMotion, domAnimation } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Normally you would redirect to login page here
    window.location.href = "/";
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-900">
            <div className="flex">
              <Sidebar />
              <div className="flex-1">
                <Header />
                <main className="p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/clients/production" element={<Production />} />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/formulations" element={<Formulations />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/vehicles/rental" element={<VehicleRental />} />
                    <Route path="/vehicles/list" element={<VehicleList />} />
                    <Route path="/vehicles/maintenance" element={<VehicleMaintenance />} />
                    <Route path="/vehicles/documents" element={<VehicleDocuments />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/finance/payments/clients" element={<ClientPayments />} />
                    <Route path="/finance/payments/suppliers" element={<SupplierPayments />} />
                    <Route path="/finance/reports" element={<Reports />} />
                    <Route path="/finance/quotes" element={<Quotes />} />
                    <Route path="/employees" element={<div className="p-4 bg-gray-800 rounded-lg text-white">Page des employés en construction</div>} />
                    <Route path="/settings" element={<div className="p-4 bg-gray-800 rounded-lg text-white">Page des paramètres en construction</div>} />
                    <Route 
                      path="/logout" 
                      element={
                        <div className="p-4 bg-gray-800 rounded-lg text-white">
                          <button 
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Confirmer la déconnexion
                          </button>
                        </div>
                      } 
                    />
                  </Routes>
                </main>
              </div>
            </div>
            <Toaster />
          </div>
        </BrowserRouter>
      </LazyMotion>
    </QueryClientProvider>
  );
}

export default App;
