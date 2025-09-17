"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

interface Client {
  id: string
  name: string
  logoUrl: string
  link: string
}

interface ClientsContent {
  id: string
  clients: Client[]
  updatedAt: string
}

export function useClientsContent() {
  const [content, setContent] = useState<ClientsContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!db) {
          console.warn("Firebase not configured")
          setLoading(false)
          return
        }

        const docRef = doc(db, "site_content", `clients_${locale}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setContent({
            id: docSnap.id,
            ...data,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
          } as ClientsContent)
        } else {
          // Set default content if no document exists
          const defaultContent: ClientsContent = {
            id: `clients_${locale}`,
            clients: [],
            updatedAt: new Date().toISOString(),
          }
          setContent(defaultContent)
        }
      } catch (error) {
        console.error("Failed to fetch clients content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  const updateContent = async (newContent: Partial<ClientsContent>) => {
    if (!db) {
      throw new Error("Firebase not configured")
    }

    const docRef = doc(db, "site_content", "clients")
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
        } as ClientsContent)
      }
    } catch (error) {
      console.error("Failed to refresh clients content after update:", error)
    }
  }

  return { content, loading, updateContent }
}
