"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getTranslation, type Locale } from "@/lib/i18n"
import { useAuth } from "@/hooks/use-auth"
import { useTestimonialsContent } from "@/hooks/use-testimonials-content"
import { InlineEditor } from "@/components/inline-editor"
import { Star, Quote, Plus, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface TestimonialsSectionProps {
  locale: string
}

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)
  const { isLoggedIn } = useAuth()
  const { content, updateContent } = useTestimonialsContent(locale)
  const [draggedTestimonial, setDraggedTestimonial] = useState<string | null>(null)
  const [dragOverTestimonial, setDragOverTestimonial] = useState<string | null>(null)

  const addTestimonial = async () => {
    const newTestimonial = {
      id: `testimonial_${Date.now()}`,
      name: locale === 'he' ? 'שם הלקוח' : 'Client Name',
      title: locale === 'he' ? 'תפקיד, חברה' : 'Position, Company',
      content: locale === 'he' ? 'תוכן ההמלצה...' : 'Testimonial content...',
      rating: 5
    }
    
    const updatedTestimonials = [...(content?.testimonials || []), newTestimonial]
    await updateContent({ testimonials: updatedTestimonials })
  }

  const removeTestimonial = async (testimonialId: string) => {
    if (!confirm(locale === 'he' ? 'האם אתה בטוח שברצונך למחוק המלצה זו?' : 'Are you sure you want to delete this testimonial?')) {
      return
    }

    const updatedTestimonials = content?.testimonials?.filter(t => t.id !== testimonialId) || []
    await updateContent({ testimonials: updatedTestimonials })
  }

  const handleDragStart = (e: React.DragEvent, testimonialId: string) => {
    setDraggedTestimonial(testimonialId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, testimonialId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverTestimonial(testimonialId)
  }

  const handleDragLeave = () => {
    setDragOverTestimonial(null)
  }

  const handleDrop = async (e: React.DragEvent, targetTestimonialId: string) => {
    e.preventDefault()
    
    if (!draggedTestimonial || draggedTestimonial === targetTestimonialId) {
      setDraggedTestimonial(null)
      setDragOverTestimonial(null)
      return
    }

    const testimonials = content?.testimonials || []
    const draggedIndex = testimonials.findIndex(t => t.id === draggedTestimonial)
    const targetIndex = testimonials.findIndex(t => t.id === targetTestimonialId)

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedTestimonial(null)
      setDragOverTestimonial(null)
      return
    }

    const newTestimonials = [...testimonials]
    const [draggedTestimonialData] = newTestimonials.splice(draggedIndex, 1)
    newTestimonials.splice(targetIndex, 0, draggedTestimonialData)

    await updateContent({ testimonials: newTestimonials })
    setDraggedTestimonial(null)
    setDragOverTestimonial(null)
  }

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

        {isLoggedIn && (
          <div className="text-center mb-8">
            <Button
              onClick={addTestimonial}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'he' ? 'הוסף המלצה' : 'Add Testimonial'}
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content?.testimonials?.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              draggable={isLoggedIn}
              onDragStart={(e) => handleDragStart(e, testimonial.id)}
              onDragOver={(e) => handleDragOver(e, testimonial.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, testimonial.id)}
              className={`relative border-border hover:shadow-lg transition-shadow duration-300 ${
                draggedTestimonial === testimonial.id ? 'opacity-50' : ''
              } ${
                dragOverTestimonial === testimonial.id ? 'border-secondary ring-2 ring-secondary/20' : ''
              } ${isLoggedIn ? 'cursor-move' : ''}`}
            >
              <CardContent className="pt-8 pb-6">
                {/* Drag handle and remove button */}
                {isLoggedIn && (
                  <div className="absolute top-2 right-2 z-20 flex gap-1">
                    <div className="bg-white/90 text-black hover:bg-white p-1 rounded cursor-move">
                      <GripVertical className="h-3 w-3" />
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeTestimonial(testimonial.id)}
                      className="bg-red-500/90 text-white hover:bg-red-600 h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}

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
