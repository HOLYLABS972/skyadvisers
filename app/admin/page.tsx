"use client"

import { useState, useEffect } from "react"

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, Users, TrendingUp, Loader2, Settings } from "lucide-react"

interface DashboardStats {
  totalBlogPosts: number
  totalContacts: number
  draftPosts: number
  thisMonthContacts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogPosts: 0,
    totalContacts: 0,
    draftPosts: 0,
    thisMonthContacts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // Fetch blog posts count
      const blogResponse = await fetch("/api/admin/blog")
      const blogData = blogResponse.ok ? await blogResponse.json() : { posts: [] }
      
      // Fetch contacts count
      const contactsResponse = await fetch("/api/admin/contacts")
      const contactsData = contactsResponse.ok ? await contactsResponse.json() : { contacts: [] }

      const totalBlogPosts = blogData.posts?.length || 0
      const totalContacts = contactsData.contacts?.length || 0
      const draftPosts = blogData.posts?.filter((post: any) => !post.published)?.length || 0
      
      // Calculate this month's contacts
      const thisMonth = new Date()
      thisMonth.setDate(1)
      const thisMonthContacts = contactsData.contacts?.filter((contact: any) => 
        new Date(contact.createdAt) >= thisMonth
      )?.length || 0

      setStats({
        totalBlogPosts,
        totalContacts,
        draftPosts,
        thisMonthContacts,
      })
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
          <p className="text-muted-foreground">Welcome to the Skyadvisers admin panel</p>
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
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm">Blog posts and contact forms will appear here</p>
              </div>
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
