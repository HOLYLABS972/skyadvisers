"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getTranslation, type Locale } from "@/lib/i18n"
import { Star, Quote } from "lucide-react"

interface TestimonialsSectionProps {
  locale: string
}

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)

  const testimonials = [
    {
      name: t("testimonials.items.0.name"),
      title: t("testimonials.items.0.title"),
      content: t("testimonials.items.0.content"),
      rating: 5,
    },
    {
      name: t("testimonials.items.1.name"),
      title: t("testimonials.items.1.title"),
      content: t("testimonials.items.1.content"),
      rating: 5,
    },
    {
      name: t("testimonials.items.2.name"),
      title: t("testimonials.items.2.title"),
      content: t("testimonials.items.2.content"),
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{t("nav.testimonials")}</h2>
          <p className="text-lg text-muted-foreground">{t("testimonials.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="absolute top-4 left-4 text-secondary/20">
                  <Quote className="h-8 w-8" />
                </div>

                <div className="flex mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed text-center">"{testimonial.content}"</p>

                <div className="text-center">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
