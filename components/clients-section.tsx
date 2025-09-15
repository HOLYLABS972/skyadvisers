"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getTranslation, type Locale } from "@/lib/i18n"
import { Building2, Users, Award, Globe } from "lucide-react"

interface ClientsSectionProps {
  locale: string
}

export function ClientsSection({ locale }: ClientsSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)

  const clientTypes = [
    {
      icon: Building2,
      title: "Fortune 500 Companies",
      description: "Leading enterprises trust our strategic guidance",
      count: "50+"
    },
    {
      icon: Users,
      title: "Startups & Scale-ups",
      description: "From idea to IPO, we guide your growth journey",
      count: "500+"
    },
    {
      icon: Award,
      title: "Investment Firms",
      description: "Private equity and venture capital partnerships",
      count: "25+"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Clients across multiple continents and industries",
      count: "15+"
    }
  ]

  return (
    <section id="clients" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Clients
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-pretty">
            Trusted by industry leaders, innovative startups, and investment firms worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {clientTypes.map((client, index) => {
            const Icon = client.icon
            return (
              <Card key={index} className="text-center border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="text-3xl font-bold text-secondary mb-2">{client.count}</div>
                  <h3 className="font-semibold text-foreground mb-2">{client.title}</h3>
                  <p className="text-sm text-muted-foreground">{client.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Client Logos Placeholder */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-8">Trusted Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {/* Placeholder for client logos */}
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex items-center justify-center h-16 bg-muted rounded-lg">
                <span className="text-muted-foreground text-sm font-medium">
                  Logo {index + 1}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Add your client logos here to showcase your partnerships
          </p>
        </div>
      </div>
    </section>
  )
}
