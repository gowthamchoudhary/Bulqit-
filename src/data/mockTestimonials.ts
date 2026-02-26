export interface Testimonial {
  id: string;
  name: string;
  storeName: string;
  storeType: string;
  location: string;
  quote: string;
  savings: number;
  photo: string; // emoji placeholder
  verified: boolean;
}

export const mockTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Kumar",
    storeName: "Kumar Bakery",
    storeType: "Bakery",
    location: "Jayanagar, Bengaluru",
    quote:
      "Bulqit saved us ₹18,000 in the first month itself! The group buying for flour and baking ingredients is so easy - just one click and we get bulk prices. No more running to wholesale markets.",
    savings: 18000,
    photo: "👨‍🍳",
    verified: true,
  },
  {
    id: "t2",
    name: "Lakshmi Devi",
    storeName: "Lakshmi Kirana",
    storeType: "Kirana",
    location: "Koramangala, Bengaluru",
    quote:
      "Finally, small shops like mine can compete with big stores! The Rice Group saves me ₹2,400 every week. My profit margins have increased by 12%.",
    savings: 9600,
    photo: "👩‍💼",
    verified: true,
  },
  {
    id: "t3",
    name: "Anwar Sheikh",
    storeName: "Anwar Restaurant Supplies",
    storeType: "Restaurant",
    location: "Indiranagar, Bengaluru",
    quote:
      "The AI negotiation tool is brilliant! It generated a professional email that got us 22% discount from our spice supplier. Saved hours of back-and-forth.",
    savings: 15000,
    photo: "👨‍🍳",
    verified: true,
  },
  {
    id: "t4",
    name: "Mohammad Shahid",
    storeName: "Hotel Ashoka International",
    storeType: "Hotel",
    location: "MG Road, Bengaluru",
    quote:
      "The group buying platform transformed our procurement! We saved ₹45,000 on groceries and provisions in the first month. The quality of supplies is excellent.",
    savings: 45000,
    photo: "👨‍🍳",
    verified: true,
  },
  {
    id: "t5",
    name: "Venkat Rao",
    storeName: "Rao Fresh Bakery",
    storeType: "Bakery",
    location: "HSR Layout, Bengaluru",
    quote:
      "Best decision for my business! The verified suppliers and automatic bakery ingredient orders mean I spend less time on procurement and more on baking.",
    savings: 22000,
    photo: "👨‍🍞",
    verified: true,
  },
  {
    id: "t6",
    name: "Fatima Begum",
    storeName: "Fatima Grocery",
    storeType: "Kirana",
    location: "Whitefield, Bengaluru",
    quote:
      "Small retailers like us always struggle with prices. Bulqit changed everything. Now we get wholesale rates without the hassle!",
    savings: 8500,
    photo: "👩",
    verified: true,
  },
];
