import { useCurrency } from "../context/CurrencyContext";

export default function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="text-xs font-semibold bg-white/10 text-white border border-white/20 rounded-md px-1.5 py-1 outline-none cursor-pointer hover:bg-white/20 transition-colors appearance-none"
      title="Currency"
    >
      {currencies.map((c) => (
        <option key={c} value={c} className="bg-[#0f1a2c] text-white">
          {c}
        </option>
      ))}
    </select>
  );
}
