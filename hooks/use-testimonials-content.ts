"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

interface Testimonial {
  id: string
  name: string
  title: string
  content: string
  rating: number
}

interface TestimonialsContent {
  id: string
  sectionTitle: string
  sectionSubtitle: string
  testimonials: Testimonial[]
  updatedAt: string
}

export function useTestimonialsContent(locale: string) {
  const [content, setContent] = useState<TestimonialsContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!db) {
          console.warn("Firebase not configured")
          setLoading(false)
          return
        }

        const docRef = doc(db, "site_content", `testimonials_${locale}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setContent({
            id: docSnap.id,
            ...data,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
          } as TestimonialsContent)
        } else {
          // Set default content if no document exists
          const defaultContent: TestimonialsContent = {
            id: `testimonials_${locale}`,
            sectionTitle: locale === 'he' ? 'המלצות' : 'Testimonials',
            sectionSubtitle: locale === 'he' ? 'מה הלקוחות שלנו אומרים על העבודה איתנו' : 'What our clients say about working with us',
            testimonials: [
              {
                id: 'testimonial_1',
                name: 'Sarah Chen',
                title: locale === 'he' ? 'מנכ״לית, TechFlow' : 'CEO, TechFlow',
                content: locale === 'he' ? 'Skyadvisers סייעו לנו לנווט את סבב גיוס ה‑Series A במקצועיות יוצאת דופן. ההכוונה האסטרטגית שלהם הייתה בלתי‑החלפה.' : 'Skyadvisers helped us navigate our Series A funding round with exceptional professionalism. Their strategic guidance was invaluable.',
                rating: 5
              },
              {
                id: 'testimonial_2',
                name: 'David Rodriguez',
                title: locale === 'he' ? 'מייסד, InnovateLab' : 'Founder, InnovateLab',
                content: locale === 'he' ? 'ההבנה העמוקה של הצוות את אקוסיסטם הסטארטאפים ואת מחשבת המשקיעים עשתה את כל ההבדל באסטרטגיית הצמיחה שלנו.' : 'The team\'s deep understanding of the startup ecosystem and investor mindset made all the difference in our growth strategy.',
                rating: 5
              },
              {
                id: 'testimonial_3',
                name: 'Rachel Kim',
                title: locale === 'he' ? 'מנכ״לית, DataVision' : 'CEO, DataVision',
                content: locale === 'he' ? 'מקצועיים, חדים ומוכווני תוצאות. Skyadvisers עלו על כל הציפיות בכל היבט של השירות.' : 'Professional, sharp, and results-oriented. Skyadvisers exceeded all expectations in every aspect of their service.',
                rating: 5
              }
            ],
            updatedAt: new Date().toISOString(),
          }
          setContent(defaultContent)
        }
      } catch (error) {
        console.error("Failed to fetch testimonials content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [locale])

  const updateContent = async (newContent: Partial<TestimonialsContent>) => {
    if (!db) {
      throw new Error("Firebase not configured")
    }

    const docRef = doc(db, "site_content", `testimonials_${locale}`)
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
        } as TestimonialsContent)
      }
    } catch (error) {
      console.error("Failed to refresh testimonials content after update:", error)
    }
  }

  return { content, loading, updateContent }
}
