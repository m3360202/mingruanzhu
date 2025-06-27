export const i18n = {
  defaultLocale: 'en-US',
  locales: ['en-US', 'zh-CN'],
  langDirection: {
    'en-US': 'ltr',
    'zh-CN': 'ltr'
  }
} as const;

export type Locale = (typeof i18n)['locales'][number];
