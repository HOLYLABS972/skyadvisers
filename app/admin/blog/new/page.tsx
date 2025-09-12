"use client"

import { AdminLayout } from "@/components/admin-layout"
import { BlogPostForm } from "@/components/blog-post-form"

export default function NewBlogPostPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Blog Post</h1>
          <p className="text-muted-foreground">Write and publish a new article</p>
        </div>

        <BlogPostForm />
      </div>
    </AdminLayout>
  )
}
