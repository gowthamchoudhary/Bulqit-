import { BuyingGroup } from '@/types/retailer';
import { Supplier, DiscountTier } from '@/types/supplier';
import { mockSuppliers } from '@/data/mockSuppliers';

/**
 * Calculate optimal group size based on discount tiers
 */
function calculateOptimalGroupSize(
  productQuantityPerMember: number,
  supplier: Supplier
): number {
  const tiers = supplier.discountTiers;

  // Find the best tier (highest discount)
  const bestTier = tiers.reduce((best, current) =>
    current.discountPercent > best.discountPercent ? current : best
  );

  // Calculate members needed to reach best tier
  const membersNeeded = Math.ceil(bestTier.minQuantity / productQuantityPerMember);

  // Cap at reasonable group size (max 10 members)
  return Math.min(membersNeeded, 10);
}

/**
 * Find best supplier for a product
 */
function findBestSupplier(
  productName: string,
  totalQuantity: number
): Supplier | null {
  const suppliersWithProduct = mockSuppliers.filter(supplier =>
    supplier.products.some(
      p => p.productName.toLowerCase() === productName.toLowerCase() && p.available
    )
  );

  if (suppliersWithProduct.length === 0) return null;

  // Score suppliers based on: rating + discount potential
  const scoredSuppliers = suppliersWithProduct.map(supplier => {
    const product = supplier.products.find(
      p => p.productName.toLowerCase() === productName.toLowerCase()
    )!;

    // Find applicable tier
    let discountPercent = 0;
    for (const tier of supplier.discountTiers) {
      if (totalQuantity >= tier.minQuantity && totalQuantity <= tier.maxQuantity) {
        discountPercent = tier.discountPercent;
        break;
      }
    }

    // Score = rating weight + discount weight
    const score = (supplier.rating / 5) * 0.4 + (discountPercent / 100) * 0.6;

    return { supplier, score, discountPercent };
  });

  // Return supplier with highest score
  scoredSuppliers.sort((a, b) => b.score - a.score);
  return scoredSuppliers[0].supplier;
}

/**
 * Create a new buying group
 */
export function createBuyingGroup(params: {
  groupName: string;
  initiatorId: string;
  initiatorStoreName: string;
  products: { name: string; quantity: number }[];
  partnerIds: string[];
  partnerStoreNames: string[];
  frequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
}): BuyingGroup | null {
  const {
    groupName,
    initiatorId,
    initiatorStoreName,
    products,
    partnerIds,
    partnerStoreNames,
    frequency
  } = params;

  // Calculate total quantity for first product (to find supplier)
  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);

  // Find best supplier
  const supplier = findBestSupplier(products[0].name, totalQuantity);
  if (!supplier) return null;

  // Get applicable discount tier
  let applicableTier: DiscountTier | null = null;
  for (const tier of supplier.discountTiers) {
    if (totalQuantity >= tier.minQuantity && totalQuantity <= tier.maxQuantity) {
      applicableTier = tier;
      break;
    }
  }

  if (!applicableTier) {
    applicableTier = supplier.discountTiers[0]; // Default to first tier
  }

  // Calculate pricing
  const totalValue = products.reduce((sum, product) => {
    const supplierProduct = supplier.products.find(
      p => p.productName.toLowerCase() === product.name.toLowerCase()
    );
    if (!supplierProduct) return sum;

    const discountedPrice = supplierProduct.basePrice * (1 - applicableTier!.discountPercent / 100);
    return sum + (discountedPrice * product.quantity);
  }, 0);

  const totalValueWithoutDiscount = products.reduce((sum, product) => {
    const supplierProduct = supplier.products.find(
      p => p.productName.toLowerCase() === product.name.toLowerCase()
    );
    if (!supplierProduct) return sum;
    return sum + (supplierProduct.basePrice * product.quantity);
  }, 0);

  const estimatedSavings = totalValueWithoutDiscount - totalValue;
  const savingsPercent = (estimatedSavings / totalValueWithoutDiscount) * 100;

  // Build members array
  const members = [
    {
      retailerId: initiatorId,
      storeName: initiatorStoreName,
      joinedAt: new Date().toISOString(),
    },
    ...partnerIds.map((id, index) => ({
      retailerId: id,
      storeName: partnerStoreNames[index],
      joinedAt: new Date().toISOString(),
    })),
  ];

  // Calculate contributions (split evenly for now)
  const contributions: { [key: string]: number } = {};
  const perMemberQuantity = Math.floor(totalQuantity / members.length);

  members.forEach(member => {
    contributions[member.retailerId] = perMemberQuantity;
  });

  // Calculate order deadline based on frequency
  const daysToDeadline = frequency === 'Weekly' ? 7 : frequency === 'Bi-weekly' ? 14 : 30;
  const orderDeadline = new Date();
  orderDeadline.setDate(orderDeadline.getDate() + daysToDeadline);

  // Calculate optimal target members
  const avgQuantityPerMember = totalQuantity / members.length;
  const targetMembers = calculateOptimalGroupSize(avgQuantityPerMember, supplier);

  return {
    id: `grp_${Date.now()}`,
    name: groupName,
    status: 'forming',

    members,
    targetMembers,

    products: products.map(p => ({
      name: p.name,
      quantity: p.quantity,
      contributions,
    })),

    supplierId: supplier.id,
    supplierName: supplier.name,

    totalValue,
    estimatedSavings,
    savingsPercent,
    discountTier: applicableTier,

    createdDate: new Date().toISOString(),
    orderDeadline: orderDeadline.toISOString(),
    frequency,
  };
}

/**
 * Add member to existing group
 */
export function addMemberToGroup(
  group: BuyingGroup,
  retailerId: string,
  storeName: string,
  contributionQuantity: number
): BuyingGroup {
  const updatedMembers = [
    ...group.members,
    {
      retailerId,
      storeName,
      joinedAt: new Date().toISOString(),
    },
  ];

  // Update contributions
  const updatedProducts = group.products.map(product => ({
    ...product,
    quantity: product.quantity + contributionQuantity,
    contributions: {
      ...product.contributions,
      [retailerId]: contributionQuantity,
    },
  }));

  // Recalculate total value and savings
  const supplier = mockSuppliers.find(s => s.id === group.supplierId)!;
  const totalQuantity = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);

  // Get new applicable tier
  let newTier = group.discountTier;
  for (const tier of supplier.discountTiers) {
    if (totalQuantity >= tier.minQuantity && totalQuantity <= tier.maxQuantity) {
      newTier = tier;
      break;
    }
  }

  return {
    ...group,
    members: updatedMembers,
    products: updatedProducts,
    discountTier: newTier,
    // Recalculate pricing here if tier changed
  };
}

/**
 * Check if group is ready to order
 */
export function isGroupReadyToOrder(group: BuyingGroup): boolean {
  return group.members.length >= group.targetMembers;
}

/**
 * Get group status message
 */
export function getGroupStatusMessage(group: BuyingGroup): string {
  const spotsLeft = group.targetMembers - group.members.length;

  if (spotsLeft <= 0) {
    return `✅ Group is full! Ready to order.`;
  }

  if (spotsLeft === 1) {
    return `🔥 Only 1 spot left to unlock best price!`;
  }

  return `${spotsLeft} more members needed for optimal discount`;
}
