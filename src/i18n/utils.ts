/**
 * Get the text direction for a given locale
 * @param locale The locale to check
 * @returns 'rtl' for right-to-left languages, 'ltr' otherwise
 */
export function getLocaleDirection(locale: string): 'rtl' | 'ltr' {
  // List of RTL languages
  const rtlLocales = ['ar', 'he', 'fa', 'ur']
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
} 