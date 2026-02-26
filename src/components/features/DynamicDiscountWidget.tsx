import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { DiscountTier } from '@/types/supplier';
import { calculateDynamicDiscount, simulateGroupGrowth } from '@/lib/dynamicDiscounts';
import {
  TrendingDown,
  TrendingUp,
  Target,
  Zap,
  ChevronRight,
  Lock,
  Unlock,
} from 'lucide-react';

interface DynamicDiscountWidgetProps {
  basePrice: number;
  currentQuantity: number;
  discountTiers: DiscountTier[];
  currentMembers: number;
  avgQuantityPerMember: number;
  unit: string;
}

export function DynamicDiscountWidget({
  basePrice,
  currentQuantity,
  discountTiers,
  currentMembers,
  avgQuantityPerMember,
  unit,
}: DynamicDiscountWidgetProps) {
  const [showSimulation, setShowSimulation] = useState(false);

  const result = calculateDynamicDiscount(basePrice, currentQuantity, discountTiers);
  const simulation = simulateGroupGrowth(
    basePrice,
    currentQuantity,
    3, // Simulate adding 3 more members
    avgQuantityPerMember,
    discountTiers
  );

  const progressToNextTier = result.nextTier
    ? (currentQuantity / result.nextTier.minQuantity) * 100
    : 100;

  return (
    <div className="space-y-4">
      {/* Current Discount Status */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-500">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Current Discount</div>
            <div className="text-4xl font-bold text-green-600">{result.currentDiscount}%</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">You Pay</div>
            <div className="text-3xl font-bold">Rs.{result.currentPrice.toFixed(2)}</div>
            <div className="text-xs text-gray-500">per {unit}</div>
          </div>
        </div>

        {result.currentTier && (
          <div className="flex items-center gap-2 text-sm text-green-700">
            <Unlock className="w-4 h-4" />
            <span>
              Tier {discountTiers.indexOf(result.currentTier) + 1} Unlocked ({result.currentTier.minQuantity} -{' '}
              {result.currentTier.maxQuantity === Infinity ? '∞' : result.currentTier.maxQuantity} {unit})
            </span>
          </div>
        )}
      </Card>

      {/* Next Tier Progress */}
      {result.nextTier && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Next Tier: {result.nextTier.discountPercent}% Off
            </h3>
            <Badge className="bg-blue-500">
              +{result.nextTier.discountPercent - result.currentDiscount}% more
            </Badge>
          </div>

          <Progress value={progressToNextTier} className="h-3 mb-3" />

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Current: {currentQuantity.toLocaleString()} {unit}</span>
            <span className="font-semibold text-blue-600">
              Need: {result.quantityToNextTier.toLocaleString()} more
            </span>
          </div>

          {result.additionalSavings > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-yellow-600" />
                <div>
                  <span className="font-semibold text-yellow-900">
                    Unlock Rs.{result.additionalSavings.toLocaleString()} extra savings
                  </span>
                  <span className="text-yellow-700">
                    {' '}by adding {Math.ceil(result.quantityToNextTier / avgQuantityPerMember)} more members!
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* All Tiers Overview */}
      <Card className="p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5" />
          All Discount Tiers
        </h3>

        <div className="space-y-3">
          {result.allTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${tier.isActive
                  ? 'bg-green-50 border-green-500'
                  : tier.isUnlocked
                    ? 'bg-gray-50 border-gray-300'
                    : 'bg-white border-gray-200 opacity-60'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {tier.isUnlocked ? (
                    <Unlock className="w-5 h-5 text-green-600" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <div className="font-bold">
                      Tier {idx + 1}: {tier.discountPercent}% Discount
                    </div>
                    <div className="text-sm text-gray-600">
                      {tier.minQuantity.toLocaleString()} -{' '}
                      {tier.maxQuantity === Infinity ? '∞' : tier.maxQuantity.toLocaleString()} {unit}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    Rs.{(basePrice * (1 - tier.discountPercent / 100)).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">per {unit}</div>
                </div>
              </div>

              {tier.isActive && (
                <Badge className="bg-green-500">Active</Badge>
              )}

              {!tier.isUnlocked && tier.quantityNeeded > 0 && (
                <div className="text-sm text-gray-600 mt-2">
                  Need {tier.quantityNeeded.toLocaleString()} more {unit}{' '}
                  ({Math.ceil(tier.quantityNeeded / avgQuantityPerMember)} more members)
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Growth Simulation */}
      <Card className="p-6 bg-purple-50 border-2 border-purple-500">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Growth Impact
          </h3>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowSimulation(!showSimulation)}
          >
            {showSimulation ? 'Hide' : 'Show'} Projection
          </Button>
        </div>

        {showSimulation && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Current</div>
                <div className="text-2xl font-bold">{currentMembers}</div>
                <div className="text-xs text-gray-500">members</div>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-purple-500">
                <div className="text-sm text-purple-600 mb-1">With +3 Members</div>
                <div className="text-2xl font-bold text-purple-600">{currentMembers + 3}</div>
                <div className="text-xs text-purple-500">members</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Discount Increase:</span>
                <span className="text-lg font-bold text-purple-600">
                  {simulation.current.currentDiscount}% → {simulation.projected.currentDiscount}%
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Price Per Unit:</span>
                <span className="text-lg font-bold text-green-600">
                  Rs.{simulation.current.currentPrice.toFixed(2)} → Rs.{simulation.projected.currentPrice.toFixed(2)}
                </span>
              </div>
              {simulation.savingsIncrease > 0 && (
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-sm font-semibold">Additional Savings:</span>
                  <span className="text-xl font-bold text-purple-600">
                    +Rs.{simulation.savingsIncrease.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-purple-700 bg-white p-3 rounded-lg">
              <ChevronRight className="w-4 h-4" />
              <span>
                Invite {Math.ceil(simulation.projected.quantityToNextTier / avgQuantityPerMember)} more members
                to unlock the next tier!
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
