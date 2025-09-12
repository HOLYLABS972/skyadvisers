"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { useLocale } from "@/hooks/use-locale"
import { getTranslation } from "@/lib/i18n"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  locale: string
}

export function Header({ locale }: HeaderProps) {
  const { changeLocale } = useLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Hardcoded translations for testing
  const translations = {
    en: {
      "nav.services": "Services",
      "nav.about": "About Us",
      "nav.testimonials": "Testimonials",
      "nav.blog": "Blog",
      "nav.contact": "Contact",
    },
    he: {
      "nav.services": "שירותים",
      "nav.about": "אודותינו",
      "nav.testimonials": "המלצות",
      "nav.blog": "בלוג",
      "nav.contact": "צור קשר",
    }
  }
  
  const t = (key: string) => translations[locale as keyof typeof translations]?.[key as keyof typeof translations.en] || key

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary">Skyadvisers</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
{t("nav.services")}
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
{t("nav.about")}
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
{t("nav.testimonials")}
            </a>
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
{t("nav.blog")}
            </Link>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
{t("nav.contact")}
            </a>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <a
                href="#services"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
  {t("nav.services")}
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
  {t("nav.about")}
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
  {t("nav.testimonials")}
              </a>
              <Link
                href="/blog"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
  {t("nav.blog")}
              </Link>
              <a
                href="#contact"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
  {t("nav.contact")}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
