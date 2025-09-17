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

        const docRef = doc(db, "site_content", `about_${locale}`)
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
            id: `about_${locale}`,
          sectionTitle: locale === 'he' ? "אודות Skyadvisors" : "About Skyadvisors",
          sectionSubtitle: locale === 'he' ? "מנהיגים את העתיד העסקי עם ייעוץ אסטרטגי מומחה" : "Leading the future of business with expert strategic guidance",
          description: locale === 'he' ? "Skyadvisors הוא צוות של יועצים אסטרטגיים מובילים המתמחים בהנחיית חברות טכנולוגיה וסטארט-אפים לצמיחה משמעותית. עם ניסיון מצטבר של עשרות שנים בתעשייה, אנחנו עוזרים למנכ״לים ומייסדים לנווט באתגרים המורכבים של השוק המודרני ולהשיג תוצאות יוצאות דופן. הצוות שלנו מביא ידע עמוק בהשקעות, פיתוח עסקי ואסטרטגיה גלובלית." : "Skyadvisors is a team of leading strategic advisors specializing in guiding technology companies and startups to significant growth. With decades of combined industry experience, we help CEOs and founders navigate the complex challenges of the modern market and achieve exceptional results. Our team brings deep expertise in investments, business development, and global strategy.",
          aboutImageUrl: "",
          aboutImagePath: "",
          features: [
            {
              id: "expertise",
              title: locale === 'he' ? "מומחיות אסטרטגית" : "Strategic Expertise",
              description: locale === 'he' ? "יועצים מובילים עם ניסיון עמוק בתעשיית הטכנולוגיה, השקעות ופיתוח עסקי גלובלי" : "Leading advisors with deep expertise in technology industry, investments, and global business development"
            },
            {
              id: "results",
              title: locale === 'he' ? "תוצאות מוכחות" : "Proven Results",
              description: locale === 'he' ? "רקורד מרשים של אקזיטים מוצלחים, סבבי גיוס משמעותיים וצמיחה מהירה של חברות" : "Impressive track record of successful exits, significant funding rounds, and rapid company growth"
            },
            {
              id: "global",
              title: locale === 'he' ? "רשת גלובלית" : "Global Network",
              description: locale === 'he' ? "חיבורים בינלאומיים עם משקיעים מובילים, שותפים אסטרטגיים ומומחי תעשייה ברחבי העולם" : "International connections with leading investors, strategic partners, and industry experts worldwide"
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

        const docRef = doc(db, "site_content", `about_${locale}`)
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
