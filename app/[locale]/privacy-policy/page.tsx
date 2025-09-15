"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useContactInfo } from "@/hooks/use-contact-info"
import { usePrivacyContent } from "@/hooks/use-privacy-content"

export default function PrivacyPolicyPage() {
  const { contactInfo } = useContactInfo()
  const { content: privacyContent, loading } = usePrivacyContent()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {privacyContent?.introduction || `At ${contactInfo.businessName}, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {privacyContent?.informationWeCollect || `We collect personal information such as name, contact information, business information, and project details. We also automatically collect technical information including IP address, browser type, and pages visited.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {privacyContent?.howWeUseInfo || `We use the information we collect to provide and improve our advisory services, respond to inquiries, send relevant updates, analyze website usage, comply with legal obligations, and protect against fraud.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {privacyContent?.informationSharing || `We do not sell, trade, or rent your personal information to third parties. We may share your information only with your explicit consent, to comply with legal requirements, to protect our rights, or with trusted service providers.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {privacyContent?.dataSecurity || `We implement appropriate security measures including encryption of sensitive data, secure servers and databases, regular security audits, and limited access to personal information.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {privacyContent?.yourRights || `You have the right to access and review your personal information, request corrections to inaccurate data, request deletion of your personal information, opt-out of marketing communications, and receive a copy of your data.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {privacyContent?.cookiesTracking || `We use cookies and similar tracking technologies to enhance your browsing experience. These technologies help us understand how you interact with our website and improve our services. You can control cookies through your browser settings.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {privacyContent?.thirdPartyServices || `Our website may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these external sites.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {privacyContent?.changesToPolicy || `We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> {contactInfo.email}<br />
                  <strong>Phone:</strong> {contactInfo.phone}<br />
                  <strong>Address:</strong> {contactInfo.address}
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
