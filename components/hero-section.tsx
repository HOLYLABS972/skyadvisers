"use client"

import { Button } from "@/components/ui/button"
import { getTranslation } from "@/lib/i18n"
import { ArrowRight, TrendingUp } from "lucide-react"

interface HeroSectionProps {
  locale: string
}

export function HeroSection({ locale }: HeroSectionProps) {
  // Hardcoded translations for testing
  const translations = {
    en: {
      "hero.title": "Strategic Advisory for Visionary Leaders",
      "hero.subtitle": "Empowering CEOs and founders with expert guidance on investment, startup evaluation, and business strategy.",
      "hero.cta": "Get Started",
    },
    he: {
      "hero.title": "ייעוץ אסטרטגי למנהיגים בעלי חזון",
      "hero.subtitle": "מעצימים מנכ״לים ומייסדים עם הדרכה מומחית בהשקעות, הערכת סטארט-אפים ואסטרטגיה עסקית.",
      "hero.cta": "התחל עכשיו",
    }
  }
  
  const t = (key: string) => translations[locale as keyof typeof translations]?.[key as keyof typeof translations.en] || key

  return (
    <section className="relative bg-gradient-to-br from-background to-muted py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <TrendingUp className="h-4 w-4" />
            Strategic Business Advisory
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
{t("hero.title")}
          </h1>

          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty leading-relaxed">
{t("hero.subtitle")}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg"
            >
{t("hero.cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Startups Advised</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">$2B+</div>
              <div className="text-sm text-muted-foreground">Funding Raised</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
