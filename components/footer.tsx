"use client"

import { useSocialLinks } from "@/hooks/use-social-links"
import { useContactInfo } from "@/hooks/use-contact-info"
import { useLocale } from "@/hooks/use-locale"
import { getTranslation } from "@/lib/i18n"
import { ClientOnly } from "@/components/client-only"
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube } from "lucide-react"

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  // Hardcoded translations for testing
  const translations = {
    en: {
      "nav.services": "Services",
      "nav.about": "About Us",
      "nav.testimonials": "Testimonials",
      "nav.contact": "Contact",
      "about.description": "We are a team of experienced advisors dedicated to helping CEOs and founders navigate the complex world of business strategy and investment.",
    },
    he: {
      "nav.services": "שירותים",
      "nav.about": "אודותינו",
      "nav.testimonials": "המלצות",
      "nav.contact": "צור קשר",
      "about.description": "אנחנו צוות של יועצים מנוסים המוקדשים לעזור למנכ״לים ומייסדים לנווט בעולם המורכב של אסטרטגיה עסקית והשקעות.",
    }
  }
  
  const t = (key: string) => translations[locale as keyof typeof translations]?.[key as keyof typeof translations.en] || key

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <ClientOnly 
              fallback={
                <>
                  <h3 className="text-2xl font-bold mb-4">Skyadvisers</h3>
                  <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-md">{t("about.description")}</p>
                </>
              }
            >
              <FooterContent />
            </ClientOnly>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
{t("nav.services")}
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
{t("nav.about")}
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
{t("nav.testimonials")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
{t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ClientOnly 
              fallback={
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 mt-0.5 text-primary-foreground/60" />
                    <div>
                      <p className="text-primary-foreground/80 text-sm">Email</p>
                      <p className="text-primary-foreground">info@skyadvisers.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 mt-0.5 text-primary-foreground/60" />
                    <div>
                      <p className="text-primary-foreground/80 text-sm">Phone</p>
                      <p className="text-primary-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 mt-0.5 text-primary-foreground/60" />
                    <div>
                      <p className="text-primary-foreground/80 text-sm">Address</p>
                      <p className="text-primary-foreground leading-relaxed">123 Business St, City, State 12345</p>
                    </div>
                  </div>
                </div>
              }
            >
              <ContactInfo />
            </ClientOnly>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <ClientOnly 
              fallback={
                <div className="text-primary-foreground/60 text-sm">
                  © {new Date().getFullYear()} Skyadvisers. All rights reserved.
                </div>
              }
            >
              <CopyrightInfo />
            </ClientOnly>

            <div className="flex space-x-6 text-sm">
              <a href="/privacy-policy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <a href="/cookie-policy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterContent() {
  const { socialLinks, loading } = useSocialLinks()
  const { contactInfo } = useContactInfo()
  const { t } = useLocale()

  return (
    <>
      <h3 className="text-2xl font-bold mb-4">{contactInfo.businessName}</h3>
      <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-md">{t("about.description")}</p>

      {/* Social Links */}
      {!loading && (
        <div className="flex space-x-4">
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
          {socialLinks.facebook && (
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          )}
          {socialLinks.youtube && (
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
          )}
        </div>
      )}
    </>
  )
}

function ContactInfo() {
  const { contactInfo } = useContactInfo()

  return (
    <div className="space-y-3">
      <div className="flex items-start space-x-3">
        <Mail className="h-5 w-5 mt-0.5 text-primary-foreground/60" />
        <div>
          <p className="text-primary-foreground/80 text-sm">Email</p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
          >
            {contactInfo.email}
          </a>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <Phone className="h-5 w-5 mt-0.5 text-primary-foreground/60" />
        <div>
          <p className="text-primary-foreground/80 text-sm">Phone</p>
          <a
            href={`tel:${contactInfo.phone}`}
            className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
          >
            {contactInfo.phone}
          </a>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <MapPin className="h-5 w-5 mt-0.5 text-primary-foreground/60" />
        <div>
          <p className="text-primary-foreground/80 text-sm">Address</p>
          <p className="text-primary-foreground leading-relaxed">{contactInfo.address}</p>
        </div>
      </div>
    </div>
  )
}

function CopyrightInfo() {
  const { contactInfo } = useContactInfo()

  return (
    <div className="text-primary-foreground/60 text-sm">
      © {new Date().getFullYear()} {contactInfo.businessName}. All rights reserved.
    </div>
  )
}
