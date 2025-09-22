import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { muiTheme } from './theme/muiTheme';
import Index from "./pages/Index";
import Comprar from "./pages/Comprar";
import TestDrive from "./pages/TestDrive";
import Login from "./pages/Login";
import CarDetails from "./pages/CarDetails";
import Favoritos from "./pages/Favoritos";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/comprar" element={<Comprar />} />
            <Route path="/test-drive" element={<TestDrive />} />
            <Route path="/login" element={<Login />} />
            <Route path="/car-details/:id" element={<CarDetails />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
