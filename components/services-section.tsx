"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslation } from "@/lib/i18n"
import { TrendingUp, Target, Lightbulb } from "lucide-react"

interface ServicesSectionProps {
  locale: string
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  // Hardcoded translations for testing
  const translations = {
    en: {
      "services.title": "Our Services",
      "services.investment.title": "Investment Advisory",
      "services.investment.description": "Expert guidance on funding strategies and investor relations.",
      "services.evaluation.title": "Startup Evaluation",
      "services.evaluation.description": "Comprehensive assessment of startup potential and market viability.",
      "services.strategy.title": "Business Strategy",
      "services.strategy.description": "Strategic planning and execution for sustainable growth.",
    },
    he: {
      "services.title": "השירותים שלנו",
      "services.investment.title": "ייעוץ השקעות",
      "services.investment.description": "הדרכה מומחית באסטרטגיות מימון ויחסי משקיעים.",
      "services.evaluation.title": "הערכת סטארט-אפים",
      "services.evaluation.description": "הערכה מקיפה של פוטנציאל סטארט-אפים וכדאיות שוק.",
      "services.strategy.title": "אסטרטגיה עסקית",
      "services.strategy.description": "תכנון אסטרטגי וביצוע לצמיחה בת קיימא.",
    }
  }
  
  const t = (key: string) => translations[locale as keyof typeof translations]?.[key as keyof typeof translations.en] || key

  const services = [
    {
      icon: TrendingUp,
      title: t("services.investment.title"),
      description: t("services.investment.description"),
    },
    {
      icon: Target,
      title: t("services.evaluation.title"),
      description: t("services.evaluation.description"),
    },
    {
      icon: Lightbulb,
      title: t("services.strategy.title"),
      description: t("services.strategy.description"),
    },
  ]

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{t("services.title")}</h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-secondary/50"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Icon className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
