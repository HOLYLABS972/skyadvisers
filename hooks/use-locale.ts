"use client"

import { useParams, useRouter, usePathname } from "next/navigation"
import { type Locale, defaultLocale, getTranslation } from "@/lib/i18n"

export function useLocale() {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const locale = (params?.locale as Locale) || defaultLocale

  const changeLocale = (newLocale: Locale) => {
    // Replace the current locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPathname)
  }

  const t = (key: string) => getTranslation(key, locale)

  // Helper function to get default translation for fallbacks
  const getDefaultTranslation = (key: string) => getTranslation(key, defaultLocale)

  return { locale, changeLocale, t, getDefaultTranslation }
}
