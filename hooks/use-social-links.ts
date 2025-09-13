"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, onSnapshot } from "firebase/firestore"

interface SocialLinks {
  facebook?: string
  twitter?: string
  linkedin?: string
  youtube?: string
}

export function useSocialLinks() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }

    const docRef = doc(db, "site_settings", "contact_info")
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        const data = snapshot.data() as any
        setSocialLinks({
          facebook: data?.facebook || "",
          twitter: data?.twitter || "",
          linkedin: data?.linkedin || "",
          youtube: data?.youtube || "",
        })
        setLoading(false)
      },
      (error) => {
        console.error("Failed to subscribe to social links:", error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { socialLinks, loading }
}
