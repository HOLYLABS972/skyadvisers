"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { usePrivacyContent } from "@/hooks/use-privacy-content"
import { Save, Loader2 } from "lucide-react"

interface PrivacyContent {
  id: string
  introduction: string
  informationWeCollect: string
  howWeUseInfo: string
  informationSharing: string
  dataSecurity: string
  yourRights: string
  cookiesTracking: string
  thirdPartyServices: string
  changesToPolicy: string
  updatedAt: string
}

export default function PrivacyEditPage() {
  const { content, loading, updateContent: saveContent } = usePrivacyContent()
  const [localContent, setLocalContent] = useState<PrivacyContent | null>(null)
  const [saving, setSaving] = useState(false)
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
        description: "Privacy policy content updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update privacy policy content",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (field: keyof PrivacyContent, value: string) => {
    if (localContent) {
      setLocalContent({ ...localContent, [field]: value })
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
            <h1 className="text-3xl font-bold text-foreground">Edit Privacy Policy</h1>
            <p className="text-muted-foreground">Update the content for your privacy policy page</p>
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

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localContent.introduction}
                onChange={(e) => updateContent("introduction", e.target.value)}
                placeholder="Enter introduction text"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localContent.informationWeCollect}
                onChange={(e) => updateContent("informationWeCollect", e.target.value)}
                placeholder="Enter information collection details"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localContent.howWeUseInfo}
                onChange={(e) => updateContent("howWeUseInfo", e.target.value)}
                placeholder="Enter how information is used"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localContent.informationSharing}
                onChange={(e) => updateContent("informationSharing", e.target.value)}
                placeholder="Enter information sharing policy"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localContent.dataSecurity}
                onChange={(e) => updateContent("dataSecurity", e.target.value)}
                placeholder="Enter data security measures"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localContent.yourRights}
                onChange={(e) => updateContent("yourRights", e.target.value)}
                placeholder="Enter user rights information"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localContent.cookiesTracking}
                onChange={(e) => updateContent("cookiesTracking", e.target.value)}
                placeholder="Enter cookies and tracking information"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localContent.thirdPartyServices}
                onChange={(e) => updateContent("thirdPartyServices", e.target.value)}
                placeholder="Enter third-party services information"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localContent.changesToPolicy}
                onChange={(e) => updateContent("changesToPolicy", e.target.value)}
                placeholder="Enter policy change information"
                rows={4}
              />
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
