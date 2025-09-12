import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

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
    businessName: 'Skyadvisers'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const docRef = doc(db, 'site_settings', 'contact_info')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setContactInfo({
            email: data.email || 'info@skyadvisers.com',
            phone: data.phone || '+1 (555) 123-4567',
            address: data.address || '123 Business St, City, State 12345',
            businessName: data.businessName || 'Skyadvisers'
          })
        }
      } catch (error) {
        console.error('Error fetching contact info:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContactInfo()
  }, [])

  return { contactInfo, loading }
}
