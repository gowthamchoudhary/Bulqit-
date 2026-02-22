import { Supplier } from '@/types/supplier';

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup_001',
    name: 'MedPlus Wholesale',
    type: 'wholesaler',
    verified: true,
    rating: 4.8,

    products: [
      { productName: 'Paracetamol', basePrice: 2.5, unit: 'piece', moq: 100, available: true },
      { productName: 'Cough Syrup', basePrice: 85, unit: 'bottle', moq: 20, available: true },
      { productName: 'Bandages', basePrice: 15, unit: 'box', moq: 50, available: true },
      { productName: 'Antiseptic Cream', basePrice: 45, unit: 'piece', moq: 30, available: true },
      { productName: 'Vitamins', basePrice: 120, unit: 'bottle', moq: 20, available: true },
      { productName: 'First Aid Kit', basePrice: 250, unit: 'piece', moq: 10, available: true },
      { productName: 'Sanitizer', basePrice: 75, unit: 'bottle', moq: 50, available: true },
      { productName: 'Thermometer', basePrice: 180, unit: 'piece', moq: 20, available: true },
    ],

    discountTiers: [
      { minQuantity: 500, maxQuantity: 999, discountPercent: 12 },
      { minQuantity: 1000, maxQuantity: 4999, discountPercent: 18 },
      { minQuantity: 5000, maxQuantity: Infinity, discountPercent: 25 },
    ],

    deliveryRadius: 15,
    minOrderValue: 5000,

    metrics: {
      fulfillmentRate: 97,
      avgDeliveryTime: 24,
      qualityScore: 4.7,
      disputeRate: 1.2,
      totalOrders: 1247,
    },

    location: {
      address: 'Plot 45, Industrial Area, HSR Layout, Bengaluru - 560102',
      coordinates: { lat: 12.9121, lng: 77.6446 },
    },
  },

  {
    id: 'sup_002',
    name: 'Karnataka Grains & Co.',
    type: 'manufacturer',
    verified: true,
    rating: 4.6,

    products: [
      { productName: 'Rice', basePrice: 45, unit: 'kg', moq: 50, available: true },
      { productName: 'Wheat Flour', basePrice: 35, unit: 'kg', moq: 100, available: true },
      { productName: 'Sugar', basePrice: 42, unit: 'kg', moq: 50, available: true },
      { productName: 'Dal', basePrice: 85, unit: 'kg', moq: 25, available: true },
      { productName: 'Tea', basePrice: 320, unit: 'kg', moq: 10, available: true },
    ],

    discountTiers: [
      { minQuantity: 200, maxQuantity: 499, discountPercent: 10 },
      { minQuantity: 500, maxQuantity: 999, discountPercent: 15 },
      { minQuantity: 1000, maxQuantity: Infinity, discountPercent: 22 },
    ],

    deliveryRadius: 20,
    minOrderValue: 3000,

    metrics: {
      fulfillmentRate: 95,
      avgDeliveryTime: 36,
      qualityScore: 4.5,
      disputeRate: 2.1,
      totalOrders: 892,
    },

    location: {
      address: 'Factory Road, Yeshwanthpur Industrial Area, Bengaluru - 560022',
      coordinates: { lat: 13.0281, lng: 77.5385 },
    },
  },

  {
    id: 'sup_003',
    name: 'Fresh Spice Distributors',
    type: 'distributor',
    verified: true,
    rating: 4.7,

    products: [
      { productName: 'Spices', basePrice: 250, unit: 'kg', moq: 10, available: true },
      { productName: 'Cooking Oil', basePrice: 150, unit: 'liter', moq: 20, available: true },
      { productName: 'Vegetables', basePrice: 30, unit: 'kg', moq: 50, available: false },
      { productName: 'Lentils', basePrice: 90, unit: 'kg', moq: 25, available: true },
      { productName: 'Flour', basePrice: 38, unit: 'kg', moq: 50, available: true },
    ],

    discountTiers: [
      { minQuantity: 100, maxQuantity: 299, discountPercent: 8 },
      { minQuantity: 300, maxQuantity: 699, discountPercent: 14 },
      { minQuantity: 700, maxQuantity: Infinity, discountPercent: 20 },
    ],

    deliveryRadius: 12,
    minOrderValue: 2000,

    metrics: {
      fulfillmentRate: 93,
      avgDeliveryTime: 18,
      qualityScore: 4.6,
      disputeRate: 1.8,
      totalOrders: 654,
    },

    location: {
      address: 'Shop 12-15, Kengeri Wholesale Market, Bengaluru - 560060',
      coordinates: { lat: 12.9141, lng: 77.4855 },
    },
  },

  {
    id: 'sup_004',
    name: 'Apollo Pharmacy Distributors',
    type: 'distributor',
    verified: true,
    rating: 4.9,

    products: [
      { productName: 'Paracetamol', basePrice: 2.8, unit: 'piece', moq: 200, available: true },
      { productName: 'Antibiotics', basePrice: 120, unit: 'piece', moq: 50, available: true },
      { productName: 'Cough Syrup', basePrice: 90, unit: 'bottle', moq: 30, available: true },
      { productName: 'Vitamins', basePrice: 125, unit: 'bottle', moq: 25, available: true },
      { productName: 'Pain Relief Gel', basePrice: 95, unit: 'piece', moq: 40, available: true },
    ],

    discountTiers: [
      { minQuantity: 300, maxQuantity: 799, discountPercent: 10 },
      { minQuantity: 800, maxQuantity: 1999, discountPercent: 16 },
      { minQuantity: 2000, maxQuantity: Infinity, discountPercent: 23 },
    ],

    deliveryRadius: 25,
    minOrderValue: 8000,

    metrics: {
      fulfillmentRate: 98,
      avgDeliveryTime: 20,
      qualityScore: 4.9,
      disputeRate: 0.8,
      totalOrders: 2341,
    },

    location: {
      address: 'Warehouse Complex, Whitefield Main Road, Bengaluru - 560066',
      coordinates: { lat: 12.97, lng: 77.75 },
    },
  },

  {
    id: 'sup_005',
    name: 'Modern Office Supplies',
    type: 'wholesaler',
    verified: true,
    rating: 4.5,

    products: [
      { productName: 'Notebooks', basePrice: 25, unit: 'piece', moq: 100, available: true },
      { productName: 'Pens', basePrice: 8, unit: 'piece', moq: 200, available: true },
      { productName: 'Printer Paper', basePrice: 280, unit: 'box', moq: 20, available: true },
      { productName: 'Files', basePrice: 15, unit: 'piece', moq: 50, available: true },
      { productName: 'Markers', basePrice: 120, unit: 'box', moq: 30, available: true },
    ],

    discountTiers: [
      { minQuantity: 200, maxQuantity: 499, discountPercent: 12 },
      { minQuantity: 500, maxQuantity: 999, discountPercent: 17 },
      { minQuantity: 1000, maxQuantity: Infinity, discountPercent: 24 },
    ],

    deliveryRadius: 18,
    minOrderValue: 4000,

    metrics: {
      fulfillmentRate: 91,
      avgDeliveryTime: 28,
      qualityScore: 4.4,
      disputeRate: 2.5,
      totalOrders: 456,
    },

    location: {
      address: 'Commercial Street, MG Road, Bengaluru - 560001',
      coordinates: { lat: 12.975, lng: 77.607 },
    },
  },

  {
    id: 'sup_006',
    name: 'TechHub Electronics Supply',
    type: 'wholesaler',
    verified: true,
    rating: 4.4,

    products: [
      { productName: 'USB Cables', basePrice: 45, unit: 'piece', moq: 100, available: true },
      { productName: 'Phone Cases', basePrice: 80, unit: 'piece', moq: 50, available: true },
      { productName: 'Chargers', basePrice: 150, unit: 'piece', moq: 50, available: true },
      { productName: 'Earphones', basePrice: 180, unit: 'piece', moq: 30, available: true },
      { productName: 'Screen Guards', basePrice: 25, unit: 'piece', moq: 100, available: true },
    ],

    discountTiers: [
      { minQuantity: 150, maxQuantity: 399, discountPercent: 11 },
      { minQuantity: 400, maxQuantity: 899, discountPercent: 16 },
      { minQuantity: 900, maxQuantity: Infinity, discountPercent: 22 },
    ],

    deliveryRadius: 15,
    minOrderValue: 6000,

    metrics: {
      fulfillmentRate: 89,
      avgDeliveryTime: 32,
      qualityScore: 4.3,
      disputeRate: 3.2,
      totalOrders: 523,
    },

    location: {
      address: 'SP Road Electronics Market, Bengaluru - 560002',
      coordinates: { lat: 12.975, lng: 77.603 },
    },
  },
];

export function getSuppliersByCategory(category: string): Supplier[] {
  const categoryMap: Record<string, string[]> = {
    Medical: ['Paracetamol', 'Cough Syrup', 'Antibiotics', 'Vitamins'],
    Kirana: ['Rice', 'Wheat Flour', 'Sugar', 'Dal', 'Spices'],
    Restaurant: ['Spices', 'Cooking Oil', 'Rice', 'Lentils'],
    Stationery: ['Notebooks', 'Pens', 'Printer Paper'],
    Electronics: ['USB Cables', 'Phone Cases', 'Chargers'],
  };

  const products = categoryMap[category] || [];

  return mockSuppliers.filter((supplier) =>
    supplier.products.some((p) => products.some((catProduct) => p.productName.toLowerCase().includes(catProduct.toLowerCase()))),
  );
}

export function getSupplierById(id: string): Supplier | undefined {
  return mockSuppliers.find((s) => s.id === id);
}
