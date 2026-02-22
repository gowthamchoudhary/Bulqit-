import { Supplier, DiscountTier } from '@/types/supplier';

export interface PricingBreakdown {
  productName: string;
  quantity: number;
  individualPrice: number;
  groupPrice: number;
  savings: number;
  savingsPercent: number;
  discountTier: DiscountTier | null;
}

/**
 * Calculate applicable discount tier based on total quantity
 */
function getApplicableTier(
  quantity: number,
  tiers: DiscountTier[]
): DiscountTier | null {
  const sortedTiers = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);

  for (const tier of sortedTiers) {
    if (quantity >= tier.minQuantity && quantity <= tier.maxQuantity) {
      return tier;
    }
  }

  return null;
}

/**
 * Calculate pricing for a product with group buying
 */
export function calculateProductPricing(
  productName: string,
  quantity: number,
  supplier: Supplier
): PricingBreakdown | null {
  const product = supplier.products.find(
    p => p.productName.toLowerCase() === productName.toLowerCase()
  );

  if (!product) return null;

  const individualPrice = product.basePrice;
  const tier = getApplicableTier(quantity, supplier.discountTiers);

  const discountPercent = tier ? tier.discountPercent / 100 : 0;
  const groupPrice = individualPrice * (1 - discountPercent);

  const totalIndividual = individualPrice * quantity;
  const totalGroup = groupPrice * quantity;
  const savings = totalIndividual - totalGroup;
  const savingsPercent = (savings / totalIndividual) * 100;

  return {
    productName,
    quantity,
    individualPrice,
    groupPrice,
    savings,
    savingsPercent,
    discountTier: tier,
  };
}

/**
 * Calculate total order pricing for multiple products
 */
export function calculateOrderPricing(
  products: { name: string; quantity: number }[],
  supplier: Supplier
): {
  items: PricingBreakdown[];
  totalIndividual: number;
  totalGroup: number;
  totalSavings: number;
  totalSavingsPercent: number;
} {
  const items = products
    .map(p => calculateProductPricing(p.name, p.quantity, supplier))
    .filter((item): item is PricingBreakdown => item !== null);

  const totalIndividual = items.reduce((sum, item) => sum + (item.individualPrice * item.quantity), 0);
  const totalGroup = items.reduce((sum, item) => sum + (item.groupPrice * item.quantity), 0);
  const totalSavings = totalIndividual - totalGroup;
  const totalSavingsPercent = (totalSavings / totalIndividual) * 100;

  return {
    items,
    totalIndividual,
    totalGroup,
    totalSavings,
    totalSavingsPercent,
  };
}
