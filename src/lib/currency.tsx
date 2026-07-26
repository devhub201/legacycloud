import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Currency = "INR" | "USD";
const RATE = 83; // 1 USD = 83 INR

type Ctx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (inr: number) => string;
  convert: (inr: number) => number;
  symbol: string;
};

const CurrencyContext = createContext<Ctx>({} as Ctx);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(
    () => (localStorage.getItem("lc-currency") as Currency) || "INR",
  );

  useEffect(() => {
    localStorage.setItem("lc-currency", currency);
  }, [currency]);

  const convert = (inr: number) => (currency === "INR" ? inr : Math.max(0.5, Math.round((inr / RATE) * 100) / 100));

  const format = (inr: number) => {
    const v = convert(inr);
    return currency === "INR" ? `₹${v}` : `$${v.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, format, convert, symbol: currency === "INR" ? "₹" : "$" }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
