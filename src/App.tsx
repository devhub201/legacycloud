import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Minecraft from "@/pages/Minecraft";
import Vps from "@/pages/Vps";
import Status from "@/pages/Status";
import Support from "@/pages/Support";
import About from "@/pages/About";
import Tos from "@/pages/Tos";
import Privacy from "@/pages/Privacy";
import Cart from "@/pages/Cart";
import Billing from "@/pages/Billing";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
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

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/minecraft" element={<Minecraft />} />
        <Route path="/vps" element={<Vps />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<AdminOverview />} />
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
