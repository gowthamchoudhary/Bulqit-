export interface Supplier {
  id: string;
  name: string;
  type: 'wholesaler' | 'distributor' | 'manufacturer';
  verified: boolean;
  rating: number;

  products: ProductPricing[];

  deliveryRadius: number; // km
  minOrderValue: number; // rupees

  discountTiers: DiscountTier[];

  metrics: {
    fulfillmentRate: number;
    avgDeliveryTime: number;
    qualityScore: number;
    disputeRate: number;
    totalOrders: number;
  };

  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
}

export interface ProductPricing {
  productName: string;
  basePrice: number; // per unit
  unit: 'kg' | 'piece' | 'bottle' | 'box' | 'liter';
  moq: number; // minimum order quantity
  available: boolean;
}

export interface DiscountTier {
  minQuantity: number;
  maxQuantity: number;
  discountPercent: number;
}
