import { MatchResult } from '@/types/retailer';
import { MapPin, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/hooks/useSavingsCalc';

interface Props {
  match: MatchResult;
  onStartGroup: () => void;
}

export default function RetailerCard({ match, onStartGroup }: Props) {
  const { retailer, matchScore, distance, sharedProducts, estimatedSavings } = match;

  const scoreColor =
    matchScore >= 80 ? 'bg-primary' : matchScore >= 60 ? 'bg-warning' : 'bg-secondary';

  return (
    <div className="group rounded-xl border border-border bg-card p-5 hover-lift cursor-default">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-card-foreground">{retailer.storeName}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
            <MapPin className="h-3.5 w-3.5" />
            {retailer.location.address} · {distance}km
          </div>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {retailer.storeType}
        </span>
      </div>

      {/* Match score bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Match Score</span>
          <span className="font-semibold">{matchScore}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${scoreColor}`}
            style={{ width: `${matchScore}%` }}
          />
        </div>
      </div>

      {/* Shared products */}
      <div className="mb-3">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1.5">
          <ShoppingBag className="h-3.5 w-3.5" />
          Shared Products
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sharedProducts.slice(0, 4).map((p) => (
            <span key={p} className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
              {p}
            </span>
          ))}
          {sharedProducts.length > 4 && (
            <span className="text-xs text-muted-foreground">+{sharedProducts.length - 4} more</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <span className="text-xs text-muted-foreground">Est. Savings</span>
          <p className="font-semibold text-primary">{formatCurrency(estimatedSavings)}/mo</p>
        </div>
        <button
          onClick={onStartGroup}
          className="rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground btn-scale"
        >
          Start Group
        </button>
      </div>
    </div>
  );
}
