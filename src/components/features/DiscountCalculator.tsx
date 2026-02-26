import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';
import { calculateDynamicDiscount } from '@/lib/dynamicDiscounts';
import { mockSuppliers } from '@/data/mockSuppliers';

export function DiscountCalculator() {
  const [quantity, setQuantity] = useState(500);
  const [members, setMembers] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState('Paracetamol');

  const supplier = mockSuppliers[0];
  const product = supplier.products.find((p) => p.productName === selectedProduct);

  if (!product) return null;

  const result = calculateDynamicDiscount(
    product.basePrice,
    quantity,
    supplier.discountTiers,
  );

  const quantityPerMember = Math.floor(quantity / members);
  const individualCost = result.currentPrice * quantityPerMember;
  const regularCost = product.basePrice * quantityPerMember;
  const savings = regularCost - individualCost;

  return (
    <Card className="mb-6 border border-black/10 bg-white shadow-sm">
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-[#FFB800]/20 border border-[#FFB800]/40 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-[#7A5800]" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#111111]">Savings Calculator</h3>
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border border-black/10 text-[#555555] bg-[#F0EFED]">
            Quick
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div>
            <Label className="text-xs text-[#555555]">Product</Label>
            <select
              className="w-full mt-1.5 h-9 px-3 border border-black/10 rounded-md text-sm bg-white"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {mockSuppliers[0].products.map((p) => (
                <option key={p.productName} value={p.productName}>
                  {p.productName} (Rs.{p.basePrice}/{p.unit})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="calc-quantity" className="text-xs text-[#555555]">
                Qty ({product.unit})
              </Label>
              <Input
                id="calc-quantity"
                type="number"
                min={100}
                step={50}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-1.5 h-9 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="calc-members" className="text-xs text-[#555555]">
                Members
              </Label>
              <Input
                id="calc-members"
                type="number"
                min={1}
                max={20}
                value={members}
                onChange={(e) => setMembers(Number(e.target.value))}
                className="mt-1.5 h-9 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 mb-3">
          <div className="rounded-lg border border-black/10 bg-[#F8F8F8] p-3">
            <div className="text-[11px] text-[#555555]">Regular / member</div>
            <div className="text-base font-bold text-[#999999] line-through">
              Rs.{regularCost.toLocaleString()}
            </div>
          </div>

          <div className="rounded-lg border border-[#FFB800]/35 bg-[#FFB800]/10 p-3">
            <div className="text-[11px] text-[#7A5800]">Group / member</div>
            <div className="text-base font-bold text-[#111111]">
              Rs.{individualCost.toLocaleString()}
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <div className="text-[11px] text-emerald-700">You Save</div>
            <div className="text-lg font-extrabold text-emerald-700">
              Rs.{savings.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-700">
              {((savings / regularCost) * 100).toFixed(1)}% off
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-[#111111] text-white p-3 mb-2">
          <div className="text-[11px] opacity-80 mb-1">Current Discount Unlocked</div>
          <div className="text-2xl font-extrabold leading-none">{result.currentDiscount}%</div>
          {result.currentTier && (
            <div className="text-[11px] opacity-80 mt-1.5">
              Tier {supplier.discountTiers.indexOf(result.currentTier) + 1}:{' '}
              {result.currentTier.minQuantity}-
              {result.currentTier.maxQuantity === Infinity ? '∞' : result.currentTier.maxQuantity} {product.unit}
            </div>
          )}
        </div>

        {result.nextTier && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
            <span className="font-semibold">Next tier {result.nextTier.discountPercent}%:</span>{' '}
            Add {result.quantityToNextTier.toLocaleString()} {product.unit} (about{' '}
            {Math.ceil(result.quantityToNextTier / quantityPerMember)} members) to save extra Rs.
            {result.additionalSavings.toLocaleString()}.
          </div>
        )}
      </div>
    </Card>
  );
}
