"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Eye, Calendar } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
  author: string
  locale: "en" | "he"
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      if (!db) return
      const postsQuery = query(collection(db, "blog_posts"), orderBy("createdAt", "desc"))
      const snapshot = await getDocs(postsQuery)
      const mapped = snapshot.docs.map((d) => {
        const data: any = d.data()
        return {
          id: d.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          status: data.status,
          locale: data.locale,
          author: data.author,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        }
      })
      setPosts(mapped)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      if (!db) throw new Error('Firestore not configured')
      await deleteDoc(doc(db, "blog_posts", id))
      setPosts(posts.filter((post) => post.id !== id))
      toast({ title: "Success", description: "Blog post deleted successfully" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
    }
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published"

    try {
      if (!db) throw new Error('Firestore not configured')
      await updateDoc(doc(db, "blog_posts", id), { status: newStatus })
      setPosts(posts.map((post) => (post.id === id ? { ...post, status: newStatus as any } : post)))
      toast({ title: "Success", description: `Blog post ${newStatus === "published" ? "published" : "unpublished"} successfully` })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post status",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Blog Management</h1>
          </div>
          <div className="text-center py-12">Loading...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage your blog posts</p>
          </div>
          <Link href="/admin/blog/new">
            <Button className="bg-secondary hover:bg-secondary/90">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        {posts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground">
                <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No blog posts yet</h3>
                <p className="mb-4">Get started by creating your first blog post</p>
                <Link href="/admin/blog/new">
                  <Button className="bg-secondary hover:bg-secondary/90">Create First Post</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                        <Badge variant="outline">{post.locale.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button variant="outline" size="sm" title="Edit post">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      {post.status === "published" && (
                        <Link href={`/${post.locale}/blog/${post.slug}`} target="_blank">
                          <Button variant="outline" size="sm" title="View post">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleStatus(post.id, post.status)}
                        title={post.status === "published" ? "Unpublish" : "Publish"}
                      >
                        {post.status === "published" ? "Unpublish" : "Publish"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-destructive hover:text-destructive"
                        title="Delete post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
