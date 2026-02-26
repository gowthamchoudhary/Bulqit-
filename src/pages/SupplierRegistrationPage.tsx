import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Upload,
  Shield,
  Building2,
  FileText,
  MapPin,
  CreditCard,
  Truck,
  ArrowLeft,
  Award,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

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

const STR: Record<string, Record<string, string>> = {
  en: {
    pageTitle: "Supplier Registration",
    pageSub:
      "Join Bulqit as a verified supplier and connect with 500+ retailers",
    step1: "Business",
    step2: "Verification",
    step3: "Contact",
    step4: "Banking",
    step5: "Operations",
    s1title: "Business Information",
    s1sub: "Tell us about your business",
    s2title: "Verification Documents",
    s2sub: "Required for Gold Verified status",
    s3title: "Contact & Location",
    s3sub: "How retailers can reach you",
    s4title: "Banking Details",
    s4sub: "For payment settlements",
    s5title: "Operational Details",
    s5sub: "How you will serve retailers",
    note: "All suppliers are verified before onboarding. This ensures trust and quality for our retailer community.",
    companyName: "Company / Business Name",
    ownerName: "Owner / Proprietor Name",
    businessType: "Business Type",
    wholesaler: "Wholesaler",
    distributor: "Distributor",
    manufacturer: "Manufacturer",
    yearEst: "Year Established",
    numEmployees: "Number of Employees",
    gst: "GST Number",
    fssai: "FSSAI License (Food Suppliers)",
    trade: "Trade License Number",
    pan: "PAN Number",
    uploadGST: "Upload GST Certificate",
    uploadTrade: "Upload Trade License",
    uploadAddr: "Upload Address Proof",
    uploadHint: "PDF or Image, max 5MB each",
    email: "Email Address",
    phone: "Phone Number",
    warehouseAddr: "Warehouse / Office Address",
    city: "City",
    state: "State",
    pincode: "Pincode",
    bankAcc: "Bank Account Number",
    ifsc: "IFSC Code",
    accHolder: "Account Holder Name",
    deliveryRadius: "Delivery Radius (km)",
    minOrder: "Minimum Order Value (₹)",
    paymentTerms: "Payment Terms Offered",
    next: "Next Step →",
    back: "← Back",
    submit: "Submit for Verification",
    submitting: "Submitting…",
    required: "Required",
    successTitle: "Application Submitted!",
    successDesc:
      "Your account is under verification. We'll contact you within 24-48 hours.",
    gstHint: "15-character GST identification number",
    deliveryHint: "Maximum distance you can deliver to",
  },
  hi: {
    pageTitle: "सप्लायर पंजीकरण",
    pageSub: "बुल्क्विट पर सत्यापित सप्लायर के रूप में जुड़ें",
    step1: "व्यवसाय",
    step2: "सत्यापन",
    step3: "संपर्क",
    step4: "बैंकिंग",
    step5: "संचालन",
    s1title: "व्यावसायिक जानकारी",
    s1sub: "अपने व्यवसाय के बारे में बताएं",
    s2title: "सत्यापन दस्तावेज़",
    s2sub: "गोल्ड सत्यापित स्थिति के लिए आवश्यक",
    s3title: "संपर्क और स्थान",
    s3sub: "खुदरा विक्रेता आपसे कैसे संपर्क कर सकते हैं",
    s4title: "बैंकिंग विवरण",
    s4sub: "भुगतान निपटान के लिए",
    s5title: "परिचालन विवरण",
    s5sub: "आप खुदरा विक्रेताओं की सेवा कैसे करेंगे",
    note: "सभी सप्लायर को ऑनबोर्डिंग से पहले सत्यापित किया जाता है।",
    companyName: "कंपनी / व्यवसाय का नाम",
    ownerName: "मालिक / स्वामी का नाम",
    businessType: "व्यवसाय प्रकार",
    wholesaler: "थोक विक्रेता",
    distributor: "वितरक",
    manufacturer: "निर्माता",
    yearEst: "स्थापना वर्ष",
    numEmployees: "कर्मचारियों की संख्या",
    gst: "GST नंबर",
    fssai: "FSSAI लाइसेंस (खाद्य सप्लायर)",
    trade: "व्यापार लाइसेंस नंबर",
    pan: "PAN नंबर",
    uploadGST: "GST प्रमाणपत्र अपलोड करें",
    uploadTrade: "व्यापार लाइसेंस अपलोड करें",
    uploadAddr: "पता प्रमाण अपलोड करें",
    uploadHint: "PDF या छवि, अधिकतम 5MB",
    email: "ईमेल पता",
    phone: "फ़ोन नंबर",
    warehouseAddr: "गोदाम / कार्यालय का पता",
    city: "शहर",
    state: "राज्य",
    pincode: "पिनकोड",
    bankAcc: "बैंक खाता नंबर",
    ifsc: "IFSC कोड",
    accHolder: "खाता धारक का नाम",
    deliveryRadius: "डिलीवरी दायरा (km)",
    minOrder: "न्यूनतम ऑर्डर मूल्य (₹)",
    paymentTerms: "भुगतान शर्तें",
    next: "अगला →",
    back: "← वापस",
    submit: "सत्यापन के लिए जमा करें",
    submitting: "जमा हो रहा है…",
    required: "आवश्यक",
    successTitle: "आवेदन जमा हो गया!",
    successDesc:
      "आपका खाता सत्यापन के अधीन है। हम 24-48 घंटों में संपर्क करेंगे।",
    gstHint: "15 अंकों का GST पहचान नंबर",
    deliveryHint: "अधिकतम डिलीवरी दूरी",
  },
  te: {
    pageTitle: "సరఫరాదారు నమోదు",
    pageSub: "ధృవీకరించిన సరఫరాదారుగా చేరండి",
    step1: "వ్యాపారం",
    step2: "ధృవీకరణ",
    step3: "సంప్రదింపు",
    step4: "బ్యాంకింగ్",
    step5: "కార్యకలాపాలు",
    s1title: "వ్యాపార సమాచారం",
    s1sub: "మీ వ్యాపారం గురించి చెప్పండి",
    s2title: "ధృవీకరణ పత్రాలు",
    s2sub: "గోల్డ్ వెరిఫైడ్ స్టేటస్ కోసం",
    s3title: "సంప్రదింపు & స్థానం",
    s3sub: "రిటైలర్లు మిమ్మల్ని ఎలా సంప్రదించగలరు",
    s4title: "బ్యాంకింగ్ వివరాలు",
    s4sub: "చెల్లింపు పరిష్కారాల కోసం",
    s5title: "కార్యాచరణ వివరాలు",
    s5sub: "మీరు రిటైలర్లకు సేవ చేసే విధానం",
    note: "అన్ని సరఫరాదారులు ఆన్‌బోర్డింగ్ కంటే ముందే ధృవీకరించబడతారు.",
    companyName: "కంపెనీ పేరు",
    ownerName: "యజమాని పేరు",
    businessType: "వ్యాపార రకం",
    wholesaler: "హోల్‌సేలర్",
    distributor: "డిస్ట్రిబ్యూటర్",
    manufacturer: "తయారీదారు",
    yearEst: "స్థాపించిన సంవత్సరం",
    numEmployees: "ఉద్యోగుల సంఖ్య",
    gst: "GST నంబర్",
    fssai: "FSSAI లైసెన్స్",
    trade: "వ్యాపార లైసెన్స్ నంబర్",
    pan: "PAN నంబర్",
    uploadGST: "GST సర్టిఫికేట్ అప్‌లోడ్ చేయండి",
    uploadTrade: "ట్రేడ్ లైసెన్స్ అప్‌లోడ్",
    uploadAddr: "చిరునామా రుజువు అప్‌లోడ్",
    uploadHint: "PDF లేదా చిత్రం, గరిష్టంగా 5MB",
    email: "ఇమెయిల్ చిరునామా",
    phone: "ఫోన్ నంబర్",
    warehouseAddr: "గిడ్డంగి / కార్యాలయ చిరునామా",
    city: "నగరం",
    state: "రాష్ట్రం",
    pincode: "పిన్‌కోడ్",
    bankAcc: "బ్యాంక్ ఖాతా నంబర్",
    ifsc: "IFSC కోడ్",
    accHolder: "ఖాతా దారు పేరు",
    deliveryRadius: "డెలివరీ పరిధి (km)",
    minOrder: "కనిష్ట ఆర్డర్ విలువ (₹)",
    paymentTerms: "చెల్లింపు నిబంధనలు",
    next: "తదుపరి →",
    back: "← వెనుకకు",
    submit: "ధృవీకరణకు సమర్పించండి",
    submitting: "సమర్పిస్తున్నాం…",
    required: "అవసరం",
    successTitle: "దరఖాస్తు సమర్పించబడింది!",
    successDesc: "మీ ఖాతా ధృవీకరణలో ఉంది. మేము 24-48 గంటల్లో సంప్రదిస్తాం.",
    gstHint: "15 అక్షరాల GST గుర్తింపు నంబర్",
    deliveryHint: "గరిష్ట డెలివరీ దూరం",
  },
  ta: {
    pageTitle: "சப்ளையர் பதிவு",
    pageSub: "சரிபார்க்கப்பட்ட சப்ளையராக சேருங்கள்",
    step1: "வணிகம்",
    step2: "சரிபார்ப்பு",
    step3: "தொடர்பு",
    step4: "வங்கி",
    step5: "செயல்பாடு",
    s1title: "வணிக தகவல்",
    s1sub: "உங்கள் வணிகத்தைப் பற்றி கூறுங்கள்",
    s2title: "சரிபார்ப்பு ஆவணங்கள்",
    s2sub: "தங்க சரிபார்ப்பு நிலைக்கு தேவை",
    s3title: "தொடர்பு & இடம்",
    s3sub: "சில்லறை வியாபாரிகள் உங்களை எவ்வாறு அணுகலாம்",
    s4title: "வங்கி விவரங்கள்",
    s4sub: "கட்டண தீர்வுகளுக்கு",
    s5title: "செயல்பாட்டு விவரங்கள்",
    s5sub: "நீங்கள் சில்லறை வியாபாரிகளுக்கு எவ்வாறு சேவை செய்வீர்கள்",
    note: "அனைத்து சப்ளையர்களும் ஆன்போர்டிங்கிற்கு முன் சரிபார்க்கப்படுகிறார்கள்.",
    companyName: "நிறுவன பெயர்",
    ownerName: "உரிமையாளர் பெயர்",
    businessType: "வணிக வகை",
    wholesaler: "மொத்த வியாபாரி",
    distributor: "விநியோகஸ்தர்",
    manufacturer: "உற்பத்தியாளர்",
    yearEst: "நிறுவப்பட்ட ஆண்டு",
    numEmployees: "ஊழியர்கள் எண்ணிக்கை",
    gst: "GST எண்",
    fssai: "FSSAI உரிமம்",
    trade: "வணிக உரிம எண்",
    pan: "PAN எண்",
    uploadGST: "GST சான்றிதழ் பதிவேற்றுக",
    uploadTrade: "வணிக உரிமை பதிவேற்றுக",
    uploadAddr: "முகவரி சான்று பதிவேற்றுக",
    uploadHint: "PDF அல்லது படம், அதிகபட்சம் 5MB",
    email: "மின்னஞ்சல் முகவரி",
    phone: "தொலைபேசி எண்",
    warehouseAddr: "கிடங்கு / அலுவலக முகவரி",
    city: "நகரம்",
    state: "மாநிலம்",
    pincode: "அஞ்சல் குறியீடு",
    bankAcc: "வங்கி கணக்கு எண்",
    ifsc: "IFSC குறியீடு",
    accHolder: "கணக்குதாரர் பெயர்",
    deliveryRadius: "விநியோக ஆரம் (km)",
    minOrder: "குறைந்தபட்ச ஆர்டர் மதிப்பு (₹)",
    paymentTerms: "கட்டண விதிமுறைகள்",
    next: "அடுத்தது →",
    back: "← பின்செல்",
    submit: "சரிபார்ப்புக்கு சமர்ப்பிக்கவும்",
    submitting: "சமர்ப்பிக்கிறது…",
    required: "தேவை",
    successTitle: "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது!",
    successDesc:
      "உங்கள் கணக்கு சரிபார்ப்பில் உள்ளது. 24-48 மணி நேரத்தில் தொடர்பு கொள்கிறோம்.",
    gstHint: "15 எழுத்து GST அடையாள எண்",
    deliveryHint: "அதிகபட்ச டெலிவரி தூரம்",
  },
  ml: {
    pageTitle: "വിതരണക്കാരൻ രജിസ്ട്രേഷൻ",
    pageSub: "ബൾക്വിറ്റിൽ സ്ഥിരീകരിച്ച വിതരണക്കാരനായി ചേരുക",
    step1: "ബിസിനസ്",
    step2: "പരിശോധന",
    step3: "ബന്ധം",
    step4: "ബാങ്കിംഗ്",
    step5: "പ്രവർത്തനം",
    s1title: "ബിസിനസ് വിവരങ്ങൾ",
    s1sub: "നിങ്ങളുടെ ബിസിനസ്സിനെ കുറിച്ച് പറയൂ",
    s2title: "പരിശോധനാ രേഖകൾ",
    s2sub: "ഗോൾഡ് വെരിഫൈഡ് സ്ഥിതിക്ക് ആവശ്യമാണ്",
    s3title: "ബന്ധം & സ്ഥാനം",
    s3sub: "റീട്ടെയിലർമാർ നിങ്ങളെ എങ്ങനെ ബന്ധപ്പെടാം",
    s4title: "ബാങ്കിംഗ് വിവരങ്ങൾ",
    s4sub: "പേയ്‌മെന്റ് തീർപ്പാക്കലുകൾക്ക്",
    s5title: "പ്രവർത്തന വിവരങ്ങൾ",
    s5sub: "നിങ്ങൾ റീട്ടെയിലർമാർക്ക് എങ്ങനെ സേവനം നൽകും",
    note: "എല്ലാ വിതരണക്കാരും ഓൺബോർഡിംഗിന് മുമ്പ് പരിശോധിക്കപ്പെടുന്നു.",
    companyName: "കമ്പനി / ബിസിനസ് പേര്",
    ownerName: "ഉടമ / ഉടമ്പടി ഉടമ പേര്",
    businessType: "ബിസിനസ് തരം",
    wholesaler: "മൊത്ത വ്യാപാരി",
    distributor: "വിതരണക്കാരൻ",
    manufacturer: "നിർമ്മാതാവ്",
    yearEst: "സ്ഥാപിത വർഷം",
    numEmployees: "ജീവനക്കാരുടെ എണ്ണം",
    gst: "GST നമ്പർ",
    fssai: "FSSAI ലൈസൻസ്",
    trade: "ട്രേഡ് ലൈസൻസ് നമ്പർ",
    pan: "PAN നമ്പർ",
    uploadGST: "GST സർട്ടിഫിക്കറ്റ് അപ്‌ലോഡ് ചെയ്യുക",
    uploadTrade: "ട്രേഡ് ലൈസൻസ് അപ്‌ലോഡ് ചെയ്യുക",
    uploadAddr: "വിലാസ തെളിവ് അപ്‌ലോഡ് ചെയ്യുക",
    uploadHint: "PDF അല്ലെങ്കിൽ ചിത്രം, പരമാവധി 5MB",
    email: "ഇമെയിൽ വിലാസം",
    phone: "ഫോൺ നമ്പർ",
    warehouseAddr: "വെയർഹൗസ് / ഓഫീസ് വിലാസം",
    city: "നഗരം",
    state: "സംസ്ഥാനം",
    pincode: "പിൻകോഡ്",
    bankAcc: "ബാങ്ക് അക്കൗണ്ട് നമ്പർ",
    ifsc: "IFSC കോഡ്",
    accHolder: "അക്കൗണ്ട് ഉടമയുടെ പേര്",
    deliveryRadius: "ഡെലിവറി ദൂരം (km)",
    minOrder: "ഏറ്റവും കുറഞ്ഞ ഓർഡർ മൂല്യം (₹)",
    paymentTerms: "പേയ്‌മെന്റ് നിബന്ധനകൾ",
    next: "അടുത്തത് →",
    back: "← തിരികെ",
    submit: "പരിശോധനയ്ക്കായി സമർപ്പിക്കുക",
    submitting: "സമർപ്പിക്കുന്നു…",
    required: "ആവശ്യമാണ്",
    successTitle: "അപേക്ഷ സമർപ്പിച്ചു!",
    successDesc:
      "നിങ്ങളുടെ അക്കൗണ്ട് പരിശോധനയിലാണ്. 24-48 മണിക്കൂറിനുള്ളിൽ ബന്ധപ്പെടും.",
    gstHint: "15 അക്ഷര GST തിരിച്ചറിയൽ നമ്പർ",
    deliveryHint: "പരമാവധി ഡെലിവറി ദൂരം",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   STEP CONFIG
───────────────────────────────────────────────────────────────────────────── */
const STEP_ICONS = [Building2, Shield, MapPin, CreditCard, Truck];

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export function SupplierRegistrationPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    ownerName: "",
    type: "" as "wholesaler" | "distributor" | "manufacturer" | "",
    establishedYear: "",
    numberOfEmployees: "",
    gstNumber: "",
    fssaiLicense: "",
    tradeLicense: "",
    panNumber: "",
    email: "",
    phone: "",
    warehouseAddress: "",
    city: "",
    pincode: "",
    bankAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    deliveryRadius: "",
    minOrderValue: "",
    paymentTerms: [] as string[],
    uploads: { gst: false, trade: false, address: false },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const s = (k: string) => STR[lang]?.[k] ?? STR.en[k] ?? k;
  const curLang = LANGS.find((l) => l.code === lang)!;

  const set = (field: string, val: unknown) => {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field])
      setErrors((p) => {
        const n = { ...p };
        delete n[field];
        return n;
      });
  };

  const validate = (n: number) => {
    const e: Record<string, string> = {};
    if (n === 1) {
      if (!form.companyName) e.companyName = s("required");
      if (!form.ownerName) e.ownerName = s("required");
      if (!form.type) e.type = s("required");
      if (!form.establishedYear) e.establishedYear = s("required");
    }
    if (n === 2) {
      if (!form.gstNumber) e.gstNumber = s("required");
      if (!form.panNumber) e.panNumber = s("required");
      if (!form.tradeLicense) e.tradeLicense = s("required");
    }
    if (n === 3) {
      if (!form.email) e.email = s("required");
      if (!form.phone) e.phone = s("required");
      if (!form.warehouseAddress) e.warehouseAddress = s("required");
      if (!form.city) e.city = s("required");
      if (!form.pincode) e.pincode = s("required");
    }
    if (n === 4) {
      if (!form.bankAccountNumber) e.bankAccountNumber = s("required");
      if (!form.ifscCode) e.ifscCode = s("required");
    }
    if (n === 5) {
      if (!form.deliveryRadius) e.deliveryRadius = s("required");
      if (!form.minOrderValue) e.minOrderValue = s("required");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((p) => p + 1);
    else toast.error("Please fill all required fields");
  };

  const handleSubmit = async () => {
    if (!validate(5)) {
      toast.error("Please complete all fields");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    const supplier = {
      id: `sup_${Date.now()}`,
      ...form,
      verified: false,
      verificationStatus: "pending",
      joinedDate: new Date().toISOString(),
      metrics: {
        totalOrders: 0,
        completedOrders: 0,
        fulfillmentRate: 0,
        rating: 0,
      },
    };
    localStorage.setItem("currentSupplier", JSON.stringify(supplier));
    setSubmitting(false);
    setSuccess(true);
    toast.success(s("successTitle"), { description: s("successDesc") });
    setTimeout(() => navigate("/supplier/dashboard"), 3500);
  };

  /* ── SUCCESS SCREEN ── */
  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          fontFamily: T.font,
          color: T.textDark,
          background: "#0D0D0D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(255,184,0,0.08) 0%, transparent 60%)`,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: 28,
            padding: "clamp(32px,5vw,56px)",
            maxWidth: 480,
            width: "100%",
            textAlign: "center",
            boxShadow: `0 0 0 1px ${T.goldBorder}, 0 24px 80px rgba(255,184,0,0.12)`,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              margin: "0 auto 24px",
              background: T.goldSoft,
              border: `2px solid ${T.goldBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <Award size={36} color={T.gold} />
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16,
              background: "linear-gradient(135deg, #FFB800, #FFD700, #CC8800)",
              borderRadius: 100,
              padding: "5px 16px",
              boxShadow: "0 4px 16px rgba(255,184,0,0.45)",
            }}
          >
            <Award size={12} color="#3A2000" fill="#3A2000" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#3A2000",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Gold Verified — Pending Review
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(22px,3.5vw,30px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: 10,
            }}
          >
            {s("successTitle")}
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            {s("successDesc")}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              textAlign: "left",
            }}
          >
            {[
              { label: "Document Review", time: "24 hours", done: true },
              { label: "GST Verification", time: "24 hours", done: true },
              { label: "Bank Verification", time: "48 hours", done: false },
              { label: "Gold Badge Awarded", time: "After all", done: false },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: item.done
                    ? "rgba(34,197,94,0.06)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${item.done ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <CheckCircle
                  size={15}
                  color={item.done ? "#22C55E" : "rgba(255,255,255,0.2)"}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: item.done ? "#fff" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {item.label}
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.2)",
              marginTop: 24,
            }}
          >
            Redirecting to dashboard…
          </div>
        </div>
        <style>{`@keyframes popIn{0%{transform:scale(0.5);opacity:0}100%{transform:scale(1);opacity:1}}`}</style>
      </div>
    );
  }

  /* ── REGISTRATION FORM ── */
  const stepTitles = [
    s("step1"),
    s("step2"),
    s("step3"),
    s("step4"),
    s("step5"),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: T.font,
        color: T.textDark,
        backgroundColor: T.bg,
        backgroundImage: `linear-gradient(${T.borderDash} 1px, transparent 1px), linear-gradient(90deg, ${T.borderDash} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          background: "#0D0D0D",
          padding: "clamp(12px,2vw,20px) clamp(20px,4vw,48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              display: "flex",
              gap: 6,
              alignItems: "center",
              fontSize: 13,
              fontFamily: T.font,
            }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#fff",
              }}
            >
              bulqit<span style={{ color: T.gold }}>.</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.3)",
                  marginLeft: 6,
                }}
              >
                Supplier Portal
              </span>
            </div>
          </div>
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
              fontSize: 13,
              fontWeight: 600,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              cursor: "pointer",
              fontFamily: T.font,
            }}
          >
            <Globe size={13} color="rgba(255,255,255,0.5)" />
            {curLang.native}
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
              ▾
            </span>
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
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                  padding: 6,
                  minWidth: 180,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
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
                      background: l.code === lang ? T.goldSoft : "transparent",
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
                        color: l.code === lang ? "#7A5800" : "#fff",
                      }}
                    >
                      {l.native}
                    </span>
                    <span
                      style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}
                    >
                      {l.label}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "clamp(24px,4vw,48px) clamp(16px,3vw,24px)",
        }}
      >
        {/* Page hero */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 14,
              background: "linear-gradient(135deg, #FFB800, #FFD700, #CC8800)",
              borderRadius: 100,
              padding: "6px 16px",
              boxShadow: "0 4px 20px rgba(255,184,0,0.35)",
            }}
          >
            <Award size={14} color="#3A2000" fill="#3A2000" />
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#3A2000",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Gold Verified Supplier Program
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(24px,4vw,38px)",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              marginBottom: 10,
            }}
          >
            {s("pageTitle")}
          </h1>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.7 }}>
            {s("pageSub")}
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {[1, 2, 3, 4, 5].map((n, i) => {
              const Icon = STEP_ICONS[i];
              const done = step > n;
              const active = step === n;
              return (
                <div
                  key={n}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: n < 5 ? 1 : 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: done ? T.gold : active ? T.textDark : T.bg,
                        border: done
                          ? `2px solid ${T.gold}`
                          : active
                            ? `2px solid ${T.textDark}`
                            : `2px solid ${T.borderDash}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.25s ease",
                        boxShadow: active
                          ? "0 4px 16px rgba(0,0,0,0.18)"
                          : done
                            ? "0 4px 16px rgba(255,184,0,0.3)"
                            : "none",
                      }}
                    >
                      {done ? (
                        <CheckCircle
                          size={18}
                          color="#3A2000"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Icon size={17} color={active ? "#fff" : T.textLight} />
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: active ? 700 : 500,
                        color: active ? T.textDark : T.textLight,
                        whiteSpace: "nowrap",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {stepTitles[i]}
                    </span>
                  </div>
                  {n < 5 && (
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        margin: "0 6px 18px",
                        borderRadius: 100,
                        background: done ? T.gold : T.borderDash,
                        transition: "background 0.3s",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form card */}
        <div
          style={{
            background: T.bgWhite,
            border: `1px solid ${T.border}`,
            borderRadius: 24,
            padding: "clamp(24px,4vw,40px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}
        >
          {/* Step header */}
          <div style={{ marginBottom: 28 }}>
            <h2
              style={{
                fontSize: "clamp(18px,2.5vw,24px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: 6,
              }}
            >
              {s(`s${step}title`)}
            </h2>
            <p style={{ fontSize: 13, color: T.textMid }}>{s(`s${step}sub`)}</p>
          </div>

          {/* ── STEP 1: BUSINESS INFO ── */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Info note */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: "rgba(100,116,240,0.07)",
                  border: "1px solid rgba(100,116,240,0.18)",
                }}
              >
                <Shield
                  size={16}
                  color="#3D4FD6"
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                <div
                  style={{ fontSize: 13, color: T.textMid, lineHeight: 1.6 }}
                >
                  <strong style={{ color: "#3D4FD6" }}>
                    Supplier Verification Program —{" "}
                  </strong>
                  {s("note")}
                </div>
              </div>

              <FormField
                label={s("companyName")}
                required
                error={errors.companyName}
              >
                <SI
                  placeholder="Karnataka Grains & Co."
                  value={form.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                  error={!!errors.companyName}
                />
              </FormField>

              <FormField
                label={s("ownerName")}
                required
                error={errors.ownerName}
              >
                <SI
                  placeholder="Rajesh Kumar"
                  value={form.ownerName}
                  onChange={(e) => set("ownerName", e.target.value)}
                  error={!!errors.ownerName}
                />
              </FormField>

              <FormField label={s("businessType")} required error={errors.type}>
                <select
                  value={form.type}
                  onChange={(e) => set("type", e.target.value)}
                  style={{
                    width: "100%",
                    fontFamily: T.font,
                    fontSize: 14,
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: `1px solid ${errors.type ? "#DC2626" : T.border}`,
                    background: T.bg,
                    color: form.type ? T.textDark : T.textLight,
                    outline: "none",
                  }}
                >
                  <option value="">Select type…</option>
                  <option value="wholesaler">{s("wholesaler")}</option>
                  <option value="distributor">{s("distributor")}</option>
                  <option value="manufacturer">{s("manufacturer")}</option>
                </select>
              </FormField>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <FormField
                  label={s("yearEst")}
                  required
                  error={errors.establishedYear}
                >
                  <SI
                    type="number"
                    placeholder="2010"
                    value={form.establishedYear}
                    onChange={(e) => set("establishedYear", e.target.value)}
                    error={!!errors.establishedYear}
                  />
                </FormField>
                <FormField label={s("numEmployees")}>
                  <SI
                    type="number"
                    placeholder="25"
                    value={form.numberOfEmployees}
                    onChange={(e) => set("numberOfEmployees", e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* ── STEP 2: VERIFICATION DOCS ── */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <FormField
                label={s("gst")}
                required
                error={errors.gstNumber}
                hint={s("gstHint")}
              >
                <SI
                  placeholder="29ABCDE1234F1Z5"
                  value={form.gstNumber}
                  maxLength={15}
                  onChange={(e) =>
                    set("gstNumber", e.target.value.toUpperCase())
                  }
                  error={!!errors.gstNumber}
                />
              </FormField>
              <FormField
                label={s("fssai")}
                hint="14-digit number (only for food/FMCG suppliers)"
              >
                <SI
                  placeholder="12345678901234"
                  value={form.fssaiLicense}
                  maxLength={14}
                  onChange={(e) => set("fssaiLicense", e.target.value)}
                />
              </FormField>
              <FormField
                label={s("trade")}
                required
                error={errors.tradeLicense}
              >
                <SI
                  placeholder="TL/2020/12345"
                  value={form.tradeLicense}
                  onChange={(e) => set("tradeLicense", e.target.value)}
                  error={!!errors.tradeLicense}
                />
              </FormField>
              <FormField label={s("pan")} required error={errors.panNumber}>
                <SI
                  placeholder="ABCDE1234F"
                  value={form.panNumber}
                  maxLength={10}
                  onChange={(e) =>
                    set("panNumber", e.target.value.toUpperCase())
                  }
                  error={!!errors.panNumber}
                />
              </FormField>

              {/* Upload boxes */}
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.textDark,
                    marginBottom: 10,
                  }}
                >
                  Upload Documents
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {(
                    [
                      { key: "gst", label: s("uploadGST") },
                      { key: "trade", label: s("uploadTrade") },
                      { key: "address", label: s("uploadAddr") },
                    ] as { key: "gst" | "trade" | "address"; label: string }[]
                  ).map((doc) => (
                    <button
                      key={doc.key}
                      onClick={() =>
                        set("uploads", { ...form.uploads, [doc.key]: true })
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "13px 16px",
                        borderRadius: 12,
                        cursor: "pointer",
                        fontFamily: T.font,
                        background: form.uploads[doc.key]
                          ? "rgba(34,197,94,0.06)"
                          : T.bg,
                        border: `1.5px dashed ${form.uploads[doc.key] ? "rgba(34,197,94,0.35)" : T.borderDash}`,
                        transition: "all 0.15s",
                      }}
                    >
                      {form.uploads[doc.key] ? (
                        <CheckCircle size={16} color="#22C55E" />
                      ) : (
                        <Upload size={16} color={T.textLight} />
                      )}
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: form.uploads[doc.key] ? "#15803D" : T.textMid,
                        }}
                      >
                        {form.uploads[doc.key] ? "✓ " + doc.label : doc.label}
                      </span>
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: T.textLight, marginTop: 8 }}>
                  {s("uploadHint")}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: CONTACT & LOCATION ── */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <FormField label={s("email")} required error={errors.email}>
                  <SI
                    type="email"
                    placeholder="contact@yourstore.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    error={!!errors.email}
                  />
                </FormField>
                <FormField label={s("phone")} required error={errors.phone}>
                  <SI
                    placeholder="9876543210"
                    value={form.phone}
                    maxLength={10}
                    onChange={(e) => set("phone", e.target.value)}
                    error={!!errors.phone}
                  />
                </FormField>
              </div>
              <FormField
                label={s("warehouseAddr")}
                required
                error={errors.warehouseAddress}
              >
                <textarea
                  rows={3}
                  placeholder="Plot 45, Industrial Area, Yeshwanthpur"
                  value={form.warehouseAddress}
                  onChange={(e) => set("warehouseAddress", e.target.value)}
                  style={{
                    width: "100%",
                    fontFamily: T.font,
                    fontSize: 14,
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: `1px solid ${errors.warehouseAddress ? "#DC2626" : T.border}`,
                    background: T.bg,
                    color: T.textDark,
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.6,
                  }}
                />
              </FormField>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 12,
                }}
              >
                <FormField label={s("city")} required error={errors.city}>
                  <SI
                    placeholder="Bengaluru"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    error={!!errors.city}
                  />
                </FormField>
                <FormField label={s("state")}>
                  <SI value="Karnataka" disabled />
                </FormField>
                <FormField label={s("pincode")} required error={errors.pincode}>
                  <SI
                    placeholder="560022"
                    value={form.pincode}
                    maxLength={6}
                    onChange={(e) => set("pincode", e.target.value)}
                    error={!!errors.pincode}
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* ── STEP 4: BANKING ── */}
          {step === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: T.goldSoft,
                  border: `1px solid ${T.goldBorder}`,
                }}
              >
                <Shield
                  size={15}
                  color="#7A5800"
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                <div
                  style={{ fontSize: 13, color: "#7A5800", lineHeight: 1.6 }}
                >
                  <strong>Secure & Encrypted.</strong> Your banking details are
                  stored with bank-grade encryption and used only for payment
                  settlements.
                </div>
              </div>
              <FormField
                label={s("bankAcc")}
                required
                error={errors.bankAccountNumber}
              >
                <SI
                  placeholder="1234567890"
                  value={form.bankAccountNumber}
                  onChange={(e) => set("bankAccountNumber", e.target.value)}
                  error={!!errors.bankAccountNumber}
                />
              </FormField>
              <FormField label={s("ifsc")} required error={errors.ifscCode}>
                <SI
                  placeholder="SBIN0001234"
                  value={form.ifscCode}
                  maxLength={11}
                  onChange={(e) =>
                    set("ifscCode", e.target.value.toUpperCase())
                  }
                  error={!!errors.ifscCode}
                />
              </FormField>
              <FormField label={s("accHolder")}>
                <SI
                  placeholder="Karnataka Grains & Co."
                  value={form.accountHolderName}
                  onChange={(e) => set("accountHolderName", e.target.value)}
                />
              </FormField>
            </div>
          )}

          {/* ── STEP 5: OPERATIONS ── */}
          {step === 5 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <FormField
                label={s("deliveryRadius")}
                required
                error={errors.deliveryRadius}
                hint={s("deliveryHint")}
              >
                <SI
                  type="number"
                  placeholder="20"
                  value={form.deliveryRadius}
                  onChange={(e) => set("deliveryRadius", e.target.value)}
                  error={!!errors.deliveryRadius}
                />
              </FormField>
              <FormField
                label={s("minOrder")}
                required
                error={errors.minOrderValue}
              >
                <SI
                  type="number"
                  placeholder="5000"
                  value={form.minOrderValue}
                  onChange={(e) => set("minOrderValue", e.target.value)}
                  error={!!errors.minOrderValue}
                />
              </FormField>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.textDark,
                    marginBottom: 10,
                  }}
                >
                  {s("paymentTerms")}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    "Pay on Delivery",
                    "Net-15",
                    "Net-30",
                    "Advance Payment",
                  ].map((term) => {
                    const checked = form.paymentTerms.includes(term);
                    return (
                      <button
                        key={term}
                        onClick={() => {
                          const newTerms = checked
                            ? form.paymentTerms.filter((t) => t !== term)
                            : [...form.paymentTerms, term];
                          set("paymentTerms", newTerms);
                        }}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 100,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: T.font,
                          transition: "all 0.15s",
                          background: checked ? T.textDark : T.bg,
                          color: checked ? "#fff" : T.textMid,
                          border: `1px solid ${checked ? T.textDark : T.borderDash}`,
                        }}
                      >
                        {checked && "✓ "}
                        {term}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Final summary */}
              <div
                style={{
                  background: T.bg,
                  border: `1px dashed ${T.borderDash}`,
                  borderRadius: 14,
                  padding: 20,
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: T.textDark,
                    marginBottom: 12,
                  }}
                >
                  Registration Summary
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  {[
                    { label: "Company", val: form.companyName || "—" },
                    { label: "Type", val: form.type || "—", cap: true },
                    { label: "GST", val: form.gstNumber || "—" },
                    { label: "City", val: form.city || "—" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: T.textLight }}>{row.label}</span>
                      <span
                        style={{
                          fontWeight: 700,
                          color: T.textDark,
                          textTransform: row.cap ? "capitalize" : "none",
                        }}
                      >
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 32,
              paddingTop: 24,
              borderTop: `1px dashed ${T.borderDash}`,
            }}
          >
            {step > 1 ? (
              <button
                onClick={() => setStep((p) => p - 1)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "11px 22px",
                  borderRadius: 100,
                  background: "transparent",
                  border: `1px solid ${T.borderDash}`,
                  color: T.textMid,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: T.font,
                }}
              >
                {s("back")}
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                onClick={next}
                style={{
                  padding: "12px 28px",
                  borderRadius: 100,
                  background: T.textDark,
                  color: "#fff",
                  border: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: T.font,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                }}
              >
                {s("next")}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 28px",
                  borderRadius: 100,
                  border: "none",
                  background: submitting ? "#E8E7E4" : T.gold,
                  color: submitting ? T.textLight : "#000",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontFamily: T.font,
                  boxShadow: submitting
                    ? "none"
                    : "0 6px 24px rgba(255,184,0,0.40)",
                }}
              >
                {submitting ? (
                  <>
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        border: "2px solid rgba(0,0,0,0.15)",
                        borderTopColor: T.textMid,
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    {s("submitting")}
                  </>
                ) : (
                  <>
                    <Award size={15} /> {s("submit")}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: 20,
          }}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              style={{
                width: step === n ? 24 : 6,
                height: 6,
                borderRadius: 100,
                background:
                  step > n ? T.gold : step === n ? T.textDark : T.borderDash,
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} *{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}

/* ── Micro components ── */
function FormField({
  label,
  children,
  required,
  error,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <label
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: T.textDark,
          display: "block",
          marginBottom: 7,
        }}
      >
        {label}
        {required && <span style={{ color: T.gold, marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {hint && !error && (
        <div style={{ fontSize: 11, color: T.textLight, marginTop: 5 }}>
          {hint}
        </div>
      )}
      {error && (
        <div style={{ fontSize: 12, color: "#DC2626", marginTop: 5 }}>
          {error}
        </div>
      )}
    </div>
  );
}

function SI(
  props: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean },
) {
  const { error, ...rest } = props;
  return (
    <input
      {...rest}
      style={{
        width: "100%",
        fontFamily: T.font,
        fontSize: 14,
        padding: "11px 14px",
        borderRadius: 10,
        border: `1px solid ${error ? "#DC2626" : T.border}`,
        background: props.disabled ? "#E8E7E4" : T.bg,
        color: props.disabled ? T.textLight : T.textDark,
        outline: "none",
        ...props.style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#111";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.06)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = error ? "#DC2626" : T.border;
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}
