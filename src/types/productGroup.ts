export interface ProductGroup {
  id: string;
  productName: string;
  category: 'Medical' | 'Kirana' | 'Restaurant' | 'Stationery' | 'Electronics';

  // Group status
  status: 'active' | 'ordering' | 'closed';
  currentMembers: number;
  targetMembers: number;
  spotsLeft: number;

  // Pricing
  regularPrice: number; // per unit
  groupPrice: number; // discounted
  discountPercent: number;
  savingsPerOrder: number; // estimated for average member

  // Schedule
  orderFrequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
  nextOrderDate: string; // ISO date
  nextOrderDay: string; // "Monday 9 AM"

  // Supplier
  supplierId: string;
  supplierName: string;
  supplierRating: number;

  // Details
  description: string;
  minQuantity: number; // per member
  unit: string; // "kg", "pieces", etc.

  // Members (just count for now, details later)
  memberIds: string[];

  // Urgency indicators
  isAlmostFull: boolean; // < 5 spots left
  isNewGroup: boolean; // created < 7 days ago
}
