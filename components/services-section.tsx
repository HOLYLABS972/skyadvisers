"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslation, type Locale } from "@/lib/i18n"
import { useAuth } from "@/hooks/use-auth"
import { useServicesContent } from "@/hooks/use-services-content"
import { InlineEditor } from "@/components/inline-editor"
import { TrendingUp, Target, Lightbulb } from "lucide-react"

interface ServicesSectionProps {
  locale: string
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)
  const { isLoggedIn } = useAuth()
  const { content, updateContent } = useServicesContent(locale)

  const iconMap = {
    investment: TrendingUp,
    evaluation: Target,
    strategy: Lightbulb,
  }

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {isLoggedIn ? (
            <InlineEditor
              value={content?.sectionTitle || t("services.title")}
              onSave={async (newValue) => {
                await updateContent({ sectionTitle: newValue })
              }}
              type="input"
              placeholder={t("services.title")}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
            />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {content?.sectionTitle || t("services.title")}
            </h2>
          )}
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content?.services?.map((service, index) => {
            const Icon = iconMap[service.id as keyof typeof iconMap] || TrendingUp
            return (
              <Card
                key={service.id}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-secondary/50"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Icon className="h-8 w-8 text-secondary" />
                  </div>
                  {isLoggedIn ? (
                    <InlineEditor
                      value={service.title}
                      onSave={async (newValue) => {
                        const updatedServices = content?.services?.map(s => 
                          s.id === service.id ? { ...s, title: newValue } : s
                        ) || []
                        await updateContent({ services: updatedServices })
                      }}
                      type="input"
                      placeholder={service.title}
                      className="text-xl font-semibold text-foreground"
                    />
                  ) : (
                    <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
                  )}
                </CardHeader>
                <CardContent className="text-center">
                  {isLoggedIn ? (
                    <InlineEditor
                      value={service.description}
                      onSave={async (newValue) => {
                        const updatedServices = content?.services?.map(s => 
                          s.id === service.id ? { ...s, description: newValue } : s
                        ) || []
                        await updateContent({ services: updatedServices })
                      }}
                      type="textarea"
                      placeholder={service.description}
                      className="text-muted-foreground leading-relaxed"
                    />
                  ) : (
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
