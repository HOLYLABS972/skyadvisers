"use client"

import { useState, useEffect, useRef } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useLandingContent } from "@/hooks/use-landing-content"
import { uploadImage, validateImageFile, deleteImage } from "@/lib/image-upload"
import { Save, Loader2, Upload, X, Image as ImageIcon } from "lucide-react"

interface LandingContent {
  id: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroImageUrl?: string
  heroImagePath?: string
  servicesTitle: string
  servicesSubtitle: string
  aboutTitle: string
  aboutSubtitle: string
  aboutDescription: string
  testimonialsTitle: string
  testimonialsSubtitle: string
  contactTitle: string
  contactSubtitle: string
  contactDescription: string
  updatedAt: string
}

export default function LandingEditPage() {
  const { content, loading, updateContent: saveContent } = useLandingContent()
  const [localContent, setLocalContent] = useState<LandingContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (content) {
      setLocalContent(content)
    }
  }, [content])

  const handleSave = async () => {
    if (!localContent) return

    setSaving(true)
    try {
      await saveContent(localContent)
      toast({
        title: "Success",
        description: "Landing page content updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update landing page content",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (field: keyof LandingContent, value: string) => {
    if (localContent) {
      setLocalContent({ ...localContent, [field]: value })
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !localContent) return

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      toast({
        title: "Invalid Image",
        description: validation.error,
        variant: "destructive",
      })
      return
    }

    setUploadingImage(true)
    try {
      // Upload image
      const result = await uploadImage(file, "hero-images")
      
      // Update local content
      setLocalContent({
        ...localContent,
        heroImageUrl: result.url,
        heroImagePath: result.path,
      })

      toast({
        title: "Success",
        description: "Hero image uploaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = async () => {
    if (!localContent?.heroImagePath) return

    try {
      // Delete image from storage
      await deleteImage(localContent.heroImagePath)
      
      // Update local content
      setLocalContent({
        ...localContent,
        heroImageUrl: "",
        heroImagePath: "",
      })

      toast({
        title: "Success",
        description: "Hero image removed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove image",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  if (!localContent) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load content</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Landing Page</h1>
            <p className="text-muted-foreground">Update the content for your homepage</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Hero Title</label>
                <Input
                  value={localContent.heroTitle}
                  onChange={(e) => updateContent("heroTitle", e.target.value)}
                  placeholder="Enter hero title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Hero Subtitle</label>
                <Input
                  value={localContent.heroSubtitle}
                  onChange={(e) => updateContent("heroSubtitle", e.target.value)}
                  placeholder="Enter hero subtitle"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Hero Description</label>
                <Textarea
                  value={localContent.heroDescription}
                  onChange={(e) => updateContent("heroDescription", e.target.value)}
                  placeholder="Enter hero description"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Hero Image</label>
                <div className="space-y-4">
                  {localContent.heroImageUrl ? (
                    <div className="relative">
                      <img
                        src={localContent.heroImageUrl}
                        alt="Hero preview"
                        className="w-full h-48 object-cover rounded-lg border border-border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">No hero image uploaded</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Upload className="h-4 w-4 mr-2" />
                      )}
                      {uploadingImage ? "Uploading..." : "Upload Image"}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Recommended: 1920x1080px or similar aspect ratio. Max file size: 5MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Section */}
          <Card>
            <CardHeader>
              <CardTitle>Services Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Services Title</label>
                <Input
                  value={localContent.servicesTitle}
                  onChange={(e) => updateContent("servicesTitle", e.target.value)}
                  placeholder="Enter services title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Services Subtitle</label>
                <Input
                  value={localContent.servicesSubtitle}
                  onChange={(e) => updateContent("servicesSubtitle", e.target.value)}
                  placeholder="Enter services subtitle"
                />
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">About Title</label>
                <Input
                  value={localContent.aboutTitle}
                  onChange={(e) => updateContent("aboutTitle", e.target.value)}
                  placeholder="Enter about title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">About Subtitle</label>
                <Input
                  value={localContent.aboutSubtitle}
                  onChange={(e) => updateContent("aboutSubtitle", e.target.value)}
                  placeholder="Enter about subtitle"
                />
              </div>
              <div>
                <label className="text-sm font-medium">About Description</label>
                <Textarea
                  value={localContent.aboutDescription}
                  onChange={(e) => updateContent("aboutDescription", e.target.value)}
                  placeholder="Enter about description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Section */}
          <Card>
            <CardHeader>
              <CardTitle>Testimonials Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Testimonials Title</label>
                <Input
                  value={localContent.testimonialsTitle}
                  onChange={(e) => updateContent("testimonialsTitle", e.target.value)}
                  placeholder="Enter testimonials title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Testimonials Subtitle</label>
                <Input
                  value={localContent.testimonialsSubtitle}
                  onChange={(e) => updateContent("testimonialsSubtitle", e.target.value)}
                  placeholder="Enter testimonials subtitle"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Contact Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Contact Title</label>
                  <Input
                    value={localContent.contactTitle}
                    onChange={(e) => updateContent("contactTitle", e.target.value)}
                    placeholder="Enter contact title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Subtitle</label>
                  <Input
                    value={localContent.contactSubtitle}
                    onChange={(e) => updateContent("contactSubtitle", e.target.value)}
                    placeholder="Enter contact subtitle"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Contact Description</label>
                <Textarea
                  value={localContent.contactDescription}
                  onChange={(e) => updateContent("contactDescription", e.target.value)}
                  placeholder="Enter contact description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {localContent.updatedAt && (
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date(localContent.updatedAt).toLocaleString()}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
