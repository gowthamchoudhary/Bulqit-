import { Retailer, MatchResult } from '@/types/retailer';

/**
 * Calculate distance using Haversine formula
 */
function calculateDistance(
  lat1: number, lng1: number, lat2: number, lng2: number,
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Simple product-overlap matching (no external ML dependency)
 */
export async function findAIMatches(
  currentRetailer: Retailer,
  allRetailers: Retailer[],
): Promise<MatchResult[]> {
  const matches: MatchResult[] = [];

  for (const retailer of allRetailers) {
    if (retailer.id === currentRetailer.id) continue;

    const distance = calculateDistance(
      currentRetailer.location.coordinates.lat, currentRetailer.location.coordinates.lng,
      retailer.location.coordinates.lat, retailer.location.coordinates.lng,
    );
    if (distance > 10) continue;

    const sharedProducts = retailer.products.filter((p) =>
      currentRetailer.products.some((cp) => cp.toLowerCase() === p.toLowerCase()),
    );

    const productScore = (sharedProducts.length / Math.max(currentRetailer.products.length, retailer.products.length)) * 40;
    const distanceScore = Math.max(0, 1 - distance / 10) * 30;
    const budgetRatio = Math.min(currentRetailer.monthlyBudget, retailer.monthlyBudget) /
      Math.max(currentRetailer.monthlyBudget, retailer.monthlyBudget);
    const budgetScore = budgetRatio * 20;
    const typeBonus = currentRetailer.storeType === retailer.storeType ? 10 : 5;

    const matchScore = Math.round(productScore + distanceScore + budgetScore + typeBonus);
    const savingsPercent = 0.15 + (matchScore / 100) * 0.05;
    const estimatedSavings = Math.round(currentRetailer.monthlyBudget * savingsPercent);

    matches.push({
      retailer, matchScore, distance, sharedProducts, estimatedSavings,
      explanation: `${sharedProducts.length} products in common | ${distance}km away`,
    });
  }

  return matches.sort((a, b) => b.matchScore - a.matchScore).filter((m) => m.matchScore > 40).slice(0, 10);
}
