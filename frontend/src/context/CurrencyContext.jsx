import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LANG_CURRENCY_MAP } from "./LanguageContext";

const CurrencyContext = createContext(null);

const CACHE_KEY = "tourism_currency_rates";
const CACHE_TTL = 60 * 60 * 1000;

const STATIC_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  ETB: 56.5,
  KES: 153,
  CNY: 7.24,
  JPY: 154.5,
};

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  ETB: "Br",
  KES: "KSh",
  CNY: "¥",
  JPY: "¥",
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(
    () => localStorage.getItem("tourism_currency") || "USD"
  );
  const [rates, setRates] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { rates: cachedRates, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) return cachedRates;
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }
    return STATIC_RATES;
  });
  const [loading, setLoading] = useState(false);

  // Listen for language changes and auto-switch to that language's default currency
  useEffect(() => {
    const handler = (e) => {
      const { lang } = e.detail;
      const defaultCurrency = (LANG_CURRENCY_MAP[lang] || ["USD"])[0];
      setCurrency(defaultCurrency);
    };
    window.addEventListener("languageChanged", handler);
    return () => window.removeEventListener("languageChanged", handler);
  }, []);

  // Fetch live rates once
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) return;
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }
    setLoading(true);
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((r) => r.json())
      .then((data) => {
        if (!data.rates) return;
        const filtered = Object.fromEntries(
          Object.keys(STATIC_RATES).map((key) => [
            key,
            data.rates[key] ?? STATIC_RATES[key],
          ])
        );
        setRates(filtered);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ rates: filtered, ts: Date.now() })
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("tourism_currency", currency);
  }, [currency]);

  const value = useMemo(() => {
    const symbol = CURRENCY_SYMBOLS[currency] || "";
    const rate = rates[currency] || 1;

    const convert = (usdAmount) => {
      const num =
        typeof usdAmount === "string"
          ? parseFloat(usdAmount.replace(/[^0-9.]/g, ""))
          : usdAmount;
      if (Number.isNaN(num)) return usdAmount;
      const decimals = currency === "JPY" ? 0 : 2;
      return `${symbol}${(num * rate).toFixed(decimals)}`;
    };

    /** Returns { local: "$120.00", usd: "$120.00" } — always shows USD in parallel */
    const dualDisplay = (usdAmount) => {
      const num =
        typeof usdAmount === "string"
          ? parseFloat(usdAmount.replace(/[^0-9.]/g, ""))
          : usdAmount;
      if (Number.isNaN(num)) return { local: usdAmount, usd: usdAmount };
      const decimals = currency === "JPY" ? 0 : 2;
      const localStr = `${symbol}${(num * rate).toFixed(decimals)}`;
      const usdStr = `$${num.toFixed(2)}`;
      return { local: localStr, usd: usdStr };
    };

    return {
      currency,
      setCurrency,
      convert,
      dualDisplay,
      rates,
      loading,
      currencies: Object.keys(STATIC_RATES),
      symbols: CURRENCY_SYMBOLS,
    };
  }, [currency, rates, loading]);

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
