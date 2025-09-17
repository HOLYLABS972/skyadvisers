"use client"

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ClientsSection } from "@/components/clients-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { usePageSections } from "@/hooks/use-page-sections"

interface HomePageProps {
  params: { locale: string }
}

export default function HomePage({ params }: HomePageProps) {
  const { content: sectionsContent } = usePageSections()
  
  const sections = sectionsContent?.sections?.sort((a, b) => a.order - b.order) || []

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return <HeroSection key="hero" locale={params.locale} />
      case 'about':
        return <AboutSection key="about" locale={params.locale} />
      case 'services':
        return <ServicesSection key="services" locale={params.locale} />
      case 'clients':
        return <ClientsSection key="clients" locale={params.locale} />
      case 'testimonials':
        return <TestimonialsSection key="testimonials" locale={params.locale} />
      case 'contact':
        return <ContactSection key="contact" locale={params.locale} />
      default:
        return null
    }
  }

  return (
    <>
      {sections
        .filter(section => section.enabled)
        .map(section => renderSection(section.id))}
    </>
  )
}
