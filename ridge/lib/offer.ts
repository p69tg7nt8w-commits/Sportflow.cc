export const OFFER = {
  name: process.env.OFFER_NAME || "Formation Revente Hors-Piste",
  priceCents: Number(process.env.OFFER_PRICE_CENTS || 6700),
  compareAtCents: Number(process.env.OFFER_COMPARE_AT_CENTS || 9700),
  currency: (process.env.OFFER_CURRENCY || "eur").toLowerCase(),
};

export function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
