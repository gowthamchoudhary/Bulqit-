import { useNavigate, Navigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import StatCard from '@/components/features/StatCard';
import RetailerCard from '@/components/features/RetailerCard';
import { useAuth } from '@/contexts/AuthContext';
import { useMatching } from '@/hooks/useMatching';
import { formatCurrency } from '@/hooks/useSavingsCalc';
import { IndianRupee, Users, Store, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const matches = useMatching(user);

  if (!isAuthenticated) return <Navigate to="/register" replace />;

  const totalSavings = matches.reduce((s, m) => s + m.estimatedSavings, 0);

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, <span className="gradient-text">{user?.storeName}</span>!
          </h1>
          <p className="text-muted-foreground mt-1">Here are your AI-curated buying partners.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard title="Potential Savings" value={formatCurrency(totalSavings)} subtitle="this month" icon={IndianRupee} trend="↑ 12%" />
          <StatCard title="Matches Found" value={String(matches.length)} subtitle="nearby partners" icon={Users} />
          <StatCard title="Nearby Stores" value="23" subtitle="in your area" icon={Store} />
        </div>

        {/* Matches */}
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">AI-Recommended Buying Partners</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {matches.map((m) => (
            <RetailerCard key={m.retailer.id} match={m} onStartGroup={() => navigate('/group-form')} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
