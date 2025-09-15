"use client"

import { Button } from "@/components/ui/button"
import { getTranslation, type Locale } from "@/lib/i18n"
import { useLandingContent } from "@/hooks/use-landing-content"
import { useAuth } from "@/hooks/use-auth"
import { InlineEditor } from "@/components/inline-editor"
import { uploadImage, deleteImage, validateImageFile } from "@/lib/image-upload"
import { ArrowRight, TrendingUp, Upload, X, ImageIcon } from "lucide-react"
import { useRef, useState } from "react"

interface HeroSectionProps {
  locale: string
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = (key: string) => getTranslation(key, locale as Locale)
  const { content, updateContent } = useLandingContent(locale)
  const { isLoggedIn } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!validateImageFile(file)) {
      return
    }

    setUploadingImage(true)
    try {
      const { url, path } = await uploadImage(file, "hero-images/shared")
      await updateContent({
        heroImageUrl: url,
        heroImagePath: path,
      })
    } catch (error) {
      console.error("Failed to upload image:", error)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!content?.heroImagePath) return

    try {
      await deleteImage(content.heroImagePath)
      await updateContent({
        heroImageUrl: "",
        heroImagePath: "",
      })
    } catch (error) {
      console.error("Failed to delete image:", error)
    }
  }

  return (
    <section 
      className="relative py-20 lg:py-32"
      dir={locale === 'he' ? 'rtl' : 'ltr'}
      style={{
        backgroundImage: content?.heroImageUrl 
          ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${content.heroImageUrl})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {!content?.heroImageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-background to-muted" />
      )}
      
      {/* Image Upload Controls */}
      {isLoggedIn && (
        <div className="absolute top-4 right-4 z-20 flex gap-2">
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
          {content?.heroImageUrl && (
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
            content?.heroImageUrl 
              ? 'bg-white/20 text-white backdrop-blur-sm' 
              : 'bg-secondary/10 text-secondary'
          }`}>
            <TrendingUp className="h-4 w-4" />
            {t("hero.badge")}
          </div>

          {/* Hero Title */}
          {isLoggedIn ? (
            <InlineEditor
              value={content?.heroTitle && content.heroTitle.trim() ? content.heroTitle : t("hero.welcome.title")}
              onSave={async (newValue) => {
                await updateContent({ heroTitle: newValue })
              }}
              type="input"
              placeholder={t("hero.welcome.title")}
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance ${
                content?.heroImageUrl ? 'text-white' : 'text-foreground'
              } ${locale === 'he' ? 'rtl text-right' : 'ltr text-left'}`}
            />
          ) : (
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance ${
              content?.heroImageUrl ? 'text-white' : 'text-foreground'
            } ${locale === 'he' ? 'rtl text-right' : 'ltr text-left'}`}>
              {content?.heroTitle && content.heroTitle.trim() ? content.heroTitle : t("hero.welcome.title")}
            </h1>
          )}

          {/* Hero Subtitle */}
          {isLoggedIn ? (
            <InlineEditor
              value={content?.heroSubtitle && content.heroSubtitle.trim() ? content.heroSubtitle : t("hero.welcome.subtitle")}
              onSave={async (newValue) => {
                await updateContent({ heroSubtitle: newValue })
              }}
              type="textarea"
              placeholder={t("hero.welcome.subtitle")}
              className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-pretty leading-relaxed ${
                content?.heroImageUrl ? 'text-white/90' : 'text-muted-foreground'
              } ${locale === 'he' ? 'rtl text-right' : 'ltr text-left'}`}
            />
          ) : (
            <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-pretty leading-relaxed ${
              content?.heroImageUrl ? 'text-white/90' : 'text-muted-foreground'
            } ${locale === 'he' ? 'rtl text-right' : 'ltr text-left'}`}>
              {content?.heroSubtitle && content.heroSubtitle.trim() ? content.heroSubtitle : t("hero.welcome.subtitle")}
            </p>
          )}

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg"
            >
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`text-2xl font-bold ${content?.heroImageUrl ? 'text-white' : 'text-foreground'}`}>500+</div>
              <div className={`text-sm ${content?.heroImageUrl ? 'text-white/80' : 'text-muted-foreground'}`}>{t("hero.stats.startups")}</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${content?.heroImageUrl ? 'text-white' : 'text-foreground'}`}>$2B+</div>
              <div className={`text-sm ${content?.heroImageUrl ? 'text-white/80' : 'text-muted-foreground'}`}>{t("hero.stats.funding")}</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${content?.heroImageUrl ? 'text-white' : 'text-foreground'}`}>15+</div>
              <div className={`text-sm ${content?.heroImageUrl ? 'text-white/80' : 'text-muted-foreground'}`}>{t("hero.stats.years")}</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${content?.heroImageUrl ? 'text-white' : 'text-foreground'}`}>98%</div>
              <div className={`text-sm ${content?.heroImageUrl ? 'text-white/80' : 'text-muted-foreground'}`}>{t("hero.stats.success")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
