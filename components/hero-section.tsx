"use client"

import { Button } from "@/components/ui/button"
import { getTranslation, type Locale } from "@/lib/i18n"
import { useLandingContent } from "@/hooks/use-landing-content"
import { ArrowRight, TrendingUp } from "lucide-react"

interface HeroSectionProps {
  locale: string
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)
  const { content } = useLandingContent()

  return (
    <section 
      className="relative py-20 lg:py-32"
      style={{
        backgroundImage: content?.heroImageUrl 
          ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${content.heroImageUrl})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {!content?.heroImageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-background to-muted" />
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
            content?.heroImageUrl 
              ? 'bg-white/20 text-white backdrop-blur-sm' 
              : 'bg-secondary/10 text-secondary'
          }`}>
            <TrendingUp className="h-4 w-4" />
            {t("hero.badge")}
          </div>

          {/* Hero Title */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance ${
            content?.heroImageUrl ? 'text-white' : 'text-foreground'
          }`}>
            {content?.heroTitle || t("hero.title")}
          </h1>

          {/* Hero Subtitle */}
          <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-pretty leading-relaxed ${
            content?.heroImageUrl ? 'text-white/90' : 'text-muted-foreground'
          }`}>
            {content?.heroSubtitle || t("hero.subtitle")}
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
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`text-2xl font-bold ${content?.heroImageUrl ? 'text-white' : 'text-foreground'}`}>500+</div>
              <div className={`text-sm ${content?.heroImageUrl ? 'text-white/80' : 'text-muted-foreground'}`}>Startups Advised</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${content?.heroImageUrl ? 'text-white' : 'text-foreground'}`}>$2B+</div>
              <div className={`text-sm ${content?.heroImageUrl ? 'text-white/80' : 'text-muted-foreground'}`}>Funding Raised</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${content?.heroImageUrl ? 'text-white' : 'text-foreground'}`}>15+</div>
              <div className={`text-sm ${content?.heroImageUrl ? 'text-white/80' : 'text-muted-foreground'}`}>Years Experience</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${content?.heroImageUrl ? 'text-white' : 'text-foreground'}`}>98%</div>
              <div className={`text-sm ${content?.heroImageUrl ? 'text-white/80' : 'text-muted-foreground'}`}>Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
