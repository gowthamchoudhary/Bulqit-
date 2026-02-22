import { GeneratedEmail } from '@/types/retailer';

export function generateEmail(
  groupName: string,
  categories: string[],
  totalValue: number,
  memberCount: number
): GeneratedEmail {
  const categoryList = categories.join(', ');
  const formattedValue = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalValue);

  return {
    subject: `Bulk Order Proposal: ${groupName} — ${formattedValue} Monthly Order`,
    body: `Dear Supplier,

We are writing on behalf of "${groupName}", a buying alliance of ${memberCount} verified retailers in Bengaluru. Together, we are consolidating our procurement for ${categoryList} to unlock bulk pricing advantages.

Our combined monthly order value is ${formattedValue}, and we are looking for a reliable supplier who can offer competitive pricing for consistent, high-volume orders.

What we offer:
• Guaranteed monthly order volume of ${formattedValue}
• Timely payments within agreed credit terms
• Long-term partnership commitment from ${memberCount} established retailers
• Single point of coordination for streamlined logistics

What we need from you:
• Best bulk pricing for ${categoryList} categories
• Consistent quality and availability
• Flexible delivery schedule (weekly/bi-weekly)
• Credit terms of 15–30 days

We believe this partnership will be mutually beneficial — you gain a stable, high-volume customer base, and we gain competitive pricing that helps us serve our communities better.

Please share your best quotation at your earliest convenience. We are ready to start a trial order within the next week.

Looking forward to a fruitful partnership.

Warm regards,
${groupName}
Bengaluru Retailers Alliance
Contact: bulkbridge@retailers.in`,
    qualityScore: +(8.5 + Math.random() * 1.3).toFixed(1),
    groupName,
    totalValue,
  };
}
