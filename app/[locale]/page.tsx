import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ClientsSection } from "@/components/clients-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"

interface HomePageProps {
  params: { locale: string }
}

export default function HomePage({ params }: HomePageProps) {
  return (
    <>
      <HeroSection locale={params.locale} />
      <AboutSection locale={params.locale} />
      <ClientsSection locale={params.locale} />
      <ServicesSection locale={params.locale} />
      <TestimonialsSection locale={params.locale} />
      <ContactSection locale={params.locale} />
    </>
  )
}
