import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useMatching } from '@/hooks/useMatching';
import { formatCurrency } from '@/hooks/useSavingsCalc';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = [
  'hsl(160 84% 39%)',
  'hsl(217 91% 60%)',
  'hsl(38 92% 50%)',
  'hsl(0 84% 60%)',
  'hsl(280 67% 50%)',
];

export default function AnalyticsPage() {
  const { user, isAuthenticated } = useAuth();
  const { matches, loading, error } = useMatching(user);

  if (!isAuthenticated) return <Navigate to="/register" replace />;

  const savingsData = matches.slice(0, 5).map((m) => ({
    name: m.retailer.storeName.split(' ')[0],
    savings: m.estimatedSavings,
    score: m.matchScore,
  }));

  const categoryData = [
    { name: 'Groceries', value: 35 },
    { name: 'Medical', value: 25 },
    { name: 'Electronics', value: 20 },
    { name: 'Stationery', value: 12 },
    { name: 'Restaurant', value: 8 },
  ];

  const totalSavings = matches.reduce((s, m) => s + m.estimatedSavings, 0);

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Savings Analytics</h1>
        <p className="mb-8 text-muted-foreground">
          Track your potential savings and partnership opportunities.
        </p>

        {loading && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
            Running AI matching...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            AI matching failed: {error}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Total Potential Savings</p>
            <p className="text-2xl font-bold gradient-text">{formatCurrency(totalSavings)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Best Match Score</p>
            <p className="text-2xl font-bold text-foreground">{matches[0]?.matchScore || 0}%</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Avg Distance</p>
            <p className="text-2xl font-bold text-foreground">
              {(matches.reduce((s, m) => s + m.distance, 0) / Math.max(matches.length, 1)).toFixed(1)} km
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold text-foreground">Savings by Partner</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="savings" fill="hsl(160 84% 39%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold text-foreground">Market Category Split</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
