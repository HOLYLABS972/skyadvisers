"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getTranslation, type Locale } from "@/lib/i18n"
import { useAuth } from "@/hooks/use-auth"
import { useTestimonialsContent } from "@/hooks/use-testimonials-content"
import { InlineEditor } from "@/components/inline-editor"
import { Star, Quote } from "lucide-react"

interface TestimonialsSectionProps {
  locale: string
}

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)
  const { isLoggedIn } = useAuth()
  const { content, updateContent } = useTestimonialsContent(locale)

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {isLoggedIn ? (
            <InlineEditor
              value={content?.sectionTitle || t("nav.testimonials")}
              onSave={async (newValue) => {
                await updateContent({ sectionTitle: newValue })
              }}
              type="input"
              placeholder={t("nav.testimonials")}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
            />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {content?.sectionTitle || t("nav.testimonials")}
            </h2>
          )}
          {isLoggedIn ? (
            <InlineEditor
              value={content?.sectionSubtitle || t("testimonials.subtitle")}
              onSave={async (newValue) => {
                await updateContent({ sectionSubtitle: newValue })
              }}
              type="textarea"
              placeholder={t("testimonials.subtitle")}
              className="text-lg text-muted-foreground"
            />
          ) : (
            <p className="text-lg text-muted-foreground">
              {content?.sectionSubtitle || t("testimonials.subtitle")}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content?.testimonials?.map((testimonial, index) => (
            <Card key={testimonial.id} className="relative border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="absolute top-4 left-4 text-secondary/20">
                  <Quote className="h-8 w-8" />
                </div>

                <div className="flex mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>

                {isLoggedIn ? (
                  <InlineEditor
                    value={testimonial.content}
                    onSave={async (newValue) => {
                      const updatedTestimonials = content?.testimonials?.map(t => 
                        t.id === testimonial.id ? { ...t, content: newValue } : t
                      ) || []
                      await updateContent({ testimonials: updatedTestimonials })
                    }}
                    type="textarea"
                    placeholder={testimonial.content}
                    className="text-muted-foreground mb-6 leading-relaxed text-center"
                  />
                ) : (
                  <p className="text-muted-foreground mb-6 leading-relaxed text-center">"{testimonial.content}"</p>
                )}

                <div className="text-center">
                  {isLoggedIn ? (
                    <InlineEditor
                      value={testimonial.name}
                      onSave={async (newValue) => {
                        const updatedTestimonials = content?.testimonials?.map(t => 
                          t.id === testimonial.id ? { ...t, name: newValue } : t
                        ) || []
                        await updateContent({ testimonials: updatedTestimonials })
                      }}
                      type="input"
                      placeholder={testimonial.name}
                      className="font-semibold text-foreground"
                    />
                  ) : (
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                  )}
                  {isLoggedIn ? (
                    <InlineEditor
                      value={testimonial.title}
                      onSave={async (newValue) => {
                        const updatedTestimonials = content?.testimonials?.map(t => 
                          t.id === testimonial.id ? { ...t, title: newValue } : t
                        ) || []
                        await updateContent({ testimonials: updatedTestimonials })
                      }}
                      type="input"
                      placeholder={testimonial.title}
                      className="text-sm text-muted-foreground"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
