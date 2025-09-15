"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

interface Service {
  id: string
  title: string
  description: string
  imageUrl: string
  imagePath: string
}

interface ServicesContent {
  id: string
  sectionTitle: string
  services: Service[]
  updatedAt: string
}

export function useServicesContent(locale: string) {
  const [content, setContent] = useState<ServicesContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!db) {
          console.warn("Firebase not configured")
          setLoading(false)
          return
        }

        const docRef = doc(db, "site_content", `services_${locale}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setContent({
            id: docSnap.id,
            ...data,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
          } as ServicesContent)
        } else {
          // Set default content if no document exists
          const defaultContent: ServicesContent = {
            id: `services_${locale}`,
            sectionTitle: locale === 'he' ? 'השירותים שלנו' : 'Our Services',
            services: [
              {
                id: 'investment',
                title: locale === 'he' ? 'ייעוץ השקעות' : 'Investment Advisory',
                description: locale === 'he' ? 'הדרכה מומחית באסטרטגיות מימון ויחסי משקיעים.' : 'Expert guidance on funding strategies and investor relations.',
                imageUrl: '',
                imagePath: ''
              },
              {
                id: 'evaluation',
                title: locale === 'he' ? 'הערכת סטארט-אפים' : 'Startup Evaluation',
                description: locale === 'he' ? 'הערכה מקיפה של פוטנציאל סטארט-אפים וכדאיות שוק.' : 'Comprehensive assessment of startup potential and market viability.',
                imageUrl: '',
                imagePath: ''
              },
              {
                id: 'strategy',
                title: locale === 'he' ? 'אסטרטגיה עסקית' : 'Business Strategy',
                description: locale === 'he' ? 'תכנון אסטרטגי וביצוע לצמיחה בת קיימא.' : 'Strategic planning and execution for sustainable growth.',
                imageUrl: '',
                imagePath: ''
              }
            ],
            updatedAt: new Date().toISOString(),
          }
          setContent(defaultContent)
        }
      } catch (error) {
        console.error("Failed to fetch services content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [locale])

  const updateContent = async (newContent: Partial<ServicesContent>) => {
    if (!db) {
      throw new Error("Firebase not configured")
    }

    const docRef = doc(db, "site_content", `services_${locale}`)
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
        } as ServicesContent)
      }
    } catch (error) {
      console.error("Failed to refresh services content after update:", error)
    }
  }

  return { content, loading, updateContent }
}
