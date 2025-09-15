"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslation, type Locale } from "@/lib/i18n"
import { useAuth } from "@/hooks/use-auth"
import { useServicesContent } from "@/hooks/use-services-content"
import { InlineEditor } from "@/components/inline-editor"
import { uploadImage, deleteImage, validateImageFile } from "@/lib/image-upload"
import { TrendingUp, Target, Lightbulb, Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"

interface ServicesSectionProps {
  locale: string
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)
  const { isLoggedIn } = useAuth()
  const { content, updateContent } = useServicesContent(locale)
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const [uploadingImages, setUploadingImages] = useState<{ [key: string]: boolean }>({})

  const iconMap = {
    investment: TrendingUp,
    evaluation: Target,
    strategy: Lightbulb,
  }

  const handleImageUpload = async (serviceId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const validation = validateImageFile(file)
      if (!validation.isValid) {
        alert(validation.error)
        return
      }

      setUploadingImages(prev => ({ ...prev, [serviceId]: true }))
      const result = await uploadImage(file, `services-images/shared/${serviceId}`)
      
      const updatedServices = content?.services?.map(service =>
        service.id === serviceId 
          ? { ...service, imageUrl: result.url, imagePath: result.path }
          : service
      ) || []
      
      await updateContent({ services: updatedServices })
    } catch (error) {
      console.error("Failed to upload image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setUploadingImages(prev => ({ ...prev, [serviceId]: false }))
      if (fileInputRefs.current[serviceId]) {
        fileInputRefs.current[serviceId]!.value = ""
      }
    }
  }

  const handleRemoveImage = async (serviceId: string) => {
    const service = content?.services?.find(s => s.id === serviceId)
    if (!service?.imagePath) return

    try {
      await deleteImage(service.imagePath)
      const updatedServices = content?.services?.map(s =>
        s.id === serviceId 
          ? { ...s, imageUrl: '', imagePath: '' }
          : s
      ) || []
      
      await updateContent({ services: updatedServices })
    } catch (error) {
      console.error("Failed to remove image:", error)
      alert("Failed to remove image. Please try again.")
    }
  }

  return (
    <section id="services" className="py-20 bg-muted/20 relative overflow-hidden min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20"></div>
      
      {/* Diagonal slice with white background for content */}
      <div 
        className="absolute inset-0 bg-background"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Content on white diagonal */}
          <div className="lg:pr-16">
            <div className="mb-12">
              {isLoggedIn ? (
                <InlineEditor
                  value={content?.sectionTitle || t("services.title")}
                  onSave={async (newValue) => {
                    await updateContent({ sectionTitle: newValue })
                  }}
                  type="input"
                  placeholder={t("services.title")}
                  className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance"
                />
              ) : (
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                  {content?.sectionTitle || t("services.title")}
                </h2>
              )}
              <div className="w-24 h-1 bg-secondary mb-8"></div>
              
              {/* Services description */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {locale === 'he' 
                  ? "אנחנו מספקים שירותי ייעוץ עסקי מקיפים המותאמים לצרכים הספציפיים של כל לקוח. הצוות שלנו מביא ניסיון רב שנים ומומחיות עמוקה בתעשייה."
                  : "We provide comprehensive business advisory services tailored to the specific needs of each client. Our team brings years of experience and deep industry expertise."
                }
              </p>
            </div>
          </div>

          {/* Right side - Services grid */}
          <div className="lg:pl-8">
            <div className="grid gap-6">
              {content?.services?.map((service, index) => {
                const Icon = iconMap[service.id as keyof typeof iconMap] || TrendingUp
                return (
                  <div
                    key={service.id}
                    className="group hover:shadow-lg transition-all duration-300 border border-border hover:border-secondary/50 rounded-lg p-6 bg-background/80 backdrop-blur-sm relative"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative w-20 h-20 flex-shrink-0">
                    {service.imageUrl ? (
                      <div className="w-full h-full overflow-hidden rounded-lg">
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover transform -skew-x-12 hover:skew-x-0 transition-transform duration-300"
                          style={{
                            clipPath: 'polygon(0 0, 85% 0, 100% 100%, 15% 100%)'
                          }}
                        />
                      </div>
                    ) : (
                      <div 
                        className="w-full h-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors"
                        style={{
                          clipPath: 'polygon(0 0, 85% 0, 100% 100%, 15% 100%)'
                        }}
                      >
                        <Icon className="h-12 w-12 text-secondary" />
                      </div>
                    )}
                    
                    {isLoggedIn && (
                      <div className="absolute top-2 right-2 z-20 flex gap-1">
                        <input
                          ref={(el) => fileInputRefs.current[service.id] = el}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(service.id, e)}
                          className="hidden"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => fileInputRefs.current[service.id]?.click()}
                          disabled={uploadingImages[service.id]}
                          className="bg-white/90 text-black hover:bg-white h-6 w-6 p-0"
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                        {service.imageUrl && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemoveImage(service.id)}
                            className="bg-red-500/90 text-white hover:bg-red-600 h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    )}
                      </div>
                      
                      {/* Service content */}
                      <div className="flex-1">
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
                            className="text-xl font-semibold text-foreground mb-2"
                          />
                        ) : (
                          <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                        )}
                        
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
                          <p className="text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
