"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { BlogPostForm } from "@/components/blog-post-form"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: "draft" | "published"
  locale: "en" | "he"
}

export default function EditBlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string)
    }
  }, [params.id])

  const fetchPost = async (id: string) => {
    try {
      if (!db) return
      const ref = doc(db, 'blog_posts', id)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data: any = snap.data()
        setPost({
          id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          status: data.status,
          locale: data.locale,
        })
      }
    } catch (error) {
      console.error("Error fetching blog post:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Blog Post</h1>
          </div>
          <div className="text-center py-12">Loading...</div>
        </div>
      </AdminLayout>
    )
  }

  if (!post) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're trying to edit doesn't exist.</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Blog Post</h1>
          <p className="text-muted-foreground">Update your blog post content and settings</p>
        </div>

        <BlogPostForm initialData={post} postId={post.id} />
      </div>
    </AdminLayout>
  )
}
