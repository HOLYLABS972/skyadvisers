"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { locale, changeLocale } = useLocale()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => changeLocale(locale === "en" ? "he" : "en")}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {locale === "en" ? "עברית" : "English"}
    </Button>
  )
}
