import { type Locale, getTranslation } from './i18n'

export function getServerTranslation(locale: Locale, key: string): string {
  return getTranslation(locale, key)
}

// Client-side compatible translation function
export function getClientTranslation(locale: Locale, key: string): string {
  return getTranslation(locale, key)
}
