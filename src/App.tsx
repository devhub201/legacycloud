import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import PlansPage from "./pages/PlansPage";
import VpsPage from "./pages/VpsPage";
import StatusPage from "./pages/StatusPage";
import SupportPage from "./pages/SupportPage";
import DiscordPage from "./pages/DiscordPage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/vps" element={<VpsPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/discord" element={<DiscordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
