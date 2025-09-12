"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Save, Eye } from "lucide-react"

interface BlogPostData {
  title: string
  slug: string
  excerpt: string
  content: string
  status: "draft" | "published"
  locale: "en" | "he"
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
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (status: "draft" | "published") => {
    setIsSubmitting(true)

    try {
      const url = postId ? `/api/admin/blog/${postId}` : "/api/admin/blog"
      const method = postId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Blog post ${status === "published" ? "published" : "saved as draft"} successfully`,
        })
        router.push("/admin/blog")
      } else {
        throw new Error("Failed to save blog post")
      }
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
