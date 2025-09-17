"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

export interface PageSection {
  id: string
  name: string
  title: string
  enabled: boolean
  order: number
}

interface PageSectionsContent {
  id: string
  sections: PageSection[]
  updatedAt: string
}

const DEFAULT_SECTIONS: PageSection[] = [
  { id: "hero", name: "Hero Section", title: "Hero Section", enabled: true, order: 1 },
  { id: "about", name: "About Us", title: "About Us", enabled: true, order: 2 },
  { id: "services", name: "Services", title: "Services", enabled: true, order: 3 },
  { id: "clients", name: "Clients", title: "Our Clients", enabled: true, order: 4 },
  { id: "testimonials", name: "Testimonials", title: "Testimonials", enabled: true, order: 5 },
  { id: "contact", name: "Contact", title: "Contact", enabled: true, order: 6 },
]

export function usePageSections() {
  const [content, setContent] = useState<PageSectionsContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      if (!db) {
        console.warn("Firebase not configured")
        setLoading(false)
        return
      }

      const docRef = doc(db, "site_content", "page_sections")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setContent({
          id: docSnap.id,
          ...data,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as PageSectionsContent)
      } else {
        // Set default content if no document exists
        const defaultContent: PageSectionsContent = {
          id: "page_sections",
          sections: DEFAULT_SECTIONS,
          updatedAt: new Date().toISOString(),
        }
        setContent(defaultContent)
      }
    } catch (error) {
      console.error("Failed to fetch page sections:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateSections = async (newSections: PageSection[]) => {
    if (!db) {
      throw new Error("Firebase not configured")
    }

    const docRef = doc(db, "site_content", "page_sections")
    const updateData = {
      sections: newSections,
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
        } as PageSectionsContent)
      }
    } catch (error) {
      console.error("Failed to refresh page sections after update:", error)
    }
  }

  const toggleSection = async (sectionId: string) => {
    const sections = content?.sections || []
    const updatedSections = sections.map(section =>
      section.id === sectionId ? { ...section, enabled: !section.enabled } : section
    )
    await updateSections(updatedSections)
  }

  const reorderSections = async (newOrder: PageSection[]) => {
    const reorderedSections = newOrder.map((section, index) => ({
      ...section,
      order: index + 1
    }))
    await updateSections(reorderedSections)
  }

  return { 
    content, 
    loading, 
    updateSections, 
    toggleSection, 
    reorderSections 
  }
}
