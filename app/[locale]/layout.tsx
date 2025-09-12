import { notFound } from 'next/navigation'
import { locales } from '@/lib/i18n'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(params.locale as any)) {
    notFound()
  }

  return (
    <>
      <Header locale={params.locale} />
      <main>{children}</main>
      <Footer locale={params.locale} />
    </>
  )
}
