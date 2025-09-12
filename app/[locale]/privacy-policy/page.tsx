"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useContactInfo } from "@/hooks/use-contact-info"

export default function PrivacyPolicyPage() {
  const { contactInfo } = useContactInfo()

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
                  At {contactInfo.businessName}, we are committed to protecting your privacy and personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Business information and project details</li>
                  <li>Communication preferences</li>
                  <li>Any other information you voluntarily provide</li>
                </ul>
                
                <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Provide and improve our advisory services</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Send you relevant business updates and newsletters</li>
                  <li>Analyze website usage to enhance user experience</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraud and security threats</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With trusted service providers who assist in our operations</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Encryption of sensitive data</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability (receive a copy of your data)</li>
                  <li>Object to certain processing activities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience. 
                  For more detailed information, please see our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Our website may contain links to third-party websites or integrate with third-party services. 
                  We are not responsible for the privacy practices of these external sites. 
                  We encourage you to review their privacy policies before providing any personal information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any significant changes 
                  by posting the new policy on this page and updating the "Last updated" date.
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
