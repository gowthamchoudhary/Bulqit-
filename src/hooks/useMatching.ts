import { mockRetailers } from '@/data/mockRetailers';
import { Retailer, MatchResult } from '@/types/retailer';

export function useMatching(currentUser: Retailer | null) {
  if (!currentUser) return [];

  const matches: MatchResult[] = mockRetailers
    .filter((r) => r.id !== currentUser.id)
    .map((retailer) => {
      const shared = retailer.products.filter((p) =>
        currentUser.products.some((cp) => cp.toLowerCase() === p.toLowerCase())
      );
      const sameType = retailer.storeType === currentUser.storeType;
      const matchScore = Math.min(
        98,
        Math.round(
          (shared.length / Math.max(currentUser.products.length, 1)) * 60 +
            (sameType ? 25 : 10) +
            Math.random() * 10
        )
      );
      const distance = +(Math.random() * 5 + 0.5).toFixed(1);
      const estimatedSavings = Math.round(
        currentUser.monthlyBudget * (matchScore / 100) * 0.18
      );

      return { retailer, matchScore, distance, sharedProducts: shared, estimatedSavings };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);

  return matches;
}
