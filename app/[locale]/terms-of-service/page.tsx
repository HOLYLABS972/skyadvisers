"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useContactInfo } from "@/hooks/use-contact-info"

export default function TermsOfServicePage() {
  const { contactInfo } = useContactInfo()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  By accessing and using the {contactInfo.businessName} website and services, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  {contactInfo.businessName} provides business advisory services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Business strategy consulting</li>
                  <li>Investment advisory services</li>
                  <li>Startup guidance and mentorship</li>
                  <li>Market analysis and pricing strategies</li>
                  <li>Financial planning and advisory</li>
                  <li>Business development support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>As a user of our services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Provide accurate and truthful information</li>
                  <li>Use our services for lawful purposes only</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not engage in any fraudulent or deceptive practices</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Maintain the confidentiality of any proprietary information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  All content, materials, and intellectual property on this website, including but not limited to text, 
                  graphics, logos, images, and software, are the property of {contactInfo.businessName} or its licensors and are 
                  protected by copyright and other intellectual property laws.
                </p>
                <p className="mt-4">
                  You may not reproduce, distribute, modify, or create derivative works from any content without our 
                  express written permission.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Availability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We strive to provide continuous service availability, but we do not guarantee that our website or 
                  services will be available at all times. We reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Modify or discontinue services with reasonable notice</li>
                  <li>Perform scheduled maintenance and updates</li>
                  <li>Suspend services in case of technical issues</li>
                  <li>Update our website and services as needed</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  To the maximum extent permitted by law, {contactInfo.businessName} shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including but not limited to loss of profits, data, or 
                  business opportunities, arising from your use of our services.
                </p>
                <p className="mt-4">
                  Our total liability for any claims arising from these terms or our services shall not exceed the 
                  amount paid by you for our services in the twelve months preceding the claim.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  You agree to indemnify and hold harmless {contactInfo.businessName}, its officers, directors, employees, and agents 
                  from any claims, damages, losses, or expenses (including reasonable attorney's fees) arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Your use of our services</li>
                  <li>Your violation of these terms</li>
                  <li>Your violation of any third-party rights</li>
                  <li>Any content you submit or transmit through our services</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>, 
                  which also governs your use of our services, to understand our practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We may terminate or suspend your access to our services immediately, without prior notice or liability, 
                  for any reason whatsoever, including without limitation if you breach these terms.
                </p>
                <p className="mt-4">
                  Upon termination, your right to use our services will cease immediately. All provisions of these terms 
                  that by their nature should survive termination shall survive termination.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  These terms shall be governed by and construed in accordance with the laws of the State of [Your State], 
                  without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject 
                  to the exclusive jurisdiction of the courts in [Your State].
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any significant changes 
                  by posting the new terms on this page and updating the "Last updated" date.
                </p>
                <p className="mt-4">
                  Your continued use of our services after any modifications constitutes acceptance of the updated terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
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
