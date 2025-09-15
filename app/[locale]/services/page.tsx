import { ServicesSection } from "@/components/services-section"

interface ServicesPageProps {
  params: { locale: string }
}

export default function ServicesPage({ params }: ServicesPageProps) {
  return (
    <div className="min-h-screen">
      <ServicesSection locale={params.locale} />
    </div>
  )
}
