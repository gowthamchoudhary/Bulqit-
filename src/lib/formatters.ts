export function formatCurrency(amount: number, lang: string): string {
  return new Intl.NumberFormat(
    lang === 'en' ? 'en-IN' : `${lang}-IN`,
    { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }
  ).format(amount);
}

export function formatNumber(n: number, lang: string): string {
  return new Intl.NumberFormat(lang === 'en' ? 'en-IN' : `${lang}-IN`).format(n);
}
