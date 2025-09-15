import { Header } from "@/components/header"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

interface ContactPageProps {
  params: { locale: string }
}

export default function ContactPage({ params }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header locale={params.locale} />
      <main className="pt-8">
        <ContactSection locale={params.locale} />
      </main>
      <Footer />
    </div>
  )
}
