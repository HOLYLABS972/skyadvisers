"use client"

import { Button } from "@/components/ui/button"
import { getTranslation, type Locale } from "@/lib/i18n"
import { ArrowRight, TrendingUp } from "lucide-react"

interface HeroSectionProps {
  locale: string
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)

  return (
    <section className="relative bg-gradient-to-br from-background to-muted py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <TrendingUp className="h-4 w-4" />
            {t("hero.badge")}
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
              <div className="text-sm text-muted-foreground">{t("hero.stats.startups")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">$2B+</div>
              <div className="text-sm text-muted-foreground">{t("hero.stats.funding")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">15+</div>
              <div className="text-sm text-muted-foreground">{t("hero.stats.years")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">{t("hero.stats.success")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
