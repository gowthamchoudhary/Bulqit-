import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import i18n, { setStoredLanguage, SupportedLanguage } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';
import { getUser, saveUser } from '@/lib/storage';

const OPTIONS: { code: SupportedLanguage; labelKey: string; native: string }[] = [
  { code: 'en', labelKey: 'language.english', native: 'English' },
  { code: 'hi', labelKey: 'language.hindi', native: 'हिन्दी' },
  { code: 'te', labelKey: 'language.telugu', native: 'తెలుగు' },
  { code: 'ta', labelKey: 'language.tamil', native: 'தமிழ்' },
  { code: 'ml', labelKey: 'language.malayalam', native: 'മലയാളം' },
  { code: 'kn', labelKey: 'language.kannada', native: 'ಕನ್ನಡ' },
];

export function LanguageSelector({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const currentLanguage = (i18n.language || 'en') as SupportedLanguage;
  const selectClass =
    variant === 'compact'
      ? 'h-9 rounded-lg border border-border bg-background px-2 text-xs text-foreground'
      : 'h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground';

  const label = useMemo(() => t('language.label'), [t, currentLanguage]);

  const handleChange = async (lang: SupportedLanguage) => {
    setStoredLanguage(lang);
    await i18n.changeLanguage(lang);

    // Sync preference in stored user profile if present.
    const stored = getUser();
    if (stored) {
      const next = { ...stored, languagePreference: lang };
      saveUser(next);
    }
    if (user) {
      const next = { ...user, languagePreference: lang };
      saveUser(next);
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      {variant === 'full' && <span className="text-sm text-muted-foreground">{label}</span>}
      <select
        aria-label={label}
        className={selectClass}
        value={currentLanguage}
        onChange={(e) => handleChange(e.target.value as SupportedLanguage)}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {t(opt.labelKey)} - {opt.native}
          </option>
        ))}
      </select>
    </div>
  );
}
