import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English',    native: 'English'    },
  { code: 'hi', label: 'Hindi',      native: 'हिन्दी'      },
  { code: 'te', label: 'Telugu',     native: 'తెలుగు'      },
  { code: 'ta', label: 'Tamil',      native: 'தமிழ்'       },
  { code: 'kn', label: 'Kannada',    native: 'ಕನ್ನಡ'       },
  { code: 'ml', label: 'Malayalam',  native: 'മലയാളം'      },
];

const T = {
  bg: '#F0EFED', bgWhite: '#ffffff', textDark: '#111111',
  textMid: '#555555', textLight: '#999999', border: 'rgba(0,0,0,0.08)',
  borderDash: 'rgba(0,0,0,0.12)', gold: '#FFB800',
  goldSoft: 'rgba(255,184,0,0.12)', goldBorder: 'rgba(255,184,0,0.35)',
  font: "'DM Sans', sans-serif",
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    // Apply correct font per language
    const fontMap: Record<string, string> = {
      hi: "'Noto Sans Devanagari', sans-serif",
      te: "'Noto Sans Telugu', sans-serif",
      ta: "'Noto Sans Tamil', sans-serif",
      kn: "'Noto Sans Kannada', sans-serif",
      ml: "'Noto Sans Malayalam', sans-serif",
      en: "'DM Sans', sans-serif",
    };
    document.documentElement.style.fontFamily = fontMap[code] || fontMap.en;
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative', fontFamily: T.font }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '8px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600,
          background: T.bgWhite, color: T.textDark,
          border: `1px solid ${T.border}`, cursor: 'pointer',
          fontFamily: T.font, boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          transition: 'border-color 0.15s',
        }}
      >
        <Globe size={14} color={T.textMid} />
        {current.native}
        <span style={{ fontSize: 10, color: T.textLight }}>▾</span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          />
          {/* Dropdown */}
          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
            background: T.bgWhite, border: `1px solid ${T.border}`,
            borderRadius: 14, padding: 6, zIndex: 50, minWidth: 180,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          }}>
            {LANGUAGES.map(lang => {
              const isActive = lang.code === i18n.language;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleChange(lang.code)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '9px 12px', borderRadius: 10,
                    background: isActive ? T.goldSoft : 'transparent',
                    border: isActive ? `1px solid ${T.goldBorder}` : '1px solid transparent',
                    cursor: 'pointer', fontFamily: T.font,
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = T.bg; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: isActive ? '#7A5800' : T.textDark }}>
                    {lang.native}
                  </span>
                  <span style={{ fontSize: 11, color: T.textLight }}>
                    {lang.label}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
