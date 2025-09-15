import { TestimonialsSection } from "@/components/testimonials-section"

interface TestimonialsPageProps {
  params: { locale: string }
}

export default function TestimonialsPage({ params }: TestimonialsPageProps) {
  return (
    <div className="min-h-screen">
      <TestimonialsSection locale={params.locale} />
    </div>
  )
}
