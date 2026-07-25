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
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/minecraft" element={<Minecraft />} />
        <Route path="/vps" element={<Vps />} />
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
