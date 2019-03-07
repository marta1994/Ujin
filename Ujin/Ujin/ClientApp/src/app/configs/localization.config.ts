import { L10nConfig, StorageStrategy, ProviderType } from 'angular-l10n';

export const languages = [
  { code: 'ua', dir: 'ltr', displayName: 'українська' },
  { code: 'en', dir: 'ltr', displayName: 'english' }
];

export const l10nConfig: L10nConfig = {
  locale: {
    languages: languages,
    language: 'ua',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: './assets/locale-' }
    ],
    caching: true,
    composedKeySeparator: '.',
    missingValue: 'No key'
  }
};
