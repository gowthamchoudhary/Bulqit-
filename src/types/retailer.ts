export type StoreType = 'Medical' | 'Kirana' | 'Restaurant' | 'Stationery' | 'Electronics';

export interface Retailer {
  id: string;
  storeName: string;
  storeType: StoreType;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  products: string[];
  monthlyBudget: number;
  phone: string;
  joinedDate: string;
}

export interface MatchResult {
  retailer: Retailer;
  matchScore: number;
  distance: number;
  sharedProducts: string[];
  estimatedSavings: number;
}

export interface BuyingGroup {
  id: string;
  name: string;
  categories: string[];
  frequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
  members: string[];
  totalValue: number;
  createdDate: string;
}

export interface GeneratedEmail {
  subject: string;
  body: string;
  qualityScore: number;
  groupName: string;
  totalValue: number;
}
