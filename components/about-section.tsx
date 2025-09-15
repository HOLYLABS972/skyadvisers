"use client"

import { useAboutContent } from "@/hooks/use-about-content"
import { useAuth } from "@/hooks/use-auth"
import { InlineEditor } from "@/components/inline-editor"
import { uploadImage, deleteImage, validateImageFile } from "@/lib/image-upload"
import { Users, TrendingUp, Globe, Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"

interface AboutSectionProps {
  locale: string
}

export function AboutSection({ locale }: AboutSectionProps) {
  const { content, updateContent } = useAboutContent(locale)
  const { isLoggedIn } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const iconMap = {
    expertise: Users,
    results: TrendingUp,
    global: Globe,
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const validation = validateImageFile(file)
      if (!validation.isValid) {
        alert(validation.error)
        return
      }

      setUploadingImage(true)
      const result = await uploadImage(file, `about-images/shared`)
      
      await updateContent({
        aboutImageUrl: result.url,
        aboutImagePath: result.path,
      })
    } catch (error) {
      console.error("Failed to upload image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = async () => {
    if (!content?.aboutImagePath) return

    try {
      await deleteImage(content.aboutImagePath)
      await updateContent({
        aboutImageUrl: "",
        aboutImagePath: "",
      })
    } catch (error) {
      console.error("Failed to remove image:", error)
      alert("Failed to remove image. Please try again.")
    }
  }

  return (
    <section className="py-16 bg-muted/30" dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {isLoggedIn ? (
            <InlineEditor
              value={content?.sectionTitle || "About Us"}
              onSave={async (newValue) => {
                await updateContent({ sectionTitle: newValue })
              }}
              type="input"
              placeholder="About Us"
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
            />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {content?.sectionTitle || "About Us"}
            </h2>
          )}
          
          {isLoggedIn ? (
            <InlineEditor
              value={content?.sectionSubtitle || "Experienced professionals dedicated to your success"}
              onSave={async (newValue) => {
                await updateContent({ sectionSubtitle: newValue })
              }}
              type="input"
              placeholder="Experienced professionals dedicated to your success"
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            />
          ) : (
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {content?.sectionSubtitle || "Experienced professionals dedicated to your success"}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className={locale === 'he' ? 'order-2' : 'order-1'}>
            {isLoggedIn ? (
              <InlineEditor
                value={content?.description || "With years of experience in business advisory, we help companies navigate complex challenges and achieve sustainable growth."}
                onSave={async (newValue) => {
                  await updateContent({ description: newValue })
                }}
                type="textarea"
                placeholder="With years of experience in business advisory, we help companies navigate complex challenges and achieve sustainable growth."
                className="text-muted-foreground leading-relaxed text-lg"
              />
            ) : (
              <p className="text-muted-foreground leading-relaxed text-lg">
                {content?.description || "With years of experience in business advisory, we help companies navigate complex challenges and achieve sustainable growth."}
              </p>
            )}
          </div>
          
          <div className={`${locale === 'he' ? 'order-1' : 'order-2'} flex justify-center relative`}>
            <div className="w-full max-w-md h-64 rounded-lg overflow-hidden relative">
              {content?.aboutImageUrl ? (
                <img
                  src={content.aboutImageUrl}
                  alt="About Us"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Users className="h-24 w-24 text-primary/40" />
                </div>
              )}
              
              {isLoggedIn && (
                <div className="absolute top-2 right-2 z-20 flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="bg-white/90 text-black hover:bg-white"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                  </Button>
                  {content?.aboutImageUrl && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleRemoveImage}
                      className="bg-red-500/90 text-white hover:bg-red-600"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content?.features?.map((feature) => {
            const IconComponent = iconMap[feature.id as keyof typeof iconMap] || Users
            
            return (
              <div key={feature.id} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                
                {isLoggedIn ? (
                  <InlineEditor
                    value={feature.title}
                    onSave={async (newValue) => {
                      const updatedFeatures = content?.features?.map(f =>
                        f.id === feature.id ? { ...f, title: newValue } : f
                      ) || []
                      await updateContent({ features: updatedFeatures })
                    }}
                    type="input"
                    placeholder={feature.title}
                    className="text-xl font-semibold text-foreground mb-3"
                  />
                ) : (
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                )}
                
                {isLoggedIn ? (
                  <InlineEditor
                    value={feature.description}
                    onSave={async (newValue) => {
                      const updatedFeatures = content?.features?.map(f =>
                        f.id === feature.id ? { ...f, description: newValue } : f
                      ) || []
                      await updateContent({ features: updatedFeatures })
                    }}
                    type="textarea"
                    placeholder={feature.description}
                    className="text-muted-foreground leading-relaxed"
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
