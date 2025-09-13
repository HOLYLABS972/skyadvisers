"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslation, type Locale } from "@/lib/i18n"
import { TrendingUp, Target, Lightbulb } from "lucide-react"

interface ServicesSectionProps {
  locale: string
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)

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
