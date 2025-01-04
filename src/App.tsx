import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Formulations from "./pages/Formulations";
import Orders from "./pages/Orders";
import Clients from "./pages/Clients";
import Suppliers from "./pages/Suppliers";
import Vehicles from "./pages/Vehicles";
import Expenses from "./pages/Expenses";
import Production from "./pages/Production";
import Consumables from "./pages/Consumables";
import Invoices from "./pages/Invoices";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/formulations" element={<Formulations />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/vehicles" element={<Vehicles />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/production" element={<Production />} />
                  <Route path="/consumables" element={<Consumables />} />
                  <Route path="/invoices" element={<Invoices />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
      <Sonner />
    </QueryClientProvider>
  );
}

export default App;