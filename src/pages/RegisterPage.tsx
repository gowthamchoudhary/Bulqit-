import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { storeTypes, productSuggestions } from '@/data/mockRetailers';
import { StoreType } from '@/types/retailer';
import { Sparkles, Loader2 } from 'lucide-react';

const schema = z.object({
  storeName: z.string().min(2, 'Store name is required'),
  storeType: z.enum(['Medical', 'Kirana', 'Restaurant', 'Stationery', 'Electronics']),
  address: z.string().min(3, 'Location is required'),
  products: z.string().min(3, 'Add at least one product'),
  monthlyBudget: z.coerce.number().min(1000, 'Budget must be at least ₹1,000'),
  phone: z.string().regex(/^\d{10}$/, 'Enter valid 10-digit phone number'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { storeType: 'Kirana' },
  });

  const storeType = watch('storeType') as StoreType;

  const suggestProducts = () => {
    const suggestions = productSuggestions[storeType] || [];
    setValue('products', suggestions.slice(0, 6).join(', '));
  };

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      login({
        id: 'user_' + Date.now(),
        storeName: data.storeName,
        storeType: data.storeType,
        location: { address: data.address, coordinates: { lat: 12.95, lng: 77.59 } },
        products: data.products.split(',').map((p) => p.trim()).filter(Boolean),
        monthlyBudget: data.monthlyBudget,
        phone: data.phone,
        joinedDate: new Date().toISOString(),
      });
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Register Your Store</h1>
          <p className="text-muted-foreground">Join BulkBridge and start saving with group buying.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-xl border border-border bg-card p-6 sm:p-8">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Store Name *</label>
            <input {...register('storeName')} placeholder="e.g. Rajesh Medical Store" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.storeName && <p className="mt-1 text-xs text-destructive">{errors.storeName.message}</p>}
          </div>

          {/* Store Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Store Type *</label>
            <select {...register('storeType')} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {storeTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Location *</label>
            <input {...register('address')} placeholder="Jayanagar, Bengaluru" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>}
          </div>

          {/* Products */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Products *</label>
              <button type="button" onClick={suggestProducts} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                <Sparkles className="h-3 w-3" /> AI Suggest
              </button>
            </div>
            <textarea {...register('products')} rows={3} placeholder="Comma-separated: Rice, Wheat Flour, Oil" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            {errors.products && <p className="mt-1 text-xs text-destructive">{errors.products.message}</p>}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Monthly Budget (₹) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
              <input {...register('monthlyBudget')} type="number" placeholder="50000" className="w-full rounded-lg border border-input bg-background pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            {errors.monthlyBudget && <p className="mt-1 text-xs text-destructive">{errors.monthlyBudget.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
            <input {...register('phone')} placeholder="9876543210" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg gradient-primary py-3 text-sm font-semibold text-primary-foreground btn-scale disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating your profile...</> : 'Register & Find Partners'}
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
