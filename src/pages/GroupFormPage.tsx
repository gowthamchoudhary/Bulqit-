import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { calculateSavings, formatCurrency } from "@/hooks/useSavingsCalc";
import { generateEmail } from "@/hooks/useEmailGenerator";
import { saveGroup, saveEmail } from "@/lib/storage";
import { ChevronRight, Calculator, TrendingUp } from "lucide-react";

const categories = [
  "Groceries",
  "Spices",
  "Stationery",
  "Beverages",
  "Dairy",
  "Bakery",
  "Hotel Supplies",
];
const frequencies = ["Weekly", "Bi-weekly", "Monthly"] as const;

export default function GroupFormPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [frequency, setFrequency] =
    useState<(typeof frequencies)[number]>("Monthly");
  const [yourValue, setYourValue] = useState(0);
  const [partnerValue, setPartnerValue] = useState(0);

  if (!isAuthenticated) return <Navigate to="/register" replace />;

  const toggleCat = (c: string) =>
    setSelectedCats((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const savings = calculateSavings(yourValue, partnerValue);

  const handleCreateGroup = () => {
    const name = groupName || `${selectedCats[0] || "Retail"} Alliance`;
    saveGroup({
      id: "g_" + Date.now(),
      name,
      status: "forming",
      members: [
        {
          retailerId: user!.id,
          storeName: user!.storeName,
          joinedAt: new Date().toISOString(),
        },
      ],
      targetMembers: 5,
      products: selectedCats.map((c) => ({
        name: c,
        quantity: 0,
        contributions: {},
      })),
      supplierId: "",
      supplierName: "",
      totalValue: savings.total,
      estimatedSavings: savings.yourSavings,
      savingsPercent: savings.discountPercent,
      discountTier: {
        minQuantity: 0,
        maxQuantity: 0,
        discountPercent: savings.discountPercent,
      },
      createdDate: new Date().toISOString(),
      orderDeadline: new Date(Date.now() + 7 * 86400000).toISOString(),
      frequency,
    } satisfies import("@/types/retailer").BuyingGroup);
    navigate("/dashboard");
  };

  const handleGenerateEmail = () => {
    const name = groupName || `${selectedCats[0] || "Retail"} Alliance`;
    const email = generateEmail(name, selectedCats, savings.total, 2);
    saveEmail(email);
    navigate("/email-result", { state: email });
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-amber-400 transition-colors"
          >
            Dashboard
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-amber-400 font-medium">
            Form a Buying Group
          </span>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            Form a Buying Group
          </h1>
          <p className="text-slate-400 text-lg">
            Join forces with other retailers to unlock bulk discounts and save
            on every order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                Group Name (optional)
              </label>
              <input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. Grocery Alliance"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                Product Categories
              </label>
              <div className="flex flex-wrap gap-3">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCat(c)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      selectedCats.includes(c)
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-lg shadow-amber-500/25"
                        : "border border-slate-700 bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                Order Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              >
                {frequencies.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Order values */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Your Order Value (₹)
                </label>
                <input
                  type="number"
                  value={yourValue || ""}
                  onChange={(e) => setYourValue(+e.target.value)}
                  placeholder="50000"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Partner's Value (₹)
                </label>
                <input
                  type="number"
                  value={partnerValue || ""}
                  onChange={(e) => setPartnerValue(+e.target.value)}
                  placeholder="60000"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleCreateGroup}
                className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-4 text-base font-bold text-slate-900 hover:from-amber-400 hover:to-yellow-400 transition-all duration-200 shadow-lg shadow-amber-500/20"
              >
                Create Group
              </button>
              <button
                onClick={handleGenerateEmail}
                className="flex-1 rounded-xl border-2 border-amber-500/50 bg-slate-800/60 py-4 text-base font-bold text-amber-400 hover:bg-amber-500/10 transition-all duration-200"
              >
                Generate AI Email
              </button>
            </div>
          </div>

          {/* Live Calculator */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 h-fit sticky top-24 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500">
                <Calculator className="h-5 w-5 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Live Savings Calculator
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Your Order</span>
                <span className="font-semibold text-white">
                  {formatCurrency(yourValue)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Partner's Order</span>
                <span className="font-semibold text-white">
                  {formatCurrency(partnerValue)}
                </span>
              </div>
              <div className="border-t border-slate-700 pt-4 flex justify-between text-sm">
                <span className="text-slate-400">Total Group Value</span>
                <span className="font-bold text-white">
                  {formatCurrency(savings.total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Discount Unlocked</span>
                <span className="font-bold text-amber-400">
                  {savings.discountPercent}%
                </span>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 p-5 mt-4 border border-amber-500/20">
                <div className="flex items-center gap-2 text-sm text-amber-400 mb-2">
                  <TrendingUp className="h-4 w-4" /> Your Savings
                </div>
                <p className="text-3xl font-extrabold text-white">
                  {formatCurrency(savings.yourSavings)}
                </p>
                <p className="text-xs text-slate-400 mt-1">per order cycle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
