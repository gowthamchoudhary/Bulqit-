export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  billingPeriod: 'month' | 'year';
  discount?: string;
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
    highlight?: boolean;
  }[];
  limits: {
    groupJoins: number | 'unlimited';
    aiEmails: number | 'unlimited';
    supplierAccess: string;
    paymentTerms: string;
    support: string;
  };
  cta: string;
  color: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Starter',
    tagline: 'Perfect for trying out group buying',
    price: 0,
    billingPeriod: 'month',
    color: 'gray',
    cta: 'Get Started Free',
    features: [
      { text: 'Join up to 2 active groups', included: true },
      { text: '5 AI-generated emails per month', included: true },
      { text: 'Access to verified suppliers', included: true },
      { text: 'Basic analytics dashboard', included: true },
      { text: 'Community support', included: true },
      { text: 'Pay on delivery (no credit terms)', included: true },
      { text: 'Standard discount tiers (up to 15%)', included: true },
      { text: 'Priority supplier matching', included: false },
      { text: 'Dedicated account manager', included: false },
      { text: 'Custom group creation', included: false },
    ],
    limits: {
      groupJoins: 2,
      aiEmails: 5,
      supplierAccess: 'Verified suppliers only',
      paymentTerms: 'Pay on delivery',
      support: 'Community forum',
    },
  },
  {
    id: 'pro',
    name: 'Professional',
    tagline: 'For serious retailers scaling their business',
    price: 499,
    billingPeriod: 'month',
    discount: 'Save ₹1,000/month',
    popular: true,
    color: 'green',
    cta: 'Start 14-Day Free Trial',
    features: [
      { text: 'Join unlimited groups', included: true, highlight: true },
      { text: 'Unlimited AI-generated emails', included: true, highlight: true },
      { text: 'Access to all suppliers (including premium)', included: true },
      { text: 'Advanced analytics & insights', included: true },
      { text: 'Priority customer support (24/7)', included: true },
      { text: 'Net-15 payment terms', included: true, highlight: true },
      { text: 'Enhanced discount tiers (up to 25%)', included: true, highlight: true },
      { text: 'Priority in group formation', included: true },
      { text: 'Create your own private groups', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'Bulk order scheduling', included: true },
      { text: 'Invoice management', included: true },
      { text: 'Dedicated account manager', included: false },
      { text: 'White-label solution', included: false },
    ],
    limits: {
      groupJoins: 'unlimited',
      aiEmails: 'unlimited',
      supplierAccess: 'All suppliers + Premium',
      paymentTerms: 'Net-15 credit',
      support: '24/7 Priority support',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For chains and large-scale operations',
    price: 1999,
    billingPeriod: 'month',
    discount: 'Custom pricing available',
    color: 'purple',
    cta: 'Contact Sales',
    features: [
      { text: 'Everything in Professional, plus:', included: true, highlight: true },
      { text: 'Multi-store management dashboard', included: true },
      { text: 'Dedicated account manager', included: true, highlight: true },
      { text: 'Custom supplier negotiations', included: true },
      { text: 'Net-30 payment terms', included: true, highlight: true },
      { text: 'Maximum discount tiers (up to 30%)', included: true, highlight: true },
      { text: 'API access for integrations', included: true },
      { text: 'White-label platform option', included: true },
      { text: 'Custom reporting & BI dashboards', included: true },
      { text: 'Dedicated slack channel', included: true },
      { text: 'Onboarding & training sessions', included: true },
      { text: 'SLA guarantee (99.9% uptime)', included: true },
      { text: 'Priority in all groups (first access)', included: true },
      { text: 'Bulk discounts for multiple locations', included: true },
    ],
    limits: {
      groupJoins: 'unlimited',
      aiEmails: 'unlimited',
      supplierAccess: 'All + Direct manufacturer access',
      paymentTerms: 'Net-30 credit + Custom terms',
      support: 'Dedicated account manager',
    },
  },
];

export const addons = [
  {
    name: 'Extra AI Email Credits',
    price: 99,
    description: '50 additional AI-generated emails per month',
  },
  {
    name: 'Premium Supplier Access',
    price: 199,
    description: 'Unlock 50+ exclusive premium suppliers',
  },
  {
    name: 'Extended Payment Terms',
    price: 299,
    description: 'Upgrade to Net-30 payment terms',
  },
  {
    name: 'Dedicated Account Manager',
    price: 499,
    description: 'Personal business advisor for optimization',
  },
];
