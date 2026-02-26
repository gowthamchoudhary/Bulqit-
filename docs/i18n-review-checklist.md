# i18n Review Checklist

## Scope
- [ ] All routes in `src/App.tsx` are manually reviewed in each language (`en`, `hi`, `te`, `ta`, `ml`, `kn`).
- [ ] Navigation and footer labels are translated.
- [ ] Toast messages and validation errors are translated where implemented.

## Quality
- [ ] No raw i18n keys are visible in UI.
- [ ] Missing-key fallbacks render English text (not blank).
- [ ] Long translations do not break layout on mobile.
- [ ] Currency formatting uses selected locale.

## Functional
- [ ] Language switch updates text without page reload.
- [ ] Selected language persists after refresh (`bulkbridge_language`).
- [ ] Selected language is synced to user profile (`languagePreference`) when available.
- [ ] Login/logout does not unexpectedly reset language.

## Translation Source
- [ ] Machine-translated strings reviewed for Hindi.
- [ ] Machine-translated strings reviewed for Telugu.
- [ ] Machine-translated strings reviewed for Tamil.
- [ ] Machine-translated strings reviewed for Malayalam.
- [ ] Machine-translated strings reviewed for Kannada.

## Regression
- [ ] `npm run build` passes.
- [ ] `npm run test` passes.
