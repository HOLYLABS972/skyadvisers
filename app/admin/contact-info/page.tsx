"use client"

import type React from "react"

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Globe, Phone, MapPin, Mail, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

interface ContactInfo {
  email: string
  phone: string
  address: string
  businessName?: string
}

interface SocialLinks {
  facebook?: string
  twitter?: string
  linkedin?: string
  youtube?: string
}

interface BusinessSettings {
  contactInfo: ContactInfo
  socialLinks: SocialLinks
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<BusinessSettings>({
    contactInfo: {
      email: "",
      phone: "",
      address: "",
      businessName: "",
    },
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
      youtube: "",
    },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      if (!db) {
        setLoading(false)
        return
      }

      const docRef = doc(db, "site_settings", "contact_info")
      const snap = await getDoc(docRef)
      const data = snap.data() as any
      if (data) {
        setSettings({
          contactInfo: {
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            businessName: data.businessName || "",
          },
          socialLinks: {
            facebook: data.facebook || "",
            twitter: data.twitter || "",
            linkedin: data.linkedin || "",
            youtube: data.youtube || "",
          },
        })
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (!db) throw new Error('Firestore not configured on client')

      const docRef = doc(db, "site_settings", "contact_info")
      await setDoc(docRef, {
        email: settings.contactInfo.email,
        phone: settings.contactInfo.phone,
        address: settings.contactInfo.address,
        businessName: settings.contactInfo.businessName,
        facebook: settings.socialLinks.facebook || "",
        twitter: settings.socialLinks.twitter || "",
        linkedin: settings.socialLinks.linkedin || "",
        youtube: settings.socialLinks.youtube || "",
        updatedAt: new Date().toISOString(),
      })
      toast({
        title: "Success",
        description: "Settings updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleContactInfoChange = (field: keyof ContactInfo, value: string) => {
    setSettings((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }))
  }

  const handleSocialLinkChange = (platform: keyof SocialLinks, value: string) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your business information, contact details, and social media links
          </p>
        </div>

        <Tabs defaultValue="social" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
          </TabsList>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Social Media Links
                </CardTitle>
                <CardDescription>
                  Add your social media profiles to display on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Primary Social Media Platforms */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-foreground">Primary Social Media</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4 text-blue-700" />
                          LinkedIn
                        </Label>
                        <Input
                          id="linkedin"
                          type="url"
                          value={settings.socialLinks.linkedin || ""}
                          onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                          placeholder="https://linkedin.com/company/yourcompany"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="twitter" className="flex items-center gap-2">
                          <Twitter className="h-4 w-4 text-blue-400" />
                          Twitter
                        </Label>
                        <Input
                          id="twitter"
                          type="url"
                          value={settings.socialLinks.twitter || ""}
                          onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                          placeholder="https://twitter.com/yourhandle"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="facebook" className="flex items-center gap-2">
                          <Facebook className="h-4 w-4 text-blue-600" />
                          Facebook
                        </Label>
                        <Input
                          id="facebook"
                          type="url"
                          value={settings.socialLinks.facebook || ""}
                          onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
                          placeholder="https://facebook.com/yourpage"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="youtube" className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-600" />
                          YouTube
                        </Label>
                        <Input
                          id="youtube"
                          type="url"
                          value={settings.socialLinks.youtube || ""}
                          onChange={(e) => handleSocialLinkChange("youtube", e.target.value)}
                          placeholder="https://youtube.com/c/yourchannel"
                        />
                      </div>
                    </div>

                  </div>

                  <Button type="submit" disabled={saving} className="w-full">
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Social Media Links
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Update your business contact information displayed on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={settings.contactInfo.businessName || ""}
                        onChange={(e) => handleContactInfoChange("businessName", e.target.value)}
                        placeholder="Skyadvisers"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.contactInfo.email}
                        onChange={(e) => handleContactInfoChange("email", e.target.value)}
                        placeholder="info@skyadvisers.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={settings.contactInfo.phone}
                        onChange={(e) => handleContactInfoChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      value={settings.contactInfo.address}
                      onChange={(e) => handleContactInfoChange("address", e.target.value)}
                      placeholder="123 Business St, City, State 12345"
                      required
                    />
                  </div>


                  <Button type="submit" disabled={saving} className="w-full">
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Contact Information
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
