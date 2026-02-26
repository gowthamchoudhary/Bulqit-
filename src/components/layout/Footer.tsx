import { Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const T = {
  bg: '#F0EFED',
  bgWhite: '#ffffff',
  textDark: '#111111',
  textMid: '#555555',
  textLight: '#999999',
  border: 'rgba(0,0,0,0.08)',
  borderDash: 'rgba(0,0,0,0.12)',
  goldSoft: 'rgba(255,184,0,0.12)',
  goldBorder: 'rgba(255,184,0,0.35)',
  font: "'DM Sans', sans-serif",
};

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      style={{
        borderTop: `1px solid ${T.border}`,
        background: T.bg,
        fontFamily: T.font,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div
          style={{
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            background: T.bgWhite,
            padding: 18,
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        >
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: T.textDark,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Package className="h-4 w-4" />
            </div>
            <span style={{ fontWeight: 800, color: T.textDark }}>{t('app.name')}</span>
          </div>

          <p className="text-sm text-center" style={{ color: T.textMid }}>
            {t('footer.tagline')}
          </p>

          <div className="flex gap-2 text-sm" style={{ color: T.textLight }}>
            <span style={{ padding: '4px 10px', borderRadius: 999, border: `1px solid ${T.borderDash}`, background: T.bg }}>
              {t('footer.privacy')}
            </span>
            <span style={{ padding: '4px 10px', borderRadius: 999, border: `1px solid ${T.borderDash}`, background: T.bg }}>
              {t('footer.terms')}
            </span>
            <span style={{ padding: '4px 10px', borderRadius: 999, border: `1px solid ${T.goldBorder}`, background: T.goldSoft, color: '#7A5800' }}>
              {t('footer.contact')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
