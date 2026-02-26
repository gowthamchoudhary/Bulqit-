import { Card } from '@/components/ui/card';
import { TrendingUp, Users, ShoppingCart, Sparkles, IndianRupee } from 'lucide-react';

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="flex items-center gap-3 mb-3">
          <IndianRupee className="w-8 h-8" />
          <div className="text-sm opacity-90">Total Savings</div>
        </div>
        <div className="text-4xl font-bold mb-1">₹2.4Cr</div>
        <div className="text-xs opacity-80">+₹18L this month</div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-8 h-8" />
          <div className="text-sm opacity-90">Active Retailers</div>
        </div>
        <div className="text-4xl font-bold mb-1">523</div>
        <div className="text-xs opacity-80">+47 this week</div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <div className="flex items-center gap-3 mb-3">
          <ShoppingCart className="w-8 h-8" />
          <div className="text-sm opacity-90">Group Orders</div>
        </div>
        <div className="text-4xl font-bold mb-1">1,247</div>
        <div className="text-xs opacity-80">₹12.4Cr total value</div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-8 h-8" />
          <div className="text-sm opacity-90">Avg Savings</div>
        </div>
        <div className="text-4xl font-bold mb-1">18.7%</div>
        <div className="text-xs opacity-80">Per group order</div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-pink-500 to-red-500 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-8 h-8" />
          <div className="text-sm opacity-90">AI Emails</div>
        </div>
        <div className="text-4xl font-bold mb-1">3,456</div>
        <div className="text-xs opacity-80">87% success rate</div>
      </Card>
    </div>
  );
}
