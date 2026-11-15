import { useStore } from "../store/useStore";

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

// يرجّع رمز العملة اللي المستخدم كاتبه في الإعدادات
export const useCurrency = () =>
  useStore((s) => s.settings.languageAndCurrency?.currency)?.trim() || "";

// صيغة موحّدة لأي مبلغ في الموقع: 1,250 SIL
export const formatMoney = (value, currency = "") => {
  const num = Number(value) || 0;
  return `${numberFormat.format(num)}${currency ? ` ${currency}` : ""}`;
};

export const useFormatMoney = () => {
  const currency = useCurrency();
  return (value) => formatMoney(value, currency);
};
