import { useTranslation } from 'react-i18next';
import { TrendingDown, Zap } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { optimizePricing } from '@/lib/aiPricing';

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

export function AIPriceIntelligenceWidget() {
  const { t } = useTranslation();
  const pricing = optimizePricing('Wheat Flour', 2800, {}, {});

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
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: T.textDark,
        }}
      >
        <TrendingDown size={18} color="#15803D" />
        {t('ai.priceTitle', { defaultValue: 'AI Price Intelligence' })}
      </h3>

      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pricing.priceHistory}>
            <Line type="monotone" dataKey="discount" stroke="#15803D" strokeWidth={2.5} dot={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#777' }} />
            <YAxis tick={{ fontSize: 11, fill: '#777' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 12,
          borderRadius: 12,
          border: `1px solid ${T.goldBorder}`,
          background: T.goldSoft,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <Zap size={14} color="#7A5800" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7A5800' }}>
            {t('ai.recommendation', { defaultValue: 'AI Recommendation' })}
          </span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.textDark, marginBottom: 4 }}>
          {t('ai.waitForDiscount', {
            defaultValue: 'Wait 2 days for 25% discount (instead of 18%)',
          })}
        </div>
        <div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.5 }}>
          {t('ai.reason', { defaultValue: 'Reason' })}: {pricing.reasoning}
        </div>
        <span
          style={{
            marginTop: 8,
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 9px',
            borderRadius: 999,
            border: `1px solid ${T.borderDash}`,
            background: '#fff',
            color: T.textDark,
          }}
        >
          {pricing.confidence}% {t('ai.confidence', { defaultValue: 'confidence' })}
        </span>
      </div>
    </div>
  );
}
