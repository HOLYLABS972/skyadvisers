"use client"

import { useState, useEffect } from "react"

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
    fetchSocialLinks()
  }, [])

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch("/api/contact-info")
      if (response.ok) {
        const data = await response.json()
        setSocialLinks(data.socialLinks || {})
      }
    } catch (error) {
      console.error("Failed to fetch social links:", error)
    } finally {
      setLoading(false)
    }
  }

  return { socialLinks, loading }
}
