"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

interface AboutContent {
  id: string
  sectionTitle: string
  sectionSubtitle: string
  description: string
  aboutImageUrl: string
  aboutImagePath: string
  features: {
    id: string
    title: string
    description: string
  }[]
  updatedAt: string
}

export function useAboutContent(locale: string) {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [locale])

  const fetchContent = async () => {
    try {
      if (!db) {
        console.warn("Firebase not configured")
        setLoading(false)
        return
      }

        const docRef = doc(db, "site_content", "about_shared")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setContent({
          id: docSnap.id,
          ...data,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as AboutContent)
      } else {
        const defaultContent: AboutContent = {
            id: "about_shared",
          sectionTitle: locale === 'he' ? "אודותינו" : "About Us",
          sectionSubtitle: locale === 'he' ? "אנשי מקצוע מנוסים המוקדשים להצלחה שלכם" : "Experienced professionals dedicated to your success",
          description: locale === 'he' ? "עם שנים של ניסיון בייעוץ עסקי, אנחנו עוזרים לחברות לנווט באתגרים מורכבים ולהשיג צמיחה בת קיימא. הצוות שלנו מביא ידע עמוק בתעשייה ותוצאות מוכחות." : "With years of experience in business advisory, we help companies navigate complex challenges and achieve sustainable growth. Our team brings deep industry knowledge and proven results.",
          aboutImageUrl: "",
          aboutImagePath: "",
          features: [
            {
              id: "expertise",
              title: locale === 'he' ? "צוות מומחים" : "Expert Team",
              description: locale === 'he' ? "אנשי מקצוע ותיקים עם עשורים של ניסיון מצטבר" : "Seasoned professionals with decades of combined experience"
            },
            {
              id: "results",
              title: locale === 'he' ? "תוצאות מוכחות" : "Proven Results",
              description: locale === 'he' ? "רקורד של אקזיטים מוצלחים וסבבי גיוס" : "Track record of successful exits and funding rounds"
            },
            {
              id: "global",
              title: locale === 'he' ? "נוכחות גלובלית" : "Global Presence",
              description: locale === 'he' ? "רשת בינלאומית של משקיעים ושיתופי פעולה" : "International network of investors and partnerships"
            }
          ],
          updatedAt: new Date().toISOString(),
        }
        setContent(defaultContent)
      }
    } catch (error) {
      console.error("Failed to fetch about content:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateContent = async (newContent: Partial<AboutContent>) => {
    if (!db) {
      throw new Error("Firebase not configured")
    }

        const docRef = doc(db, "site_content", "about_shared")
    const updateData = {
      ...newContent,
      updatedAt: serverTimestamp(),
    }

    await setDoc(docRef, updateData, { merge: true })
    await fetchContent()
  }

  const refetch = async () => {
    await fetchContent()
  }

  return { content, loading, refetch, updateContent }
}
