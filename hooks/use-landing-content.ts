"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

interface Client {
  id: string
  name: string
  logoUrl: string
}

interface LandingContent {
  id: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroImageUrl?: string
  heroImagePath?: string
  clients?: Client[]
  servicesTitle: string
  servicesSubtitle: string
  aboutTitle: string
  aboutSubtitle: string
  aboutDescription: string
  testimonialsTitle: string
  testimonialsSubtitle: string
  contactTitle: string
  contactSubtitle: string
  contactDescription: string
  updatedAt: string
}

export function useLandingContent(locale: string) {
  const [content, setContent] = useState<LandingContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!db) {
          console.warn("Firebase not configured")
          setLoading(false)
          return
        }

        const docRef = doc(db, "site_content", `landing_${locale}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setContent({
            id: docSnap.id,
            ...data,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
          } as LandingContent)
        } else {
          // Set default content if no document exists
          const defaultContent: LandingContent = {
            id: `landing_${locale}`,
            heroTitle: "",
            heroSubtitle: "",
            heroDescription: locale === 'he' ? "אנחנו מספקים הדרכה מומחית לעזור לעסק שלכם לגדול ולהצליח בשוק התחרותי של היום." : "We provide expert guidance to help your business grow and succeed in today's competitive market.",
            heroImageUrl: "",
            heroImagePath: "",
            clients: [],
            servicesTitle: locale === 'he' ? "השירותים שלנו" : "Our Services",
            servicesSubtitle: locale === 'he' ? "פתרונות עסקיים מקיפים המותאמים לצרכים שלכם" : "Comprehensive business solutions tailored to your needs",
            aboutTitle: locale === 'he' ? "אודותינו" : "About Us",
            aboutSubtitle: locale === 'he' ? "אנשי מקצוע מנוסים המוקדשים להצלחה שלכם" : "Experienced professionals dedicated to your success",
            aboutDescription: locale === 'he' ? "עם שנים של ניסיון בייעוץ עסקי, אנחנו עוזרים לחברות לנווט באתגרים מורכבים ולהשיג צמיחה בת קיימא." : "With years of experience in business advisory, we help companies navigate complex challenges and achieve sustainable growth.",
            testimonialsTitle: locale === 'he' ? "מה הלקוחות שלנו אומרים" : "What Our Clients Say",
            testimonialsSubtitle: locale === 'he' ? "סיפורי הצלחה מעסקים שעזרנו להם" : "Success stories from businesses we've helped",
            contactTitle: locale === 'he' ? "צור קשר" : "Get In Touch",
            contactSubtitle: locale === 'he' ? "מוכנים לקחת את העסק שלכם לשלב הבא?" : "Ready to take your business to the next level?",
            contactDescription: locale === 'he' ? "צרו איתנו קשר היום כדי לדון איך אנחנו יכולים לעזור לעסק שלכם לגדול ולהצליח." : "Contact us today to discuss how we can help your business grow and succeed.",
            updatedAt: new Date().toISOString(),
          }
          setContent(defaultContent)
        }
      } catch (error) {
        console.error("Failed to fetch landing content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [locale])

  const updateContent = async (newContent: Partial<LandingContent>) => {
    if (!db) {
      throw new Error("Firebase not configured")
    }

    const docRef = doc(db, "site_content", `landing_${locale}`)
    const updateData = {
      ...newContent,
      updatedAt: serverTimestamp(),
    }
    
    await setDoc(docRef, updateData, { merge: true })
    
    // Refresh the content by refetching
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setContent({
          id: docSnap.id,
          ...data,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as LandingContent)
      }
    } catch (error) {
      console.error("Failed to refresh content after update:", error)
    }
  }

  const refetch = async () => {
    if (!db) {
      console.warn("Firebase not configured")
      return
    }

    try {
      const docRef = doc(db, "site_content", `landing_${locale}`)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        setContent({
          id: docSnap.id,
          ...data,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as LandingContent)
      }
    } catch (error) {
      console.error("Failed to refetch content:", error)
    }
  }

  return { content, loading, refetch, updateContent }
}
