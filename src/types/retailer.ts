export type StoreType = 'Medical' | 'Kirana' | 'Restaurant' | 'Stationery' | 'Electronics';
export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'ml' | 'kn';

export interface Retailer {
  id: string;
  storeName: string;
  storeType: StoreType;

  // Enhanced verification fields
  gstNumber: string;
  businessRegistrationNumber?: string;
  ownerName: string;
  email: string;

  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: { lat: number; lng: number };
  };

  products: string[];
  monthlyBudget: number;
  phone: string;

  // Verification status
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedAt?: string;

  // Business details
  yearEstablished: number;
  numberOfEmployees: number;
  storeFrontPhoto?: string; // base64 or URL

  joinedDate: string;
  languagePreference?: LanguageCode;
}

export interface MatchResult {
  retailer: Retailer;
  matchScore: number;
  distance: number;
  sharedProducts: string[];
  estimatedSavings: number;
  explanation?: string;
}

export interface BuyingGroup {
  id: string;
  name: string;
  status: 'forming' | 'active' | 'completed';

  // Members
  members: {
    retailerId: string;
    storeName: string;
    joinedAt: string;
  }[];
  targetMembers: number; // optimal group size

  // Products
  products: {
    name: string;
    quantity: number; // total quantity for group
    contributions: { [retailerId: string]: number }; // each member's quantity
  }[];

  // Supplier
  supplierId: string;
  supplierName: string;

  // Pricing
  totalValue: number;
  estimatedSavings: number;
  savingsPercent: number;
  discountTier: {
    minQuantity: number;
    maxQuantity: number;
    discountPercent: number;
  };

  // Dates
  createdDate: string;
  orderDeadline: string;
  frequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
}

export interface GeneratedEmail {
  subject: string;
  body: string;
  qualityScore: number;
  groupName: string;
  totalValue: number;
}

