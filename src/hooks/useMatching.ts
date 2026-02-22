import { useEffect, useState } from 'react';
import { mockRetailers } from '@/data/mockRetailers';
import { Retailer, MatchResult } from '@/types/retailer';
import { findAIMatches } from '@/lib/aiMatching';

type UseMatchingResult = {
  matches: MatchResult[];
  loading: boolean;
  error: string | null;
};

export function useMatching(currentUser: Retailer | null): UseMatchingResult {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!currentUser) {
        setMatches([]);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await findAIMatches(currentUser, mockRetailers);
        if (!cancelled) setMatches(result);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to run AI matching');
          setMatches([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  return { matches, loading, error };
}
