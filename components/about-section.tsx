"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getTranslation } from "@/lib/i18n"
import { Users, Award, Globe } from "lucide-react"

interface AboutSectionProps {
  locale: string
}

export function AboutSection({ locale }: AboutSectionProps) {
  // Hardcoded translations for testing
  const translations = {
    en: {
      "about.title": "About Skyadvisers",
      "about.description": "We are a team of experienced advisors dedicated to helping CEOs and founders navigate the complex world of business strategy and investment.",
    },
    he: {
      "about.title": "אודות Skyadvisers",
      "about.description": "אנחנו צוות של יועצים מנוסים המוקדשים לעזור למנכ״לים ומייסדים לנווט בעולם המורכב של אסטרטגיה עסקית והשקעות.",
    }
  }
  
  const t = (key: string) => translations[locale as keyof typeof translations]?.[key as keyof typeof translations.en] || key

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">{t("about.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-pretty">
              {t("about.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-border">
              <CardContent className="pt-8 pb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Expert Team</h3>
                <p className="text-sm text-muted-foreground">
                  Seasoned professionals with decades of combined experience
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border">
              <CardContent className="pt-8 pb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Proven Results</h3>
                <p className="text-sm text-muted-foreground">Track record of successful exits and funding rounds</p>
              </CardContent>
            </Card>

            <Card className="text-center border-border">
              <CardContent className="pt-8 pb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Global Reach</h3>
                <p className="text-sm text-muted-foreground">International network of investors and partners</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
