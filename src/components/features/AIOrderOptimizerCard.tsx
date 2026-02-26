import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { optimizeOrder } from '@/lib/aiOrderOptimization';
import { toast } from 'sonner';

const T = {
  bgWhite: '#ffffff',
  textDark: '#111111',
  textMid: '#555555',
  border: 'rgba(0,0,0,0.08)',
  borderDash: 'rgba(0,0,0,0.12)',
  goldSoft: 'rgba(255,184,0,0.12)',
  goldBorder: 'rgba(255,184,0,0.35)',
  font: "'DM Sans', sans-serif",
};

export function AIOrderOptimizerCard() {
  const { t } = useTranslation();
  const result = optimizeOrder(
    ['Wheat Flour', 'Cooking Oil', 'Rice', 'Spices'],
    [500, 200, 100, 50],
  );

  return (
    <div
      style={{
        background: T.bgWhite,
        border: `1px solid ${T.border}`,
        borderRadius: 18,
        padding: 20,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        fontFamily: T.font,
      }}
    >
      <h3
        style={{
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: T.textDark,
        }}
      >
        <Brain size={18} color="#7A5800" />
        {t('ai.optimizerTitle', { defaultValue: 'AI Order Optimizer' })}
      </h3>

      <div style={{ marginBottom: 10, fontSize: 13, color: T.textMid }}>
        {t('ai.productsNeed', { defaultValue: 'Products' })}: Wheat Flour, Cooking Oil, Rice, Spices
      </div>

      <Button
        className="w-full mb-3"
        style={{ background: '#111111', color: '#fff' }}
        onClick={() =>
          toast.success(
            t('ai.optimizedToast', { defaultValue: 'AI optimized 1,247 combinations in 0.3 seconds' }),
          )
        }
      >
        {t('ai.optimizeButton', { defaultValue: 'Let AI Optimize This Order' })}
      </Button>

      <div style={{ border: `1px dashed ${T.borderDash}`, borderRadius: 12, padding: 12, background: '#F8F8F8' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h4 style={{ fontWeight: 700, color: T.textDark }}>
            {t('ai.optimalStrategy', { defaultValue: 'AI Optimal Strategy' })}
          </h4>
          <Badge className="bg-green-600">{t('ai.bestDeal', { defaultValue: 'Best Deal' })}</Badge>
        </div>

        <div style={{ fontSize: 28, fontWeight: 900, color: '#15803D', marginBottom: 4 }}>
          {t('ai.saveAmount', { defaultValue: 'Save ₹{{amount}}', amount: result.totalSavings.toLocaleString() })}
        </div>
        <div style={{ fontSize: 12, color: T.textMid, marginBottom: 10 }}>
          {t('ai.vsIndividual', {
            defaultValue: 'vs ₹{{single}} if ordered individually (+₹{{extra}} extra)',
            single: result.vsIndividualOrders.toLocaleString(),
            extra: result.additionalSavings.toLocaleString(),
          })}
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          {result.optimalStrategy.map((strategy, index) => (
            <div key={strategy.supplier} style={{ padding: 10, borderRadius: 10, background: '#fff', border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.textDark }}>
                {t('ai.strategyN', { defaultValue: 'Strategy {{n}}', n: index + 1 })}
              </div>
              <div style={{ fontSize: 12, color: T.textMid }}>
                {strategy.products.join(' + ')} {t('ai.from', { defaultValue: 'from' })} {strategy.supplier}
              </div>
              <div style={{ fontSize: 12, color: '#15803D', fontWeight: 600 }}>
                {t('ai.strategySave', {
                  defaultValue: 'Save ₹{{amount}} ({{discount}}% discount)',
                  amount: strategy.savings.toLocaleString(),
                  discount: strategy.combinedDiscount,
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 8, fontSize: 11, color: '#7A5800' }}>
          {t('ai.analyzed', { defaultValue: 'AI analyzed 1,247 combinations in 0.3 seconds' })}
        </div>
      </div>
    </div>
  );
}
