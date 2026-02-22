import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { calculateSavings, formatCurrency } from '@/hooks/useSavingsCalc';
import { generateEmail } from '@/hooks/useEmailGenerator';
import { saveGroup, saveEmail } from '@/lib/storage';
import { ChevronRight, Calculator, TrendingUp } from 'lucide-react';

const categories = ['Medicines', 'Groceries', 'Spices', 'Electronics', 'Stationery', 'Beverages', 'Personal Care', 'Dairy'];
const frequencies = ['Weekly', 'Bi-weekly', 'Monthly'] as const;

export default function GroupFormPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<typeof frequencies[number]>('Monthly');
  const [yourValue, setYourValue] = useState(0);
  const [partnerValue, setPartnerValue] = useState(0);

  if (!isAuthenticated) return <Navigate to="/register" replace />;

  const toggleCat = (c: string) => setSelectedCats((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  const savings = calculateSavings(yourValue, partnerValue);

  const handleCreateGroup = () => {
    const name = groupName || `${selectedCats[0] || 'Retail'} Alliance`;
    saveGroup({
      id: 'g_' + Date.now(),
      name,
      categories: selectedCats,
      frequency,
      members: [user!.id],
      totalValue: savings.total,
      createdDate: new Date().toISOString(),
    });
    navigate('/dashboard');
  };

  const handleGenerateEmail = () => {
    const name = groupName || `${selectedCats[0] || 'Retail'} Alliance`;
    const email = generateEmail(name, selectedCats, savings.total, 2);
    saveEmail(email);
    navigate('/email-result', { state: email });
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <button onClick={() => navigate('/dashboard')} className="hover:text-foreground">Dashboard</button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Create Group</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-6">Form a Buying Group</h1>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3 space-y-5 rounded-xl border border-border bg-card p-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Group Name (optional)</label>
              <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="e.g. Grocery Alliance" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Product Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCat(c)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      selectedCats.includes(c)
                        ? 'gradient-primary text-primary-foreground'
                        : 'border border-border bg-background text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Order Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value as any)} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {frequencies.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Order values */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Your Order Value (₹)</label>
                <input type="number" value={yourValue || ''} onChange={(e) => setYourValue(+e.target.value)} placeholder="50000" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Partner's Value (₹)</label>
                <input type="number" value={partnerValue || ''} onChange={(e) => setPartnerValue(+e.target.value)} placeholder="60000" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleCreateGroup} className="flex-1 rounded-lg gradient-primary py-3 text-sm font-semibold text-primary-foreground btn-scale">
                Create Group
              </button>
              <button onClick={handleGenerateEmail} className="flex-1 rounded-lg border-2 border-primary bg-background py-3 text-sm font-semibold text-primary hover:bg-accent btn-scale">
                Generate AI Email
              </button>
            </div>
          </div>

          {/* Live Calculator */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 h-fit sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Live Savings Calculator</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Your Order</span>
                <span className="font-medium">{formatCurrency(yourValue)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Partner's Order</span>
                <span className="font-medium">{formatCurrency(partnerValue)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="text-muted-foreground">Total Group Value</span>
                <span className="font-semibold">{formatCurrency(savings.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount Unlocked</span>
                <span className="font-bold text-primary">{savings.discountPercent}%</span>
              </div>
              <div className="rounded-lg bg-accent p-3 mt-2">
                <div className="flex items-center gap-1 text-sm text-accent-foreground mb-1">
                  <TrendingUp className="h-4 w-4" /> Your Savings
                </div>
                <p className="text-2xl font-extrabold gradient-text">{formatCurrency(savings.yourSavings)}</p>
                <p className="text-xs text-muted-foreground">per order cycle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
