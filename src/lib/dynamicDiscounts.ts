import { Supplier, DiscountTier } from '@/types/supplier';

export type SupplierDiscountContext = Pick<Supplier, 'discountTiers'>;

export interface DynamicDiscountResult {
  currentTier: DiscountTier | null;
  currentDiscount: number;
  currentPrice: number;
  nextTier: DiscountTier | null;
  quantityToNextTier: number;
  additionalSavings: number;
  allTiers: TierWithStatus[];
}

export interface TierWithStatus extends DiscountTier {
  isActive: boolean;
  isUnlocked: boolean;
  quantityNeeded: number;
}

/**
 * Calculate dynamic discount based on total quantity
 */
export function calculateDynamicDiscount(
  basePrice: number,
  totalQuantity: number,
  discountTiers: DiscountTier[]
): DynamicDiscountResult {
  // Sort tiers by minQuantity
  const sortedTiers = [...discountTiers].sort((a, b) => a.minQuantity - b.minQuantity);

  // Find current applicable tier
  let currentTier: DiscountTier | null = null;
  for (const tier of sortedTiers) {
    if (totalQuantity >= tier.minQuantity && totalQuantity <= tier.maxQuantity) {
      currentTier = tier;
      break;
    }
  }

  // If no tier applies, use base price (0% discount)
  const currentDiscount = currentTier ? currentTier.discountPercent : 0;
  const currentPrice = basePrice * (1 - currentDiscount / 100);

  // Find next tier
  let nextTier: DiscountTier | null = null;
  for (const tier of sortedTiers) {
    if (tier.minQuantity > totalQuantity) {
      nextTier = tier;
      break;
    }
  }

  // Calculate quantity needed to reach next tier
  const quantityToNextTier = nextTier ? nextTier.minQuantity - totalQuantity : 0;

  // Calculate additional savings if next tier is reached
  const nextTierPrice = nextTier ? basePrice * (1 - nextTier.discountPercent / 100) : currentPrice;
  const additionalSavings = nextTier ? (currentPrice - nextTierPrice) * totalQuantity : 0;

  // Build tier status array
  const allTiers: TierWithStatus[] = sortedTiers.map((tier) => ({
    ...tier,
    isActive: currentTier?.minQuantity === tier.minQuantity,
    isUnlocked: totalQuantity >= tier.minQuantity,
    quantityNeeded: Math.max(0, tier.minQuantity - totalQuantity),
  }));

  return {
    currentTier,
    currentDiscount,
    currentPrice,
    nextTier,
    quantityToNextTier,
    additionalSavings,
    allTiers,
  };
}

/**
 * Calculate what happens if group adds N more members
 */
export function simulateGroupGrowth(
  basePrice: number,
  currentTotalQuantity: number,
  additionalMembers: number,
  avgQuantityPerMember: number,
  discountTiers: DiscountTier[]
): {
  current: DynamicDiscountResult;
  projected: DynamicDiscountResult;
  savingsIncrease: number;
} {
  const current = calculateDynamicDiscount(basePrice, currentTotalQuantity, discountTiers);

  const projectedQuantity = currentTotalQuantity + additionalMembers * avgQuantityPerMember;
  const projected = calculateDynamicDiscount(basePrice, projectedQuantity, discountTiers);

  const savingsIncrease = (current.currentPrice - projected.currentPrice) * currentTotalQuantity;

  return {
    current,
    projected,
    savingsIncrease,
  };
}

/**
 * Get optimal group size for best discount
 */
export function getOptimalGroupSize(
  avgQuantityPerMember: number,
  discountTiers: DiscountTier[]
): number {
  // Find the tier with highest discount
  const bestTier = discountTiers.reduce((best, current) =>
    current.discountPercent > best.discountPercent ? current : best
  );

  // Calculate members needed to reach that tier
  return Math.ceil(bestTier.minQuantity / avgQuantityPerMember);
}
