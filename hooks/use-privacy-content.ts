"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

interface PrivacyContent {
  id: string
  introduction: string
  informationWeCollect: string
  howWeUseInfo: string
  informationSharing: string
  dataSecurity: string
  yourRights: string
  cookiesTracking: string
  thirdPartyServices: string
  changesToPolicy: string
  updatedAt: string
}

export function usePrivacyContent() {
  const [content, setContent] = useState<PrivacyContent | null>(null)
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

      const docRef = doc(db, "site_content", "privacy")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setContent({
          id: docSnap.id,
          ...data,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as PrivacyContent)
      } else {
        // Set default content if no document exists
        const defaultContent: PrivacyContent = {
          id: "privacy",
          introduction: "At Skyadvisors, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.",
          informationWeCollect: "We collect personal information such as name, contact information, business information, and project details. We also automatically collect technical information including IP address, browser type, and pages visited.",
          howWeUseInfo: "We use the information we collect to provide and improve our advisory services, respond to inquiries, send relevant updates, analyze website usage, comply with legal obligations, and protect against fraud.",
          informationSharing: "We do not sell, trade, or rent your personal information to third parties. We may share your information only with your explicit consent, to comply with legal requirements, to protect our rights, or with trusted service providers.",
          dataSecurity: "We implement appropriate security measures including encryption of sensitive data, secure servers and databases, regular security audits, and limited access to personal information.",
          yourRights: "You have the right to access and review your personal information, request corrections to inaccurate data, request deletion of your personal information, opt-out of marketing communications, and receive a copy of your data.",
          cookiesTracking: "We use cookies and similar tracking technologies to enhance your browsing experience. These technologies help us understand how you interact with our website and improve our services. You can control cookies through your browser settings.",
          thirdPartyServices: "Our website may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these external sites.",
          changesToPolicy: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the 'Last updated' date.",
          updatedAt: new Date().toISOString(),
        }
        setContent(defaultContent)
      }
    } catch (error) {
      console.error("Failed to fetch privacy content:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateContent = async (newContent: Partial<PrivacyContent>) => {
    if (!db) {
      throw new Error("Firebase not configured")
    }

    const docRef = doc(db, "site_content", "privacy")
    const updateData = {
      ...newContent,
      updatedAt: serverTimestamp(),
    }
    
    await setDoc(docRef, updateData, { merge: true })
    await fetchContent() // Refresh the content
  }

  return { content, loading, refetch: fetchContent, updateContent }
}
