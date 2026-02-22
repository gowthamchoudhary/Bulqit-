import { describe, it, expect } from 'vitest';
import { createBuyingGroup } from '@/lib/groupFormation';

describe('group formation', () => {
  it('creates group with 3 members, discount tier, and savings', () => {
    const testGroup = createBuyingGroup({
      groupName: 'Jayanagar Medical Alliance',
      initiatorId: 'r1',
      initiatorStoreName: 'Rajesh Medical Store',
      products: [
        { name: 'Paracetamol', quantity: 500 },
        { name: 'Cough Syrup', quantity: 100 },
      ],
      partnerIds: ['r3', 'r8'],
      partnerStoreNames: ['Gupta Pharmacy', 'Meena Medical Agency'],
      frequency: 'Bi-weekly',
    });

    expect(testGroup).not.toBeNull();
    expect(testGroup?.members).toHaveLength(3);
    expect(testGroup?.discountTier).toBeTruthy();
    expect(testGroup?.estimatedSavings ?? 0).toBeGreaterThan(0);
    expect(testGroup?.savingsPercent ?? 0).toBeGreaterThan(0);
  });
});
