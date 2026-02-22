import { describe, it, expect } from 'vitest';
import { mockSuppliers } from '@/data/mockSuppliers';
import { calculateProductPricing } from '@/lib/pricingCalculator';

describe('pricing calculator', () => {
  it('applies 18% discount for Paracetamol at quantity 1000', () => {
    const medPlus = mockSuppliers[0];
    const pricing = calculateProductPricing('Paracetamol', 1000, medPlus);

    expect(pricing).not.toBeNull();
    expect(pricing?.discountTier?.discountPercent).toBe(18);
    expect(pricing?.groupPrice).toBeCloseTo(2.05, 2);
    expect(pricing?.savingsPercent).toBeCloseTo(18, 5);
  });
});
