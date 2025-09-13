"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: "published"
  createdAt: string
  updatedAt: string
  author: string
  locale: "en" | "he"
  featuredImage?: string
  images?: Array<{
    url: string
    path: string
  }>
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { locale } = useLocale()
  
  // Hardcoded translations for testing
  const translations = {
    en: {
      "blog.backToBlog": "Back to Blog",
      "blog.moreArticles": "More Articles",
    },
    he: {
      "blog.backToBlog": "חזור לבלוג",
      "blog.moreArticles": "מאמרים נוספים",
    }
  }
  
  const t = (key: string) => translations[locale as keyof typeof translations]?.[key as keyof typeof translations.en] || key
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  const fetchPost = async (slug: string) => {
    try {
      const postQuery = query(
        collection(db, "blog_posts"),
        where("slug", "==", slug),
        where("status", "==", "published")
      )
      const snapshot = await getDocs(postQuery)
      
      if (snapshot.empty) {
        setNotFound(true)
      } else {
        const doc = snapshot.docs[0]
        const postData = {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
        }
        setPost(postData as BlogPost)
      }
    } catch (error) {
      console.error("Error fetching blog post:", error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("blog.backToBlog") || "Back to Blog"}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("blog.backToBlog")}
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Badge variant="secondary">{post.locale.toUpperCase()}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-1 h-3 w-3" />
                {post.author}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">{post.title}</h1>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-8">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            <p className="text-xl text-muted-foreground mb-8 text-pretty">{post.excerpt}</p>

            <div className="flex items-center justify-between border-b border-border pb-6">
              <div className="text-sm text-muted-foreground">
                {post.updatedAt !== post.createdAt && (
                  <span>Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-secondary hover:prose-a:text-secondary/80">
            <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
          </div>

          {/* Image Gallery */}
          {post.images && post.images.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.images.map((image, index) => (
                  <div key={index} className="group cursor-pointer">
                    <img
                      src={image.url}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Written by</p>
                <p className="font-medium text-foreground">{post.author}</p>
              </div>
              <Link href="/blog">
                <Button variant="outline">{t("blog.moreArticles")}</Button>
              </Link>
            </div>
          </footer>
        </article>
    </div>
  )
}
