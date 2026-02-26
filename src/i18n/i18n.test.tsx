import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { AuthProvider } from '@/contexts/AuthContext';
import i18n, { getStoredLanguage, LANGUAGE_STORAGE_KEY } from './index';
import { LanguageSelector } from '@/components/features/LanguageSelector';

describe('i18n setup', () => {
  beforeEach(() => {
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    localStorage.removeItem('bulkbridge_user');
    i18n.changeLanguage('en');
  });

  it('defaults to english when no stored language exists', () => {
    expect(getStoredLanguage()).toBe('en');
  });

  it('falls back to english when stored language is invalid', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'xx');
    expect(getStoredLanguage()).toBe('en');
  });

  it('uses stored language and persists updates from selector', async () => {
    render(
      <AuthProvider>
        <LanguageSelector />
      </AuthProvider>
    );

    const select = screen.getByLabelText('Language') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'hi' } });

    await waitFor(() => {
      expect(i18n.language).toBe('hi');
    });
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('hi');
  });
});
