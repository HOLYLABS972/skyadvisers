"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { useLandingContent } from "@/hooks/use-landing-content"
import { Search, Calendar, ArrowRight, FileText, Home } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  status: "published"
  createdAt: string
  author: string
  locale: "en" | "he"
}

export default function BlogPage() {
  const { locale } = useLocale()
  const { content: heroContent } = useLandingContent()
  
  // Hardcoded translations for testing
  const translations = {
    en: {
      "blog.title": "Insights & Expertise",
      "blog.subtitle": "Stay informed with the latest insights on business strategy, investment trends, and startup guidance from our expert advisors.",
      "blog.search": "Search articles...",
      "blog.readMore": "Read more",
    },
    he: {
      "blog.title": "בלוג",
      "blog.subtitle": "הישארו מעודכנים עם התובנות האחרונות על אסטרטגיה עסקית, מגמות השקעה והדרכת סטארט-אפים מהיועצים המומחים שלנו.",
      "blog.search": "חפש מאמרים...",
      "blog.readMore": "קרא עוד",
    }
  }
  
  const t = (key: string) => translations[locale as keyof typeof translations]?.[key as keyof typeof translations.en] || key
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, locale])

  const fetchPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, "blog_posts"),
        where("status", "==", "published"),
        orderBy("createdAt", "desc")
      )
      const snapshot = await getDocs(postsQuery)
      
      const postsData = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          status: data.status as "published",
          author: data.author,
          locale: data.locale as "en" | "he",
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        } as BlogPost
      })
      
      setPosts(postsData)
    } catch (error) {
      console.error("Error fetching blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts.filter((post) => post.locale === locale)

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredPosts(filtered)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Preview Section */}
        {heroContent && (
          <Card className="mb-12 overflow-hidden">
            <div 
              className="relative h-48 md:h-64"
              style={{
                backgroundImage: heroContent.heroImageUrl 
                  ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroContent.heroImageUrl})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {!heroContent.heroImageUrl && (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/10" />
              )}
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {heroContent.heroTitle || "Welcome to Skyadvisers"}
                  </h2>
                  <p className="text-lg opacity-90 mb-4 max-w-2xl">
                    {heroContent.heroSubtitle || "Your trusted business advisory partner"}
                  </p>
                  <Button asChild className="bg-white text-black hover:bg-white/90">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Visit Homepage
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Blog Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {t("blog.title") || "Insights & Expertise"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {t("blog.subtitle") ||
              "Stay informed with the latest insights on business strategy, investment trends, and startup guidance from our expert advisors."}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("blog.search") || "Search articles..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                {posts.length === 0 ? "No articles published yet" : "No articles found"}
              </h3>
              <p className="text-muted-foreground">
                {posts.length === 0
                  ? "We're working on creating valuable content for you. Check back soon!"
                  : "Try adjusting your search terms or browse all articles."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.locale.toUpperCase()}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors font-medium"
                  >
                    {t("blog.readMore") || "Read more"}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
    </div>
  )
}
