import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  TrendingUp,
  Settings,
  Bell,
  Globe,
  CheckCircle,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  IndianRupee,
  Users,
  Truck,
  BarChart3,
  Sparkles,
  Shield,
  Download,
  Eye,
  X,
  Plus,
  Edit2,
  Award,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────────────────────── */
const T = {
  bg: "#F0EFED",
  bgWhite: "#ffffff",
  textDark: "#111111",
  textMid: "#555555",
  textLight: "#999999",
  border: "rgba(0,0,0,0.08)",
  borderDash: "rgba(0,0,0,0.12)",
  gold: "#FFB800",
  goldSoft: "rgba(255,184,0,0.12)",
  goldBorder: "rgba(255,184,0,0.35)",
  font: "'DM Sans', sans-serif",
};

/* ─────────────────────────────────────────────────────────────────────────────
   LANGUAGE CONFIG
───────────────────────────────────────────────────────────────────────────── */
const LANGS = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
];

const STRINGS: Record<string, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    groups: "Groups",
    orders: "Orders",
    invoices: "Invoices",
    predictions: "AI Predictions",
    settings: "Settings",
    verified: "Verified Supplier",
    goldBadge: "Gold Verified",
    totalRevenue: "Total Revenue",
    totalOrders: "Total Orders",
    fulfillment: "Fulfillment Rate",
    avgDelivery: "Avg Delivery",
    activeGroups: "Active Groups",
    pendingOrders: "Pending Orders",
    recentOrders: "Recent Orders",
    viewAll: "View All",
    accept: "Accept",
    reject: "Reject",
    negotiate: "Negotiate",
    invoiceTitle: "Invoices & Bills",
    aiTitle: "AI Demand Predictions",
    groupsTitle: "Active Buying Groups",
    priceSettings: "Price Settings",
    profile: "My Profile",
    logout: "Logout",
    notifications: "Notifications",
    orderValue: "Order Value",
    members: "Members",
    discount: "Discount",
    status: "Status",
    action: "Action",
    product: "Product",
    predicted: "Predicted Qty",
    confidence: "Confidence",
    season: "Season",
    amount: "Amount",
    due: "Due Date",
    paid: "Paid",
    overdue: "Overdue",
    draft: "Draft",
    sent: "Sent",
    download: "Download",
    markPaid: "Mark Paid",
    spikeSuggestion: "Suggestion",
    expectedIncrease: "Expected Increase",
    editPrice: "Edit Price",
    savePrice: "Save Price",
    cancelEdit: "Cancel",
    minOrder: "Min Order Value",
    deliveryRadius: "Delivery Radius",
    paymentTerms: "Payment Terms",
    profileUpdated: "Profile updated!",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    groups: "समूह",
    orders: "ऑर्डर",
    invoices: "चालान",
    predictions: "AI पूर्वानुमान",
    settings: "सेटिंग",
    verified: "सत्यापित आपूर्तिकर्ता",
    goldBadge: "गोल्ड सत्यापित",
    totalRevenue: "कुल राजस्व",
    totalOrders: "कुल ऑर्डर",
    fulfillment: "पूर्ति दर",
    avgDelivery: "औसत डिलीवरी",
    activeGroups: "सक्रिय समूह",
    pendingOrders: "लंबित ऑर्डर",
    recentOrders: "हाल के ऑर्डर",
    viewAll: "सभी देखें",
    accept: "स्वीकार करें",
    reject: "अस्वीकार करें",
    negotiate: "बातचीत",
    invoiceTitle: "चालान और बिल",
    aiTitle: "AI मांग पूर्वानुमान",
    groupsTitle: "सक्रिय खरीद समूह",
    priceSettings: "मूल्य सेटिंग",
    profile: "मेरी प्रोफ़ाइल",
    logout: "लॉगआउट",
    notifications: "सूचनाएं",
    orderValue: "ऑर्डर मूल्य",
    members: "सदस्य",
    discount: "छूट",
    status: "स्थिति",
    action: "कार्रवाई",
    product: "उत्पाद",
    predicted: "अनुमानित मात्रा",
    confidence: "विश्वास",
    season: "मौसम",
    amount: "राशि",
    due: "नियत तारीख",
    paid: "भुगतान किया",
    overdue: "बकाया",
    draft: "मसौदा",
    sent: "भेजा गया",
    download: "डाउनलोड",
    markPaid: "भुगतान करें",
    spikeSuggestion: "सुझाव",
    expectedIncrease: "अपेक्षित वृद्धि",
    editPrice: "मूल्य संपादित करें",
    savePrice: "मूल्य सहेजें",
    cancelEdit: "रद्द करें",
    minOrder: "न्यूनतम ऑर्डर",
    deliveryRadius: "डिलीवरी दायरा",
    paymentTerms: "भुगतान शर्तें",
    profileUpdated: "प्रोफ़ाइल अपडेट हुई!",
  },
  te: {
    dashboard: "డాష్‌బోర్డ్",
    groups: "గ్రూపులు",
    orders: "ఆర్డర్లు",
    invoices: "ఇన్వాయిసులు",
    predictions: "AI అంచనాలు",
    settings: "సెట్టింగులు",
    verified: "ధృవీకరించిన సరఫరాదారు",
    goldBadge: "గోల్డ్ ధృవీకరించబడింది",
    totalRevenue: "మొత్తం ఆదాయం",
    totalOrders: "మొత్తం ఆర్డర్లు",
    fulfillment: "నెరవేర్పు రేటు",
    avgDelivery: "సగటు డెలివరీ",
    activeGroups: "క్రియాశీల గ్రూపులు",
    pendingOrders: "పెండింగ్ ఆర్డర్లు",
    recentOrders: "ఇటీవలి ఆర్డర్లు",
    viewAll: "అన్నీ చూడు",
    accept: "అంగీకరించు",
    reject: "తిరస్కరించు",
    negotiate: "చర్చించు",
    invoiceTitle: "ఇన్వాయిసులు & బిల్లులు",
    aiTitle: "AI డిమాండ్ అంచనాలు",
    groupsTitle: "క్రియాశీల కొనుగోలు గ్రూపులు",
    priceSettings: "ధర సెట్టింగులు",
    profile: "నా ప్రొఫైల్",
    logout: "లాగ్అవుట్",
    notifications: "నోటిఫికేషన్లు",
    orderValue: "ఆర్డర్ విలువ",
    members: "సభ్యులు",
    discount: "తగ్గింపు",
    status: "స్థితి",
    action: "చర్య",
    product: "ఉత్పత్తి",
    predicted: "అంచనా పరిమాణం",
    confidence: "నమ్మకం",
    season: "సీజన్",
    amount: "మొత్తం",
    due: "చెల్లింపు తేదీ",
    paid: "చెల్లించారు",
    overdue: "బకాయి",
    draft: "ముసాయిదా",
    sent: "పంపబడింది",
    download: "డౌన్లోడ్",
    markPaid: "చెల్లించబడింది",
    spikeSuggestion: "సూచన",
    expectedIncrease: "అంచనా పెరుగుదల",
    editPrice: "ధర సవరించు",
    savePrice: "ధర సేవ్ చేయి",
    cancelEdit: "రద్దు",
    minOrder: "కనిష్ట ఆర్డర్",
    deliveryRadius: "డెలివరీ పరిధి",
    paymentTerms: "చెల్లింపు నిబంధనలు",
    profileUpdated: "ప్రొఫైల్ అప్‌డేట్ అయింది!",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    groups: "குழுக்கள்",
    orders: "ஆர்டர்கள்",
    invoices: "இன்வாய்சுகள்",
    predictions: "AI கணிப்புகள்",
    settings: "அமைப்புகள்",
    verified: "சரிபார்க்கப்பட்ட சப்ளையர்",
    goldBadge: "தங்க சரிபார்ப்பு",
    totalRevenue: "மொத்த வருவாய்",
    totalOrders: "மொத்த ஆர்டர்கள்",
    fulfillment: "நிறைவேற்று விகிதம்",
    avgDelivery: "சராசரி டெலிவரி",
    activeGroups: "செயலில் உள்ள குழுக்கள்",
    pendingOrders: "நிலுவையில் உள்ள ஆர்டர்கள்",
    recentOrders: "சமீபத்திய ஆர்டர்கள்",
    viewAll: "அனைத்தையும் காண்க",
    accept: "ஏற்றுக்கொள்",
    reject: "நிராகரி",
    negotiate: "பேச்சுவார்த்தை",
    invoiceTitle: "இன்வாய்சுகள் & பில்கள்",
    aiTitle: "AI தேவை கணிப்புகள்",
    groupsTitle: "செயலில் உள்ள வாங்குதல் குழுக்கள்",
    priceSettings: "விலை அமைப்புகள்",
    profile: "என் சுயவிவரம்",
    logout: "வெளியேறு",
    notifications: "அறிவிப்புகள்",
    orderValue: "ஆர்டர் மதிப்பு",
    members: "உறுப்பினர்கள்",
    discount: "தள்ளுபடி",
    status: "நிலை",
    action: "செயல்",
    product: "தயாரிப்பு",
    predicted: "கணிக்கப்பட்ட அளவு",
    confidence: "நம்பிக்கை",
    season: "பருவம்",
    amount: "தொகை",
    due: "செலுத்த வேண்டிய தேதி",
    paid: "செலுத்தப்பட்டது",
    overdue: "தாமதமானது",
    draft: "வரைவு",
    sent: "அனுப்பப்பட்டது",
    download: "பதிவிறக்கு",
    markPaid: "செலுத்தியது",
    spikeSuggestion: "பரிந்துரை",
    expectedIncrease: "எதிர்பார்க்கப்படும் அதிகரிப்பு",
    editPrice: "விலை திருத்து",
    savePrice: "விலை சேமி",
    cancelEdit: "ரத்துசெய்",
    minOrder: "குறைந்தபட்ச ஆர்டர்",
    deliveryRadius: "டெலிவரி வரம்பு",
    paymentTerms: "கட்டண விதிமுறைகள்",
    profileUpdated: "சுயவிவரம் புதுப்பிக்கப்பட்டது!",
  },
  ml: {
    dashboard: "ഡാഷ്‌ബോർഡ്",
    groups: "ഗ്രൂപ്പുകൾ",
    orders: "ഓർഡറുകൾ",
    invoices: "ഇൻവോയ്‌സുകൾ",
    predictions: "AI പ്രവചനങ്ങൾ",
    settings: "ക്രമീകരണങ്ങൾ",
    verified: "പരിശോധിച്ച വിതരണക്കാരൻ",
    goldBadge: "ഗോൾഡ് വെരിഫൈഡ്",
    totalRevenue: "മൊത്തം വരുമാനം",
    totalOrders: "മൊത്തം ഓർഡറുകൾ",
    fulfillment: "നിറവേറ്റൽ നിരക്ക്",
    avgDelivery: "ശരാശരി ഡെലിവറി",
    activeGroups: "സജീവ ഗ്രൂപ്പുകൾ",
    pendingOrders: "തീർപ്പാക്കാത്ത ഓർഡറുകൾ",
    recentOrders: "സമീപകാല ഓർഡറുകൾ",
    viewAll: "എല്ലാം കാണുക",
    accept: "സ്വീകരിക്കുക",
    reject: "നിരസിക്കുക",
    negotiate: "ചർച്ച ചെയ്യുക",
    invoiceTitle: "ഇൻവോയ്‌സുകളും ബില്ലുകളും",
    aiTitle: "AI ഡിമാൻഡ് പ്രവചനങ്ങൾ",
    groupsTitle: "സജീവ ബൈയിംഗ് ഗ്രൂപ്പുകൾ",
    priceSettings: "വില ക്രമീകരണങ്ങൾ",
    profile: "എന്റെ പ്രൊഫൈൽ",
    logout: "ലോഗ്ഔട്ട്",
    notifications: "അറിയിപ്പുകൾ",
    orderValue: "ഓർഡർ മൂല്യം",
    members: "അംഗങ്ങൾ",
    discount: "കിഴിവ്",
    status: "നില",
    action: "നടപടി",
    product: "ഉൽപ്പന്നം",
    predicted: "പ്രവചിത അളവ്",
    confidence: "വിശ്വാസ്യത",
    season: "സീസൺ",
    amount: "തുക",
    due: "നൽകേണ്ട തീയതി",
    paid: "നൽകിയത്",
    overdue: "കുടിശ്ശിക",
    draft: "കരട്",
    sent: "അയച്ചു",
    download: "ഡൗൺലോഡ്",
    markPaid: "അടച്ചതായി",
    spikeSuggestion: "നിർദ്ദേശം",
    expectedIncrease: "പ്രതീക്ഷിത വർദ്ധനവ്",
    editPrice: "വില തിരുത്തുക",
    savePrice: "വില സേവ് ചെയ്യുക",
    cancelEdit: "റദ്ദാക്കുക",
    minOrder: "കുറഞ്ഞ ഓർഡർ",
    deliveryRadius: "ഡെലിവറി ദൂരം",
    paymentTerms: "പേയ്‌മെന്റ് നിബന്ധനകൾ",
    profileUpdated: "പ്രൊഫൈൽ അപ്ഡേറ്റ് ചെയ്തു!",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────────────────────────────────────── */
const SUPPLIER = {
  companyName: "Karnataka Grains & Co.",
  ownerName: "Rajesh Kumar",
  type: "wholesaler",
  city: "Bengaluru",
  gstNumber: "29ABCDE1234F1Z5",
  rating: 4.8,
  verified: true,
  joinedDate: "2022-03-15",
  metrics: {
    totalRevenue: 2840000,
    totalOrders: 342,
    fulfillmentRate: 96.8,
    avgDeliveryTime: 18,
    qualityScore: 4.9,
    disputeRate: 0.8,
  },
};

const GROUPS = [
  {
    id: "g1",
    name: "Rice Bulk Group",
    members: 12,
    targetMembers: 15,
    orderValue: 84000,
    discount: 18,
    nextOrder: "Wed, 28 Feb",
    status: "active",
    category: "Grains",
  },
  {
    id: "g2",
    name: "Wheat Flour Pool",
    members: 8,
    targetMembers: 10,
    orderValue: 56000,
    discount: 15,
    nextOrder: "Thu, 1 Mar",
    status: "filling",
    category: "Grains",
  },
  {
    id: "g3",
    name: "Cooking Oil Group",
    members: 10,
    targetMembers: 10,
    orderValue: 95000,
    discount: 22,
    nextOrder: "Tue, 5 Mar",
    status: "full",
    category: "Oils",
  },
];

const ORDERS = [
  {
    id: "ORD-001",
    group: "Rice Bulk Group",
    products: [{ name: "Basmati Rice", qty: 500 }],
    value: 84000,
    discount: 18,
    status: "pending",
    requestedAt: "2024-02-20",
    respondBy: "2024-02-22",
    members: 12,
  },
  {
    id: "ORD-002",
    group: "Cooking Oil Group",
    products: [{ name: "Sunflower Oil", qty: 200 }],
    value: 95000,
    discount: 22,
    status: "accepted",
    requestedAt: "2024-02-18",
    respondBy: "2024-02-20",
    members: 10,
  },
  {
    id: "ORD-003",
    group: "Wheat Flour Pool",
    products: [{ name: "Wheat Flour", qty: 400 }],
    value: 56000,
    discount: 15,
    status: "negotiating",
    requestedAt: "2024-02-17",
    respondBy: "2024-02-21",
    members: 8,
  },
  {
    id: "ORD-004",
    group: "Dal Combo Group",
    products: [{ name: "Toor Dal", qty: 300 }],
    value: 42000,
    discount: 12,
    status: "completed",
    requestedAt: "2024-02-10",
    respondBy: "2024-02-12",
    members: 9,
  },
  {
    id: "ORD-005",
    group: "Spices Bulk Buy",
    products: [{ name: "Turmeric", qty: 150 }],
    value: 28000,
    discount: 20,
    status: "completed",
    requestedAt: "2024-02-05",
    respondBy: "2024-02-07",
    members: 7,
  },
];

const INVOICES = [
  {
    id: "INV-2024-001",
    group: "Cooking Oil Group",
    amount: 95000,
    status: "paid",
    issuedDate: "2024-02-18",
    dueDate: "2024-02-28",
    paidDate: "2024-02-20",
  },
  {
    id: "INV-2024-002",
    group: "Dal Combo Group",
    amount: 42000,
    status: "paid",
    issuedDate: "2024-02-10",
    dueDate: "2024-02-20",
    paidDate: "2024-02-18",
  },
  {
    id: "INV-2024-003",
    group: "Wheat Flour Pool",
    amount: 56000,
    status: "sent",
    issuedDate: "2024-02-17",
    dueDate: "2024-03-03",
  },
  {
    id: "INV-2024-004",
    group: "Rice Bulk Group",
    amount: 84000,
    status: "draft",
    issuedDate: "2024-02-20",
    dueDate: "2024-03-06",
  },
  {
    id: "INV-2024-005",
    group: "Spices Bulk Buy",
    amount: 28000,
    status: "overdue",
    issuedDate: "2024-01-30",
    dueDate: "2024-02-10",
  },
];

const AI_PREDICTIONS = [
  {
    product: "Basmati Rice",
    predictedQty: 2800,
    predictedDate: "Mar 15",
    confidence: 91,
    reasoning:
      "Wedding season surge in Bengaluru South Zone — 3 group requests incoming",
  },
  {
    product: "Sunflower Oil",
    predictedQty: 1200,
    predictedDate: "Mar 20",
    confidence: 87,
    reasoning: "Ugadi festival demand historically spikes 2.4× in this region",
  },
  {
    product: "Toor Dal",
    predictedQty: 900,
    predictedDate: "Apr 2",
    confidence: 78,
    reasoning:
      "Summer stocking by kirana stores — 6 retailers showing repeat patterns",
  },
  {
    product: "Turmeric Powder",
    predictedQty: 500,
    predictedDate: "Apr 10",
    confidence: 82,
    reasoning: "Religious season + export demand pattern from last 2 years",
  },
];

const SEASONAL_SPIKES = [
  {
    product: "Rice",
    season: "Ugadi (Mar)",
    expectedIncrease: 240,
    suggestion:
      "Stock 2.4× normal inventory by Feb 28. Negotiate advance pricing with farms.",
  },
  {
    product: "Cooking Oil",
    season: "Summer (Apr–Jun)",
    expectedIncrease: 160,
    suggestion:
      "Expand storage capacity. 4 new retailer groups expected to form.",
  },
  {
    product: "Sugar",
    season: "Diwali (Oct)",
    expectedIncrease: 320,
    suggestion:
      "Earliest seasonal spike. Lock manufacturer rates by September.",
  },
];

const PRODUCTS_PRICE = [
  {
    id: "p1",
    name: "Basmati Rice",
    unit: "kg",
    basePrice: 85,
    moq: 100,
    available: true,
  },
  {
    id: "p2",
    name: "Wheat Flour",
    unit: "kg",
    basePrice: 32,
    moq: 200,
    available: true,
  },
  {
    id: "p3",
    name: "Sunflower Oil",
    unit: "L",
    basePrice: 125,
    moq: 50,
    available: true,
  },
  {
    id: "p4",
    name: "Toor Dal",
    unit: "kg",
    basePrice: 118,
    moq: 100,
    available: true,
  },
  {
    id: "p5",
    name: "Turmeric Powder",
    unit: "kg",
    basePrice: 180,
    moq: 50,
    available: false,
  },
];

const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "groups", icon: Users },
  { id: "orders", icon: ShoppingCart },
  { id: "invoices", icon: FileText },
  { id: "predictions", icon: Sparkles },
  { id: "settings", icon: Settings },
];

/* ─────────────────────────────────────────────────────────────────────────────
   STATUS STYLES
───────────────────────────────────────────────────────────────────────────── */
const orderStatusStyle: Record<
  string,
  { bg: string; color: string; border: string; label: string }
> = {
  pending: {
    bg: "rgba(255,184,0,0.12)",
    color: "#7A5800",
    border: "rgba(255,184,0,0.35)",
    label: "Pending",
  },
  accepted: {
    bg: "rgba(34,197,94,0.09)",
    color: "#15803D",
    border: "rgba(34,197,94,0.22)",
    label: "Accepted",
  },
  rejected: {
    bg: "rgba(239,68,68,0.08)",
    color: "#DC2626",
    border: "rgba(239,68,68,0.22)",
    label: "Rejected",
  },
  negotiating: {
    bg: "rgba(100,116,240,0.09)",
    color: "#3D4FD6",
    border: "rgba(100,116,240,0.22)",
    label: "Negotiating",
  },
  completed: {
    bg: "rgba(0,0,0,0.05)",
    color: "#555",
    border: "rgba(0,0,0,0.12)",
    label: "Completed",
  },
};

const invoiceStatusStyle: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  paid: {
    bg: "rgba(34,197,94,0.09)",
    color: "#15803D",
    border: "rgba(34,197,94,0.22)",
  },
  sent: {
    bg: "rgba(100,116,240,0.09)",
    color: "#3D4FD6",
    border: "rgba(100,116,240,0.22)",
  },
  draft: { bg: "rgba(0,0,0,0.05)", color: "#666", border: "rgba(0,0,0,0.12)" },
  overdue: {
    bg: "rgba(239,68,68,0.08)",
    color: "#DC2626",
    border: "rgba(239,68,68,0.22)",
  },
};

const groupStatusStyle: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  active: {
    bg: "rgba(34,197,94,0.09)",
    color: "#15803D",
    border: "rgba(34,197,94,0.22)",
  },
  filling: {
    bg: "rgba(255,184,0,0.12)",
    color: "#7A5800",
    border: "rgba(255,184,0,0.35)",
  },
  full: {
    bg: "rgba(239,68,68,0.08)",
    color: "#DC2626",
    border: "rgba(239,68,68,0.22)",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS_PRICE.map((p) => [p.id, p.basePrice])),
  );
  const [tempPrice, setTempPrice] = useState(0);
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    Object.fromEntries(ORDERS.map((o) => [o.id, o.status])),
  );

  const s = (key: string) => STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key;
  const curLang = LANGS.find((l) => l.code === lang)!;

  const totalPending = Object.values(orderStatuses).filter(
    (v) => v === "pending",
  ).length;
  const totalRevenue = SUPPLIER.metrics.totalRevenue;
  const totalOrders = SUPPLIER.metrics.totalOrders;
  const activeGroupCount = GROUPS.filter((g) => g.status !== "closed").length;

  return (
    <div
      style={{
        fontFamily: T.font,
        minHeight: "100vh",
        color: T.textDark,
        display: "flex",
        background: T.bg,
        backgroundImage: `linear-gradient(${T.borderDash} 1px, transparent 1px), linear-gradient(90deg, ${T.borderDash} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }}
    >
      {/* ══════════════════════════════════
          SIDEBAR
      ══════════════════════════════════ */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          background: "#0D0D0D",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#fff",
            }}
          >
            bulqit<span style={{ color: T.gold }}>.</span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              marginTop: 2,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Supplier Portal
          </div>
        </div>

        {/* Profile snippet */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: T.textDark,
                border: `2px solid ${T.gold}`,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 800,
                color: T.gold,
              }}
            >
              {SUPPLIER.companyName[0]}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {SUPPLIER.companyName}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 2,
                }}
              >
                <Award size={10} color={T.gold} fill={T.gold} />
                <span style={{ fontSize: 10, color: T.gold, fontWeight: 700 }}>
                  {s("goldBadge")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 10,
                  marginBottom: 2,
                  background: isActive ? "rgba(255,184,0,0.12)" : "transparent",
                  border: isActive
                    ? `1px solid rgba(255,184,0,0.25)`
                    : "1px solid transparent",
                  color: isActive ? T.gold : "rgba(255,255,255,0.45)",
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  fontFamily: T.font,
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon size={16} />
                {s(item.id)}
                {item.id === "orders" && totalPending > 0 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      minWidth: 18,
                      height: 18,
                      background: "#DC2626",
                      borderRadius: "50%",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {totalPending}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div
          style={{
            padding: "12px 10px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "10px 14px",
              borderRadius: 10,
              background: "transparent",
              border: "1px solid transparent",
              color: "rgba(255,255,255,0.3)",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: T.font,
            }}
          >
            <X size={14} /> {s("logout")}
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════ */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TOP BAR */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "rgba(240,239,237,0.94)",
            backdropFilter: "blur(12px)",
            borderBottom: `1px dashed ${T.borderDash}`,
            padding: "0 clamp(16px, 3vw, 32px)",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "-0.025em",
              }}
            >
              {s(activeTab)}
            </h2>
            {SUPPLIER.verified && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: T.goldSoft,
                  border: `1px solid ${T.goldBorder}`,
                  borderRadius: 100,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#7A5800",
                }}
              >
                <Award size={11} color={T.gold} fill={T.gold} />
                {s("verified")}
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: `1px solid ${T.border}`,
                  background: T.bgWhite,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Bell size={16} color={T.textMid} />
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    background: "#DC2626",
                    borderRadius: "50%",
                    border: "2px solid #F0EFED",
                  }}
                />
              </button>
              {notifOpen && (
                <>
                  <div
                    onClick={() => setNotifOpen(false)}
                    style={{ position: "fixed", inset: 0, zIndex: 40 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 46,
                      right: 0,
                      zIndex: 50,
                      background: T.bgWhite,
                      border: `1px solid ${T.border}`,
                      borderRadius: 14,
                      padding: 6,
                      minWidth: 280,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    }}
                  >
                    {[
                      {
                        text: "New order request from Rice Bulk Group",
                        time: "2m ago",
                        dot: "#DC2626",
                      },
                      {
                        text: "INV-2024-005 is overdue by 12 days",
                        time: "1h ago",
                        dot: "#DC2626",
                      },
                      {
                        text: "Wheat Flour Pool almost full (8/10)",
                        time: "3h ago",
                        dot: T.gold,
                      },
                    ].map((n, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 10,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: n.dot,
                            flexShrink: 0,
                            marginTop: 5,
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: T.textDark,
                              lineHeight: 1.5,
                            }}
                          >
                            {n.text}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: T.textLight,
                              marginTop: 2,
                            }}
                          >
                            {n.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Language switcher */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  borderRadius: 100,
                  background: T.bgWhite,
                  border: `1px solid ${T.border}`,
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.textDark,
                  cursor: "pointer",
                  fontFamily: T.font,
                }}
              >
                <Globe size={13} color={T.textMid} />
                {curLang.native}
                <span style={{ fontSize: 10, color: T.textLight }}>▾</span>
              </button>
              {langOpen && (
                <>
                  <div
                    onClick={() => setLangOpen(false)}
                    style={{ position: "fixed", inset: 0, zIndex: 40 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 44,
                      right: 0,
                      zIndex: 50,
                      background: T.bgWhite,
                      border: `1px solid ${T.border}`,
                      borderRadius: 14,
                      padding: 6,
                      minWidth: 180,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    }}
                  >
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: 10,
                          background:
                            l.code === lang ? T.goldSoft : "transparent",
                          border:
                            l.code === lang
                              ? `1px solid ${T.goldBorder}`
                              : "1px solid transparent",
                          cursor: "pointer",
                          fontFamily: T.font,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: l.code === lang ? "#7A5800" : T.textDark,
                          }}
                        >
                          {l.native}
                        </span>
                        <span style={{ fontSize: 11, color: T.textLight }}>
                          {l.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main
          style={{
            flex: 1,
            padding: "clamp(16px, 2.5vw, 28px) clamp(16px, 3vw, 32px)",
            overflowY: "auto",
          }}
        >
          {/* ════ DASHBOARD ════ */}
          {activeTab === "dashboard" && (
            <div>
              {/* Gold verified hero */}
              <div
                style={{
                  background: "#0D0D0D",
                  borderRadius: 20,
                  padding: "28px 32px",
                  marginBottom: 24,
                  position: "relative",
                  overflow: "hidden",
                  border: `1px solid rgba(255,255,255,0.07)`,
                  boxShadow: `0 0 0 1px ${T.goldBorder}, 0 8px 40px rgba(255,184,0,0.10)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -80,
                    right: -80,
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(ellipse, rgba(255,184,0,0.12) 0%, transparent 65%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 16,
                    position: "relative",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "clamp(18px, 2.5vw, 24px)",
                          fontWeight: 900,
                          letterSpacing: "-0.03em",
                          color: "#fff",
                        }}
                      >
                        {SUPPLIER.companyName}
                      </h1>
                      {/* Gold verified badge */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          background:
                            "linear-gradient(135deg, #FFB800, #FFD700, #CC8800)",
                          borderRadius: 100,
                          padding: "5px 14px",
                          boxShadow: "0 4px 16px rgba(255,184,0,0.45)",
                        }}
                      >
                        <Award size={13} color="#5A3800" fill="#5A3800" />
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: "#3A2000",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          Gold Verified
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.45)",
                        }}
                      >
                        {SUPPLIER.ownerName}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.45)",
                          textTransform: "capitalize",
                        }}
                      >
                        {SUPPLIER.type}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 13,
                          color: T.gold,
                        }}
                      >
                        <Star size={12} fill={T.gold} color={T.gold} />{" "}
                        {SUPPLIER.rating}
                      </span>
                      <span
                        style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}
                      >
                        GST: {SUPPLIER.gstNumber}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 4,
                      }}
                    >
                      Quality Score
                    </div>
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 900,
                        color: T.gold,
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                    >
                      {SUPPLIER.metrics.qualityScore}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.3)",
                        marginTop: 2,
                      }}
                    >
                      out of 5.0
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
                  gap: 14,
                  marginBottom: 24,
                }}
              >
                {[
                  {
                    label: s("totalRevenue"),
                    value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
                    sub: "all time",
                    accent: "#22C55E",
                    icon: <IndianRupee size={17} />,
                  },
                  {
                    label: s("totalOrders"),
                    value: totalOrders.toString(),
                    sub: "completed",
                    accent: "#6474F0",
                    icon: <ShoppingCart size={17} />,
                  },
                  {
                    label: s("fulfillment"),
                    value: `${SUPPLIER.metrics.fulfillmentRate}%`,
                    sub: "on-time rate",
                    accent: T.gold,
                    icon: <CheckCircle size={17} />,
                  },
                  {
                    label: s("avgDelivery"),
                    value: `${SUPPLIER.metrics.avgDeliveryTime}h`,
                    sub: "avg time",
                    accent: "#F97316",
                    icon: <Truck size={17} />,
                  },
                  {
                    label: s("activeGroups"),
                    value: activeGroupCount.toString(),
                    sub: "buying groups",
                    accent: "#A78BFA",
                    icon: <Users size={17} />,
                  },
                  {
                    label: s("pendingOrders"),
                    value: totalPending.toString(),
                    sub: "need response",
                    accent: "#DC2626",
                    icon: <Clock size={17} />,
                  },
                ].map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>

              {/* Recent orders */}
              <div
                style={{
                  background: T.bgWhite,
                  border: `1px solid ${T.border}`,
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <SectionHeader
                  title={s("recentOrders")}
                  action={{
                    label: s("viewAll"),
                    onClick: () => setActiveTab("orders"),
                  }}
                />
                <OrderTable
                  orders={ORDERS.slice(0, 3)}
                  statuses={orderStatuses}
                  onStatusChange={setOrderStatuses}
                  s={s}
                />
              </div>
            </div>
          )}

          {/* ════ GROUPS ════ */}
          {activeTab === "groups" && (
            <div>
              <SectionHeader title={s("groupsTitle")} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                  gap: 16,
                }}
              >
                {GROUPS.map((group) => {
                  const gs =
                    groupStatusStyle[group.status] ?? groupStatusStyle.active;
                  const progress = (group.members / group.targetMembers) * 100;
                  return (
                    <div
                      key={group.id}
                      style={{
                        background: T.bgWhite,
                        borderRadius: 18,
                        border: `1px solid ${T.border}`,
                        padding: 24,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          marginBottom: 14,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 800,
                              color: T.textDark,
                              marginBottom: 6,
                            }}
                          >
                            {group.name}
                          </div>
                          <span
                            style={{
                              fontSize: 11,
                              padding: "3px 10px",
                              borderRadius: 100,
                              fontWeight: 700,
                              background: gs.bg,
                              color: gs.color,
                              border: `1px solid ${gs.border}`,
                              textTransform: "capitalize",
                            }}
                          >
                            {group.status}
                          </span>
                        </div>
                        <div
                          style={{
                            background: T.textDark,
                            borderRadius: 10,
                            padding: "6px 10px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 900,
                              color: T.gold,
                            }}
                          >
                            {group.discount}%
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              color: "rgba(255,255,255,0.4)",
                              fontWeight: 700,
                            }}
                          >
                            OFF
                          </div>
                        </div>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                            color: T.textMid,
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              gap: 4,
                              alignItems: "center",
                            }}
                          >
                            <Users size={12} />
                            {group.members}/{group.targetMembers} {s("members")}
                          </span>
                          <span>{group.nextOrder}</span>
                        </div>
                        <div
                          style={{
                            height: 5,
                            background: T.bg,
                            borderRadius: 100,
                            border: `1px solid ${T.borderDash}`,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              borderRadius: 100,
                              width: `${progress}%`,
                              background:
                                progress >= 90
                                  ? "#DC2626"
                                  : progress >= 70
                                    ? T.gold
                                    : "#111",
                              transition: "width 0.4s",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          background: T.goldSoft,
                          border: `1px solid ${T.goldBorder}`,
                          borderRadius: 10,
                          padding: "10px 14px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            color: "#7A5800",
                            fontWeight: 600,
                          }}
                        >
                          {s("orderValue")}
                        </span>
                        <span
                          style={{
                            fontSize: 17,
                            fontWeight: 900,
                            color: T.textDark,
                          }}
                        >
                          ₹{group.orderValue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════ ORDERS ════ */}
          {activeTab === "orders" && (
            <div>
              <SectionHeader title={s("recentOrders")} />
              <div
                style={{
                  background: T.bgWhite,
                  border: `1px solid ${T.border}`,
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <OrderTable
                  orders={ORDERS}
                  statuses={orderStatuses}
                  onStatusChange={setOrderStatuses}
                  s={s}
                />
              </div>
            </div>
          )}

          {/* ════ INVOICES ════ */}
          {activeTab === "invoices" && (
            <div>
              {/* Summary row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 180px), 1fr))",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                {[
                  {
                    label: "Total Billed",
                    value: `₹${INVOICES.reduce((s, i) => s + i.amount, 0).toLocaleString()}`,
                    accent: T.textDark,
                  },
                  {
                    label: "Paid",
                    value: `₹${INVOICES.filter((i) => i.status === "paid")
                      .reduce((s, i) => s + i.amount, 0)
                      .toLocaleString()}`,
                    accent: "#22C55E",
                  },
                  {
                    label: "Outstanding",
                    value: `₹${INVOICES.filter((i) => i.status !== "paid")
                      .reduce((s, i) => s + i.amount, 0)
                      .toLocaleString()}`,
                    accent: T.gold,
                  },
                  {
                    label: "Overdue",
                    value: `₹${INVOICES.filter((i) => i.status === "overdue")
                      .reduce((s, i) => s + i.amount, 0)
                      .toLocaleString()}`,
                    accent: "#DC2626",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: T.bgWhite,
                      border: `1px solid ${T.border}`,
                      borderRadius: 14,
                      padding: "16px 18px",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: T.textLight,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 6,
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: s.accent,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: T.bgWhite,
                  border: `1px solid ${T.border}`,
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  overflowX: "auto",
                }}
              >
                <SectionHeader title={s("invoiceTitle")} />
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: T.font,
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: `1px dashed ${T.borderDash}` }}>
                      {[
                        "Invoice",
                        "Group",
                        s("amount"),
                        s("status"),
                        s("due"),
                        s("action"),
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            fontSize: 11,
                            fontWeight: 700,
                            color: T.textLight,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {INVOICES.map((inv) => {
                      const is = invoiceStatusStyle[inv.status];
                      return (
                        <tr
                          key={inv.id}
                          style={{ borderBottom: `1px dashed ${T.borderDash}` }}
                        >
                          <td
                            style={{
                              padding: "12px 12px",
                              fontWeight: 700,
                              color: T.textDark,
                            }}
                          >
                            {inv.id}
                          </td>
                          <td
                            style={{ padding: "12px 12px", color: T.textMid }}
                          >
                            {inv.group}
                          </td>
                          <td style={{ padding: "12px 12px", fontWeight: 800 }}>
                            ₹{inv.amount.toLocaleString()}
                          </td>
                          <td style={{ padding: "12px 12px" }}>
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                padding: "3px 10px",
                                borderRadius: 100,
                                background: is.bg,
                                color: is.color,
                                border: `1px solid ${is.border}`,
                                textTransform: "capitalize",
                              }}
                            >
                              {inv.status}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "12px 12px",
                              color: T.textMid,
                              fontSize: 12,
                            }}
                          >
                            {inv.dueDate}
                          </td>
                          <td style={{ padding: "12px 12px" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                              <ActionBtn
                                color={T.textDark}
                                icon={<Download size={12} />}
                                label={s("download")}
                              />
                              {inv.status !== "paid" && (
                                <ActionBtn
                                  color="#15803D"
                                  icon={<CheckCircle size={12} />}
                                  label={s("markPaid")}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ AI PREDICTIONS ════ */}
          {activeTab === "predictions" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Demand predictions */}
              <div
                style={{
                  background: T.bgWhite,
                  border: `1px solid ${T.border}`,
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <SectionHeader title={s("aiTitle")} badge="AI" />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                    gap: 14,
                    marginTop: 16,
                  }}
                >
                  {AI_PREDICTIONS.map((pred, i) => (
                    <div
                      key={i}
                      style={{
                        background: T.bg,
                        border: `1px dashed ${T.borderDash}`,
                        borderRadius: 14,
                        padding: 18,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: T.textDark,
                          }}
                        >
                          {pred.product}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: 100,
                            background:
                              pred.confidence >= 88
                                ? "rgba(34,197,94,0.09)"
                                : T.goldSoft,
                            color:
                              pred.confidence >= 88 ? "#15803D" : "#7A5800",
                            border: `1px solid ${pred.confidence >= 88 ? "rgba(34,197,94,0.22)" : T.goldBorder}`,
                          }}
                        >
                          {pred.confidence}%
                        </div>
                      </div>
                      <div
                        style={{ display: "flex", gap: 10, marginBottom: 12 }}
                      >
                        <div
                          style={{
                            flex: 1,
                            background: T.bgWhite,
                            borderRadius: 10,
                            padding: "10px 12px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 20,
                              fontWeight: 900,
                              color: T.textDark,
                            }}
                          >
                            {pred.predictedQty}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: T.textLight,
                              marginTop: 2,
                            }}
                          >
                            units by {pred.predictedDate}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: T.textMid,
                          lineHeight: 1.6,
                          padding: "10px 12px",
                          background: T.bgWhite,
                          borderRadius: 10,
                        }}
                      >
                        <Sparkles
                          size={11}
                          color={T.gold}
                          style={{ display: "inline", marginRight: 4 }}
                        />
                        {pred.reasoning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seasonal spikes */}
              <div
                style={{
                  background: "#0D0D0D",
                  border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: `0 0 0 1px ${T.goldBorder}, 0 8px 32px rgba(255,184,0,0.08)`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
                    Seasonal Demand Spikes
                  </h3>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 100,
                      background: T.goldSoft,
                      color: "#7A5800",
                      border: `1px solid ${T.goldBorder}`,
                    }}
                  >
                    ⚡ Action Required
                  </span>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {SEASONAL_SPIKES.map((spike, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 14,
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 6,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 800,
                              color: "#fff",
                            }}
                          >
                            {spike.product}
                          </span>
                          <span style={{ fontSize: 12, color: T.gold }}>
                            {spike.season}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.45)",
                            lineHeight: 1.6,
                          }}
                        >
                          {spike.suggestion}
                        </div>
                      </div>
                      <div style={{ textAlign: "center", flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: 28,
                            fontWeight: 900,
                            color: "#22C55E",
                            letterSpacing: "-0.03em",
                            lineHeight: 1,
                          }}
                        >
                          +{spike.expectedIncrease}%
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "rgba(255,255,255,0.3)",
                            marginTop: 3,
                          }}
                        >
                          {s("expectedIncrease")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ SETTINGS ════ */}
          {activeTab === "settings" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
                gap: 20,
              }}
            >
              {/* Profile card */}
              <div
                style={{
                  background: T.bgWhite,
                  border: `1px solid ${T.border}`,
                  borderRadius: 18,
                  padding: 28,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <SectionHeader title={s("profile")} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    marginTop: 16,
                  }}
                >
                  {[
                    { label: "Company Name", val: SUPPLIER.companyName },
                    { label: "Owner", val: SUPPLIER.ownerName },
                    { label: "City", val: SUPPLIER.city },
                    { label: "GST Number", val: SUPPLIER.gstNumber },
                    { label: s("minOrder"), val: "₹5,000" },
                    { label: s("deliveryRadius"), val: "20 km" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 14px",
                        background: T.bg,
                        borderRadius: 10,
                        border: `1px dashed ${T.borderDash}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: T.textLight,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: T.textDark,
                        }}
                      >
                        {row.val}
                      </span>
                    </div>
                  ))}

                  <div style={{ marginTop: 8 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: T.textLight,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 8,
                      }}
                    >
                      {s("paymentTerms")}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Pay on Delivery", "Net-15", "Net-30"].map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "4px 12px",
                            borderRadius: 100,
                            background: T.bg,
                            border: `1px solid ${T.borderDash}`,
                            color: T.textMid,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price settings */}
              <div
                style={{
                  background: T.bgWhite,
                  border: `1px solid ${T.border}`,
                  borderRadius: 18,
                  padding: 28,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <SectionHeader title={s("priceSettings")} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 16,
                  }}
                >
                  {PRODUCTS_PRICE.map((prod) => {
                    const isEditing = editingPrice === prod.id;
                    return (
                      <div
                        key={prod.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 14px",
                          background: T.bg,
                          borderRadius: 12,
                          border: `1px dashed ${isEditing ? T.gold : T.borderDash}`,
                          gap: 12,
                          flexWrap: "wrap",
                          boxShadow: isEditing
                            ? `0 0 0 2px ${T.goldBorder}`
                            : "none",
                          transition: "box-shadow 0.15s",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: prod.available ? T.textDark : T.textLight,
                            }}
                          >
                            {prod.name}
                          </div>
                          <div style={{ fontSize: 11, color: T.textLight }}>
                            per {prod.unit} · MOQ: {prod.moq}
                          </div>
                        </div>
                        {isEditing ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 14,
                                  fontWeight: 700,
                                  color: T.textMid,
                                }}
                              >
                                ₹
                              </span>
                              <input
                                type="number"
                                value={tempPrice}
                                onChange={(e) =>
                                  setTempPrice(Number(e.target.value))
                                }
                                style={{
                                  width: 80,
                                  padding: "6px 10px",
                                  borderRadius: 8,
                                  fontSize: 14,
                                  fontWeight: 700,
                                  border: `1px solid ${T.gold}`,
                                  background: T.bgWhite,
                                  fontFamily: T.font,
                                  outline: "none",
                                  color: T.textDark,
                                }}
                              />
                            </div>
                            <button
                              onClick={() => {
                                setPrices((p) => ({
                                  ...p,
                                  [prod.id]: tempPrice,
                                }));
                                setEditingPrice(null);
                              }}
                              style={{
                                padding: "6px 12px",
                                borderRadius: 8,
                                background: T.gold,
                                border: "none",
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: "pointer",
                                color: "#000",
                                fontFamily: T.font,
                              }}
                            >
                              {s("savePrice")}
                            </button>
                            <button
                              onClick={() => setEditingPrice(null)}
                              style={{
                                padding: "6px 10px",
                                borderRadius: 8,
                                background: "transparent",
                                border: `1px solid ${T.borderDash}`,
                                fontSize: 12,
                                cursor: "pointer",
                                color: T.textMid,
                                fontFamily: T.font,
                              }}
                            >
                              {s("cancelEdit")}
                            </button>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 17,
                                fontWeight: 900,
                                color: T.textDark,
                              }}
                            >
                              ₹{prices[prod.id]}
                            </span>
                            <button
                              onClick={() => {
                                setEditingPrice(prod.id);
                                setTempPrice(prices[prod.id]);
                              }}
                              style={{
                                padding: "5px 10px",
                                borderRadius: 8,
                                background: "transparent",
                                border: `1px solid ${T.borderDash}`,
                                fontSize: 12,
                                cursor: "pointer",
                                color: T.textMid,
                                display: "flex",
                                gap: 4,
                                alignItems: "center",
                                fontFamily: T.font,
                              }}
                            >
                              <Edit2 size={11} /> {s("editPrice")}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 99px; }
        @media (max-width: 768px) {
          aside { position: fixed; bottom: 0; left: 0; right: 0; width: 100% !important; height: auto !important;
            flex-direction: row !important; overflow-x: auto; overflow-y: hidden !important;
            border-right: none !important; border-top: 1px solid rgba(255,255,255,0.08) !important;
            z-index: 100; }
          aside > div:first-child, aside > div:nth-child(2) { display: none !important; }
          aside nav { display: flex !important; flex-direction: row !important; padding: 8px !important; gap: 4px; }
          aside nav button { flex-shrink: 0; width: auto !important; padding: 10px 14px !important; font-size: 11px !important; }
          aside > div:last-child { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */
function StatCard({
  label,
  value,
  sub,
  accent,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  accent: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: T.bgWhite,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: "20px 20px 16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: accent,
          borderRadius: "16px 16px 0 0",
        }}
      />
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: `${accent}18`,
          border: `1px solid ${accent}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent,
          marginBottom: 10,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 11,
          color: T.textLight,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "clamp(22px, 3vw, 28px)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: T.textDark,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 12, color: T.textLight, marginTop: 4 }}>
        {sub}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  action,
  badge,
}: {
  title: string;
  action?: { label: string; onClick: () => void };
  badge?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: T.textDark,
          }}
        >
          {title}
        </h3>
        {badge && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 100,
              background: T.goldSoft,
              color: "#7A5800",
              border: `1px solid ${T.goldBorder}`,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            ✦ {badge}
          </span>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: T.textMid,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            gap: 4,
            alignItems: "center",
            fontFamily: T.font,
          }}
        >
          {action.label} <ArrowUpRight size={12} />
        </button>
      )}
    </div>
  );
}

function OrderTable({
  orders,
  statuses,
  onStatusChange,
  s,
}: {
  orders: typeof ORDERS;
  statuses: Record<string, string>;
  onStatusChange: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  s: (k: string) => string;
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: T.font,
          fontSize: 13,
        }}
      >
        <thead>
          <tr style={{ borderBottom: `1px dashed ${T.borderDash}` }}>
            {[
              "Order",
              s("groups"),
              s("product"),
              s("orderValue"),
              s("members"),
              s("status"),
              s("action"),
            ].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "8px 12px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.textLight,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const st =
              orderStatusStyle[statuses[order.id]] ?? orderStatusStyle.pending;
            const isPending =
              statuses[order.id] === "pending" ||
              statuses[order.id] === "negotiating";
            return (
              <tr
                key={order.id}
                style={{ borderBottom: `1px dashed ${T.borderDash}` }}
              >
                <td
                  style={{
                    padding: "12px 12px",
                    fontWeight: 700,
                    color: T.textDark,
                    whiteSpace: "nowrap",
                  }}
                >
                  {order.id}
                </td>
                <td
                  style={{
                    padding: "12px 12px",
                    color: T.textMid,
                    whiteSpace: "nowrap",
                  }}
                >
                  {order.group}
                </td>
                <td style={{ padding: "12px 12px", color: T.textMid }}>
                  {order.products[0].name} ×{order.products[0].qty}
                </td>
                <td
                  style={{
                    padding: "12px 12px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  ₹{order.value.toLocaleString()}
                </td>
                <td style={{ padding: "12px 12px", color: T.textMid }}>
                  {order.members}
                </td>
                <td style={{ padding: "12px 12px" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 100,
                      background: st.bg,
                      color: st.color,
                      border: `1px solid ${st.border}`,
                      textTransform: "capitalize",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {statuses[order.id]}
                  </span>
                </td>
                <td style={{ padding: "12px 12px" }}>
                  {isPending ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <ActionBtn
                        color="#15803D"
                        label={s("accept")}
                        onClick={() =>
                          onStatusChange((p) => ({
                            ...p,
                            [order.id]: "accepted",
                          }))
                        }
                      />
                      <ActionBtn
                        color="#DC2626"
                        label={s("reject")}
                        onClick={() =>
                          onStatusChange((p) => ({
                            ...p,
                            [order.id]: "rejected",
                          }))
                        }
                      />
                    </div>
                  ) : (
                    <span style={{ fontSize: 12, color: T.textLight }}>—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ActionBtn({
  label,
  icon,
  color,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  color: string;
  onClick?: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
        padding: "5px 10px",
        borderRadius: 8,
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: T.font,
        transition: "all 0.15s",
        background: hov ? color : `${color}12`,
        color: hov ? "#fff" : color,
        border: `1px solid ${color}33`,
      }}
    >
      {icon}
      {label}
    </button>
  );
}
