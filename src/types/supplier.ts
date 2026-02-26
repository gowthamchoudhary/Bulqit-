import { ProductPricing, DiscountTier } from "./productGroup";

export type { DiscountTier };

export interface SupplierProfile {
  // Basic Info
  id: string;
  companyName: string;
  ownerName: string;
  email: string;
  phone: string;

  // Verification (for real registration)
  gstNumber: string;
  fssaiLicense?: string; // For food suppliers
  tradeLicense: string;
  panNumber: string;
  bankAccountNumber: string;
  ifscCode: string;

  // Business Details
  type: "wholesaler" | "distributor" | "manufacturer";
  establishedYear: number;
  numberOfEmployees: number;
  warehouseAddress: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: { lat: number; lng: number };
  };

  // Verification Status
  verified: boolean;
  verifiedAt?: string;
  verificationDocuments: {
    gstCertificate: string; // URL or base64
    fssaiCertificate?: string;
    tradeLicense: string;
    addressProof: string;
  };

  // Products & Pricing
  products: ProductPricing[];
  discountTiers: DiscountTier[];

  // Operational Details
  deliveryRadius: number;
  minOrderValue: number;
  paymentTerms: string[];
  deliveryDays: string[]; // ['Monday', 'Wednesday', 'Friday']

  // Performance Metrics
  metrics: {
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    fulfillmentRate: number;
    avgDeliveryTime: number;
    qualityScore: number;
    disputeRate: number;
    rating: number;
    totalRevenue: number;
  };

  // AI Insights
  aiPredictions: {
    upcomingDemand: DemandPrediction[];
    seasonalSpikes: SeasonalSpike[];
    revenueforecast: number;
  };

  joinedDate: string;
}

export interface DemandPrediction {
  product: string;
  predictedQuantity: number;
  predictedDate: string;
  confidence: number;
  reasoning: string;
}

export interface SeasonalSpike {
  product: string;
  season: string;
  expectedIncrease: number; // percentage
  suggestedAction: string;
}

export interface OrderRequest {
  id: string;
  groupId: string;
  groupName: string;
  products: { name: string; quantity: number }[];
  totalValue: number;
  requestedDiscount: number;
  status: "pending" | "accepted" | "rejected" | "negotiating";
  requestedAt: string;
  respondBy: string;
  numberOfMembers: number;
}

export interface InvoiceRecord {
  id: string;
  orderId: string;
  groupName: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  invoiceUrl: string;
}

// Keep backward compatibility - export existing interfaces
export interface Supplier {
  id: string;
  name: string;
  type: "wholesaler" | "distributor" | "manufacturer";
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
