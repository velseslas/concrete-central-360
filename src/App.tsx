import { Toaster } from "@/components/ui/toaster";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
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
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;