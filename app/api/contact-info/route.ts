import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

// Force Node.js runtime for Firebase client compatibility
export const runtime = 'nodejs'

// Check if Firebase is properly initialized
if (!db) {
  console.error("Firebase is not initialized. Please check your environment variables.")
}

export async function GET() {
  try {
    // Check if Firebase is initialized
    if (!db) {
      // Return default values if Firebase is not configured
      return NextResponse.json({
        email: "info@skyadvisers.com",
        phone: "+1 (555) 123-4567",
        address: "123 Business St, City, State 12345",
        socialLinks: {
          facebook: "",
          twitter: "",
          linkedin: "",
          youtube: "",
        },
      })
    }

    // Get contact info from Firestore using Firebase client
    const docRef = doc(db, "site_settings", "contact_info")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return NextResponse.json({
        email: data?.email || "info@skyadvisers.com",
        phone: data?.phone || "+1 (555) 123-4567",
        address: data?.address || "123 Business St, City, State 12345",
        socialLinks: {
          facebook: data?.facebook || "",
          twitter: data?.twitter || "",
          linkedin: data?.linkedin || "",
          youtube: data?.youtube || "",
        },
      })
    } else {
      // Return default values if no contact info exists
      return NextResponse.json({
        email: "info@skyadvisers.com",
        phone: "+1 (555) 123-4567",
        address: "123 Business St, City, State 12345",
        socialLinks: {
          facebook: "",
          twitter: "",
          linkedin: "",
          youtube: "",
        },
      })
    }
  } catch (error) {
    console.error("Error fetching contact info:", error)
    // Return default values on error
    return NextResponse.json({
      email: "info@skyadvisers.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, City, State 12345",
      socialLinks: {
        facebook: "",
        twitter: "",
        linkedin: "",
        youtube: "",
      },
    })
  }
}
