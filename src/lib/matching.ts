import { Retailer, MatchResult } from "@/types/retailer";

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal
}

/**
 * Calculate match score between two retailers
 * Returns score from 0-100
 */
function calculateMatchScore(
  currentRetailer: Retailer,
  otherRetailer: Retailer,
  distance: number,
): number {
  // 1. Product overlap (40% weight)
  const currentProducts = currentRetailer.products.map((p) => p.toLowerCase());
  const otherProducts = otherRetailer.products.map((p) => p.toLowerCase());

  const sharedProducts = currentProducts.filter((p) =>
    otherProducts.includes(p),
  );
  const allProducts = [...new Set([...currentProducts, ...otherProducts])];

  const productOverlapScore = (sharedProducts.length / allProducts.length) * 40;

  // 2. Geographic proximity (30% weight)
  const maxDistance = 5; // 5km max
  const distanceScore = Math.max(0, 1 - distance / maxDistance) * 30;

  // 3. Budget similarity (20% weight)
  const budgetRatio =
    Math.min(currentRetailer.monthlyBudget, otherRetailer.monthlyBudget) /
    Math.max(currentRetailer.monthlyBudget, otherRetailer.monthlyBudget);
  const budgetScore = budgetRatio * 20;

  // 4. Same store type bonus (10% weight)
  const storeTypeBonus =
    currentRetailer.storeType === otherRetailer.storeType ? 10 : 5;

  const totalScore =
    productOverlapScore + distanceScore + budgetScore + storeTypeBonus;

  return Math.round(totalScore);
}

/**
 * Generate explanation for why retailers matched
 */
function generateMatchExplanation(
  sharedProducts: string[],
  distance: number,
  sameType: boolean,
): string {
  const reasons: string[] = [];

  if (sharedProducts.length > 0) {
    reasons.push(`${sharedProducts.length} products in common`);
  }

  if (distance < 2) {
    reasons.push(`very close (${distance}km)`);
  } else if (distance < 5) {
    reasons.push(`nearby (${distance}km)`);
  }

  if (sameType) {
    reasons.push("same business type");
  }

  return reasons.join(" • ");
}

/**
 * Find matching retailers for bulk buying
 */
export function findMatches(
  currentRetailer: Retailer,
  allRetailers: Retailer[],
): MatchResult[] {
  // Filter out current retailer
  const otherRetailers = allRetailers.filter(
    (r) => r.id !== currentRetailer.id,
  );

  const matches: MatchResult[] = otherRetailers.map((retailer) => {
    // Calculate distance
    const distance = calculateDistance(
      currentRetailer.location.coordinates.lat,
      currentRetailer.location.coordinates.lng,
      retailer.location.coordinates.lat,
      retailer.location.coordinates.lng,
    );

    // Find shared products
    const currentProducts = currentRetailer.products.map((p) =>
      p.toLowerCase(),
    );
    const otherProducts = retailer.products.map((p) => p.toLowerCase());
    const sharedProducts = retailer.products.filter((p) =>
      currentProducts.includes(p.toLowerCase()),
    );

    // Calculate match score
    const matchScore = calculateMatchScore(currentRetailer, retailer, distance);

    // Estimate monthly savings (15-18% based on match score)
    const savingsPercent = 0.15 + (matchScore / 100) * 0.03;
    const estimatedSavings = Math.round(
      currentRetailer.monthlyBudget * savingsPercent,
    );

    // Generate explanation
    const explanation = generateMatchExplanation(
      sharedProducts,
      distance,
      currentRetailer.storeType === retailer.storeType,
    );

    return {
      retailer,
      matchScore,
      distance,
      sharedProducts,
      estimatedSavings,
      explanation,
    };
  });

  // Sort by match score (highest first) and return top matches
  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .filter((m) => m.matchScore > 30) // Only show decent matches
    .slice(0, 8); // Top 8 matches
}
