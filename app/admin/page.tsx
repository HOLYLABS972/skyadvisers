"use client"

import { useState, useEffect } from "react"

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, Users, TrendingUp, Loader2, Settings, Calendar } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

interface DashboardStats {
  totalBlogPosts: number
  totalContacts: number
  draftPosts: number
  thisMonthContacts: number
}

type ActivityItem =
  | { type: 'post'; id: string; title: string; status: 'draft' | 'published'; timestamp: string }
  | { type: 'contact'; id: string; name: string; email: string; timestamp: string }

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogPosts: 0,
    totalContacts: 0,
    draftPosts: 0,
    thisMonthContacts: 0,
  })
  const [loading, setLoading] = useState(true)
  const [activity, setActivity] = useState<ActivityItem[]>([])

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      if (!db) {
        setLoading(false)
        return
      }

      // Blog posts
      const postsQuery = query(collection(db, "blog_posts"), orderBy("createdAt", "desc"))
      const postsSnap = await getDocs(postsQuery)
      const posts = postsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[]

      // Contacts
      const contactsQuery = query(collection(db, "contacts"), orderBy("submittedAt", "desc"))
      const contactsSnap = await getDocs(contactsQuery)
      const contacts = contactsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[]

      const totalBlogPosts = posts.filter((p) => p.status === 'published').length
      const draftPosts = posts.filter((p) => p.status === 'draft').length
      const totalContacts = contacts.length

      const thisMonth = new Date()
      thisMonth.setDate(1)
      const thisMonthContacts = contacts.filter((c) => (c.submittedAt?.toDate ? c.submittedAt.toDate() : new Date(c.submittedAt)) >= thisMonth).length

      setStats({ totalBlogPosts, totalContacts, draftPosts, thisMonthContacts })

      const postActivities: ActivityItem[] = posts.map((post) => ({
        type: 'post',
        id: post.id,
        title: post.title,
        status: (post.status === 'published' ? 'published' : 'draft'),
        timestamp: (post.updatedAt?.toDate ? post.updatedAt.toDate().toISOString() : post.updatedAt) ||
                  (post.createdAt?.toDate ? post.createdAt.toDate().toISOString() : post.createdAt),
      }))

      const contactActivities: ActivityItem[] = contacts.map((c) => ({
        type: 'contact',
        id: c.id,
        name: c.name,
        email: c.email,
        timestamp: c.submittedAt?.toDate ? c.submittedAt.toDate().toISOString() : c.submittedAt,
      }))

      const merged = [...postActivities, ...contactActivities]
        .filter((a) => !!a.timestamp)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 8)

      setActivity(merged)
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error)
    } finally {
      setLoading(false)
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Skyadvisors admin panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBlogPosts}</div>
              <p className="text-xs text-muted-foreground">Published articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
              <p className="text-xs text-muted-foreground">Total inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Posts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draftPosts}</div>
              <p className="text-xs text-muted-foreground">Unpublished drafts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisMonthContacts}</div>
              <p className="text-xs text-muted-foreground">New inquiries</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activity.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                  <p className="text-sm">Blog posts and contact forms will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activity.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="flex items-start justify-between border-b border-border pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          {item.type === 'post' ? (
                            <FileText className="h-5 w-5 text-secondary" />
                          ) : (
                            <MessageSquare className="h-5 w-5 text-secondary" />
                          )}
                        </div>
                        <div>
                          {item.type === 'post' ? (
                            <div>
                              <p className="text-sm text-foreground">
                                <span className="font-medium">{item.status === 'published' ? 'Published' : 'Draft updated'}:</span> {item.title}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm text-foreground">
                                <span className="font-medium">New contact:</span> {item.name} <span className="text-muted-foreground">({item.email})</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="/admin/blog/new"
                className="flex items-center p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <FileText className="h-8 w-8 text-secondary mr-4" />
                <div>
                  <h3 className="font-medium">Create New Blog Post</h3>
                  <p className="text-sm text-muted-foreground">Write and publish a new article</p>
                </div>
              </a>

              <a
                href="/admin/contacts"
                className="flex items-center p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <MessageSquare className="h-8 w-8 text-secondary mr-4" />
                <div>
                  <h3 className="font-medium">View Contact Forms</h3>
                  <p className="text-sm text-muted-foreground">Review and respond to inquiries</p>
                </div>
              </a>

              <a
                href="/admin/contact-info"
                className="flex items-center p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Settings className="h-8 w-8 text-secondary mr-4" />
                <div>
                  <h3 className="font-medium">Manage Settings</h3>
                  <p className="text-sm text-muted-foreground">Update contact info and social links</p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
