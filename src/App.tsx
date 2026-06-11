import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import PlansPage from "./pages/PlansPage";
import VpsPage from "./pages/VpsPage";
import StatusPage from "./pages/StatusPage";
import SupportPage from "./pages/SupportPage";
import DiscordPage from "./pages/DiscordPage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import OffersPage from "./pages/OffersPage";
import KnowledgebasePage from "./pages/KnowledgebasePage";
import KbArticlePage from "./pages/KbArticlePage";
import NotFound from "./pages/NotFound";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

import DashboardHome from "./pages/dashboard/DashboardHome";
import MyServicesPage from "./pages/dashboard/MyServicesPage";
import MyVpsPage from "./pages/dashboard/MyVpsPage";
import CartPage from "./pages/dashboard/CartPage";
import CheckoutPage from "./pages/dashboard/CheckoutPage";
import InvoicesPage from "./pages/dashboard/InvoicesPage";
import InvoiceDetailPage from "./pages/dashboard/InvoiceDetailPage";
import BillingPage from "./pages/dashboard/BillingPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import TicketsPage from "./pages/dashboard/TicketsPage";
import TicketDetailPage from "./pages/dashboard/TicketDetailPage";
import RewardsPage from "./pages/dashboard/RewardsPage";
import RenewPage from "./pages/dashboard/RenewPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminServices from "./pages/admin/AdminServices";
import AdminPromoCodes from "./pages/admin/AdminPromoCodes";
import AdminKb from "./pages/admin/AdminKb";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminReviews from "./pages/admin/AdminReviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/vps" element={<VpsPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/discord" element={<DiscordPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/knowledgebase" element={<KnowledgebasePage />} />
            <Route path="/kb/:slug" element={<KbArticlePage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth" element={<Navigate to="/login" replace />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Client Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
            <Route path="/dashboard/services" element={<ProtectedRoute><MyServicesPage /></ProtectedRoute>} />
            <Route path="/dashboard/vps" element={<ProtectedRoute><MyVpsPage /></ProtectedRoute>} />
            <Route path="/dashboard/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/dashboard/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/dashboard/invoices" element={<ProtectedRoute><InvoicesPage /></ProtectedRoute>} />
            <Route path="/dashboard/invoices/:id" element={<ProtectedRoute><InvoiceDetailPage /></ProtectedRoute>} />
            <Route path="/dashboard/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/dashboard/tickets" element={<ProtectedRoute><TicketsPage /></ProtectedRoute>} />
            <Route path="/dashboard/tickets/:id" element={<ProtectedRoute><TicketDetailPage /></ProtectedRoute>} />
            <Route path="/dashboard/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
            <Route path="/dashboard/renew/:serviceId" element={<ProtectedRoute><RenewPage /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute adminOnly><AdminServices /></ProtectedRoute>} />
            <Route path="/admin/promo-codes" element={<ProtectedRoute adminOnly><AdminPromoCodes /></ProtectedRoute>} />
            <Route path="/admin/knowledgebase" element={<ProtectedRoute adminOnly><AdminKb /></ProtectedRoute>} />
            <Route path="/admin/tickets" element={<ProtectedRoute adminOnly><AdminTickets /></ProtectedRoute>} />
            <Route path="/admin/invoices" element={<ProtectedRoute adminOnly><AdminInvoices /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute adminOnly><AdminReviews /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
