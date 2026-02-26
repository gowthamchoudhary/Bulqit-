import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { predictDemand } from '@/lib/aiForecasting';
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

export function AIPredictionCard() {
  const { t } = useTranslation();
  const prediction = predictDemand('Wheat Flour', [], 'festival');

  if (!prediction) return null;

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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: T.goldSoft,
            border: `1px solid ${T.goldBorder}`,
          }}
        >
          <Sparkles size={18} color="#7A5800" />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: T.textDark }}>
          {t('ai.predictionTitle', { defaultValue: 'AI Prediction' })}
        </h3>
      </div>

      <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 4, color: T.textDark }}>
        {prediction.expectedMembers} {t('ai.predictionDemand', { defaultValue: 'restaurants will need Wheat Flour' })}
      </div>
      <div style={{ fontSize: 14, color: T.textMid, marginBottom: 10 }}>
        {t('ai.predictionWindow', { defaultValue: 'in the next 3 days' })}
      </div>

      <span
        style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: 999,
          background: T.goldSoft,
          border: `1px solid ${T.goldBorder}`,
          color: '#7A5800',
          marginBottom: 10,
        }}
      >
        {prediction.confidenceScore}% {t('ai.confidence', { defaultValue: 'confidence' })}
      </span>

      <div
        style={{
          fontSize: 13,
          color: T.textMid,
          padding: '10px 12px',
          borderRadius: 10,
          border: `1px dashed ${T.borderDash}`,
          background: '#F8F8F8',
          marginBottom: 12,
          lineHeight: 1.5,
        }}
      >
        {t('ai.detected', { defaultValue: 'AI detected' })}: {prediction.reasoning}
      </div>

      <button
        onClick={() => toast.success(t('ai.actionStarted', { defaultValue: 'AI action started: auto-forming group' }))}
        style={{
          width: '100%',
          border: 'none',
          borderRadius: 999,
          padding: '10px 14px',
          background: '#111111',
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: T.font,
        }}
      >
        {t('ai.autoForm', { defaultValue: 'Auto-Form Group Now (22% discount available)' })}
      </button>
    </div>
  );
}
