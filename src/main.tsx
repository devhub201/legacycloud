import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import App from "./App";
import { AuthProvider } from "./lib/auth";
import { CartProvider } from "./lib/cart";
import { CurrencyProvider } from "./lib/currency";
import { SiteProvider } from "./lib/site";
import "./index.css";

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <AuthProvider>
          <SiteProvider>
            <CurrencyProvider>
            <CartProvider>
              <App />
              <Toaster theme="dark" richColors position="top-right" />
            </CartProvider>
          </CurrencyProvider>
          </SiteProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
