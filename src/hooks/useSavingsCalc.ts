export function calculateSavings(yourValue: number, partnerValue: number) {
  const total = yourValue + partnerValue;
  let discountPercent = 0;
  if (total >= 500000) discountPercent = 22;
  else if (total >= 200000) discountPercent = 18;
  else if (total >= 100000) discountPercent = 15;
  else if (total >= 50000) discountPercent = 10;
  else discountPercent = 5;

  const yourSavings = Math.round(yourValue * (discountPercent / 100));
  const partnerSavings = Math.round(partnerValue * (discountPercent / 100));

  return { total, discountPercent, yourSavings, partnerSavings, totalSavings: yourSavings + partnerSavings };
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}
