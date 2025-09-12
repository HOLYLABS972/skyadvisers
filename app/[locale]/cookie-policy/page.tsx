"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useContactInfo } from "@/hooks/use-contact-info"

export default function CookiePolicyPage() {
  const { contactInfo } = useContactInfo()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What Are Cookies?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be disabled.</li>
                  <li><strong>Analytics Cookies:</strong> We use these to understand how visitors interact with our website and improve our services.</li>
                  <li><strong>Preference Cookies:</strong> These remember your choices and preferences to provide a personalized experience.</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track the effectiveness of our campaigns.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  You can control and manage cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>View and delete cookies</li>
                  <li>Block cookies from specific websites</li>
                  <li>Block all third-party cookies</li>
                  <li>Clear all cookies when you close your browser</li>
                </ul>
                <p className="mt-4">
                  Please note that disabling certain cookies may affect the functionality of our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We may use third-party services that set their own cookies, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Vercel Analytics:</strong> For understanding user behavior and site performance</li>
                  <li><strong>Firebase:</strong> For authentication and database services</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  If you have any questions about our use of cookies, please contact us at:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> {contactInfo.email}<br />
                  <strong>Phone:</strong> {contactInfo.phone}
                </p>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground mt-8">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
