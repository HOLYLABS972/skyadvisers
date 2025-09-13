"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Save, Eye, Upload, X, Image as ImageIcon } from "lucide-react"
import { auth, db } from "@/lib/firebase"
import { collection, addDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore"
import { uploadImage, validateImageFile, type UploadResult } from "@/lib/image-upload"

interface BlogPostData {
  title: string
  slug: string
  excerpt: string
  content: string
  status: "draft" | "published"
  locale: "en" | "he"
  featuredImage?: string
  images?: UploadResult[]
}

interface BlogPostFormProps {
  initialData?: Partial<BlogPostData>
  postId?: string
}

export function BlogPostForm({ initialData, postId }: BlogPostFormProps) {
  const [formData, setFormData] = useState<BlogPostData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    status: initialData?.status || "draft",
    locale: initialData?.locale || "en",
    featuredImage: initialData?.featuredImage || "",
    images: initialData?.images || [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    const uploadPromises: Promise<UploadResult>[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const validation = validateImageFile(file)
      
      if (!validation.isValid) {
        toast({
          title: "Invalid Image",
          description: validation.error,
          variant: "destructive",
        })
        continue
      }

      uploadPromises.push(uploadImage(file, "blog-images"))
    }

    try {
      const results = await Promise.all(uploadPromises)
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...results],
      }))
      
      toast({
        title: "Success",
        description: `${results.length} image(s) uploaded successfully`,
      })
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }))
  }

  const setFeaturedImage = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: imageUrl,
    }))
  }

  const handleSubmit = async (status: "draft" | "published") => {
    setIsSubmitting(true)

    try {
      if (!db) throw new Error('Firestore not configured')
      const author = auth?.currentUser?.email || 'admin@skyadvisers.com'

      if (postId) {
        const ref = doc(db, 'blog_posts', postId)
        await updateDoc(ref, {
          title: formData.title.trim(),
          slug: formData.slug.trim().toLowerCase(),
          excerpt: formData.excerpt.trim(),
          content: formData.content.trim(),
          status,
          locale: formData.locale,
          featuredImage: formData.featuredImage || "",
          images: formData.images || [],
          updatedAt: serverTimestamp(),
        })
      } else {
        await addDoc(collection(db, 'blog_posts'), {
          title: formData.title.trim(),
          slug: formData.slug.trim().toLowerCase(),
          excerpt: formData.excerpt.trim(),
          content: formData.content.trim(),
          status,
          locale: formData.locale,
          featuredImage: formData.featuredImage || "",
          images: formData.images || [],
          author,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      }

      toast({
        title: "Success",
        description: `Blog post ${status === "published" ? "published" : "saved as draft"} successfully`,
      })
      router.push("/admin/blog")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Blog Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-friendly-slug"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief description of the blog post"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write your blog post content here..."
              rows={15}
              className="font-mono text-sm"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="mb-4"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? "Uploading..." : "Upload Images"}
                </Button>
                <p className="text-sm text-gray-500">
                  Upload multiple images (JPEG, PNG, WebP, GIF) - Max 5MB each
                </p>
              </div>
            </div>

            {/* Featured Image Selection */}
            {formData.images && formData.images.length > 0 && (
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={`Uploaded image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition-colors"
                        onClick={() => setFeaturedImage(image.url)}
                      />
                      {formData.featuredImage === image.url && (
                        <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1">
                          <ImageIcon className="h-3 w-3" />
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                {formData.featuredImage && (
                  <p className="text-sm text-green-600">
                    ✓ Featured image selected
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="locale">Language</Label>
            <Select
              value={formData.locale}
              onValueChange={(value: "en" | "he") => setFormData((prev) => ({ ...prev, locale: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="he">Hebrew</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>

            <div className="space-x-4">
              <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button
                onClick={() => handleSubmit("published")}
                disabled={isSubmitting}
                className="bg-secondary hover:bg-secondary/90"
              >
                <Eye className="mr-2 h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
