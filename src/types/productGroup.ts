export interface ProductGroup {
  id: string;
  productName: string;
  category: 'Medical' | 'Kirana' | 'Restaurant' | 'Stationery' | 'Electronics';

  // Group status
  status: 'active' | 'confirming' | 'ordering' | 'completed';
  currentMembers: number;
  targetMembers: number;
  spotsLeft: number;

  // Member details (expanded)
  members: GroupMember[];

  // Pricing
  regularPrice: number;
  groupPrice: number;
  discountPercent: number;
  savingsPerOrder: number;

  // Schedule
  orderFrequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
  nextOrderDate: string;
  nextOrderDay: string;

  // Supplier
  supplierId: string;
  supplierName: string;
  supplierRating: number;

  // Details
  description: string;
  minQuantity: number;
  unit: string;

  memberIds: string[];

  // Urgency indicators
  isAlmostFull: boolean;
  isNewGroup: boolean;

  // Advance payment
  requiresAdvancePayment: boolean;
  advancePaymentPercent: number; // e.g., 30% advance
  advancePaymentDeadline?: string;
}

export interface GroupMember {
  id: string;
  retailerId: string;
  storeName: string;
  storeType: string;
  quantity: number; // units they want to order
  totalAmount: number; // total they'll pay
  confirmationStatus: 'pending' | 'confirmed' | 'payment_pending' | 'paid';
  joinedAt: string;
  confirmedAt?: string;
  paidAt?: string;
  advancePaymentAmount?: number;
  advancePaymentPaid?: boolean;
}
