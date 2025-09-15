import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

interface ContactInfo {
  email: string
  phone: string
  address: string
  businessName: string
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'info@skyadvisers.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
    businessName: 'Skyadvisors'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If Firebase isn't configured, stop loading and keep defaults
    if (!db) {
      setLoading(false)
      return
    }

    const docRef = doc(db, 'site_settings', 'contact_info')

    // Real-time subscription to contact info
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        const data = snapshot.data()
        if (data) {
          setContactInfo({
            email: data.email || 'info@skyadvisers.com',
            phone: data.phone || '+1 (555) 123-4567',
            address: data.address || '123 Business St, City, State 12345',
            businessName: data.businessName || 'Skyadvisors',
          })
        }
        setLoading(false)
      },
      (error) => {
        console.error('Error subscribing to contact info:', error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { contactInfo, loading }
}
