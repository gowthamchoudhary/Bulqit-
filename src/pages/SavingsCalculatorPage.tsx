import PageLayout from '@/components/layout/PageLayout';
import { DiscountCalculator } from '@/components/features/DiscountCalculator';
import { useTranslation } from 'react-i18next';

const T = {
  bg: '#F0EFED',
  textDark: '#111111',
  textMid: '#555555',
  borderDash: 'rgba(0,0,0,0.12)',
  font: "'DM Sans', sans-serif",
};

export function SavingsCalculatorPage() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div
        style={{
          fontFamily: T.font,
          backgroundColor: T.bg,
          backgroundImage: `linear-gradient(${T.borderDash} 1px, transparent 1px), linear-gradient(90deg, ${T.borderDash} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          minHeight: '100vh',
          color: T.textDark,
        }}
      >
        <div style={{ maxWidth: 920, margin: '0 auto', padding: 'clamp(16px, 3vw, 32px)' }}>
          <div style={{ marginBottom: 18 }}>
            <h1
              style={{
                fontSize: 'clamp(22px, 3.6vw, 32px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                marginBottom: 6,
              }}
            >
              {t('savingsPage.title', { defaultValue: 'Savings Calculator' })}
            </h1>
            <p style={{ fontSize: 14, color: T.textMid }}>
              {t('savingsPage.subtitle', {
                defaultValue: 'Estimate member-level savings and unlock better discount tiers.',
              })}
            </p>
          </div>

          <DiscountCalculator />
        </div>
      </div>
    </PageLayout>
  );
}
