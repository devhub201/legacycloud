import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import CategoryPage from "@/pages/Category";
import Status from "@/pages/Status";
import Support from "@/pages/Support";
import About from "@/pages/About";
import Tos from "@/pages/Tos";
import Privacy from "@/pages/Privacy";
import Cart from "@/pages/Cart";
import Billing from "@/pages/Billing";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Features from "@/pages/Features";
import Faq from "@/pages/Faq";
import Careers from "@/pages/Careers";
import AuthPage from "@/pages/Auth";
import FreePanel from "@/pages/FreePanel";
import RequireAdmin from "@/components/RequireAdmin";
import AdminShell from "@/components/admin/AdminShell";
import AdminOverview from "@/pages/admin/Overview";
import AdminOrders from "@/pages/admin/Orders";
import AdminServices from "@/pages/admin/Services";
import AdminCustomers from "@/pages/admin/Customers";
import AdminNodes from "@/pages/admin/Nodes";
import AdminTickets from "@/pages/admin/Tickets";
import AdminStaff from "@/pages/admin/Staff";
import AdminSettings from "@/pages/admin/Settings";
import AdminAi from "@/pages/admin/Ai";
import AdminCatalog from "@/pages/admin/Catalog";
import AdminContent from "@/pages/admin/Content";
import AdminAppearance from "@/pages/admin/Appearance";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/hosting/:slug" element={<CategoryPage />} />
        <Route path="/minecraft" element={<Navigate to="/hosting/minecraft-budget" replace />} />
        <Route path="/vps" element={<Navigate to="/hosting/vps-budget" replace />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/features" element={<Features />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<RequireAdmin><AdminShell /></RequireAdmin>}>
          <Route index element={<AdminOverview />} />
          <Route path="catalog" element={<AdminCatalog />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="appearance" element={<AdminAppearance />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="nodes" element={<AdminNodes />} />
          <Route path="tickets" element={<AdminTickets />} />
          <Route path="staff" element={<AdminStaff />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="ai" element={<AdminAi />} />
        </Route>
        <Route path="/status" element={<Status />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
