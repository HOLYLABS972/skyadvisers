import { type NextRequest, NextResponse } from "next/server"
import { getAdminDb } from "@/lib/firebase-admin"

// Force Node.js runtime for Firebase admin compatibility
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getAdminUserFromHeaders(request: NextRequest) {
  const userHeader = request.headers.get("x-admin-user")
  return userHeader ? JSON.parse(userHeader) : null
}

export async function GET(request: NextRequest) {
  try {
    // Get Firebase Admin DB
    const db = getAdminDb()
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 503 })
    }

    // Temporarily allow access without authentication for testing
    // const adminUser = getAdminUserFromHeaders(request)
    // if (!adminUser) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    // Get contact info from Firestore using Firebase Admin
    const docRef = db.collection("site_settings").doc("contact_info")
    const docSnap = await docRef.get()

    if (docSnap.exists) {
      const data = docSnap.data()
      return NextResponse.json({
        contactInfo: {
          email: data?.email || "",
          phone: data?.phone || "",
          address: data?.address || "",
          businessName: data?.businessName || "",
        },
        socialLinks: {
          facebook: data?.facebook || "",
          twitter: data?.twitter || "",
          linkedin: data?.linkedin || "",
          youtube: data?.youtube || "",
        },
      })
    } else {
      // Return default values if no settings exist
      return NextResponse.json({
        contactInfo: {
          email: "info@skyadvisers.com",
          phone: "+1 (555) 123-4567",
          address: "123 Business St, City, State 12345",
          businessName: "Skyadvisors",
        },
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get Firebase Admin DB
    const db = getAdminDb()
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 503 })
    }

    // Temporarily allow access without authentication for testing
    // const adminUser = getAdminUserFromHeaders(request)
    // if (!adminUser) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const body = await request.json()
    const { contactInfo, socialLinks } = body

    // Validate required fields
    if (!contactInfo?.email || !contactInfo?.phone || !contactInfo?.address) {
      return NextResponse.json({ error: "Email, phone, and address are required" }, { status: 400 })
    }

    // Update settings in Firestore using Firebase Admin
    const docRef = db.collection("site_settings").doc("contact_info")
    await docRef.set({
      // Contact info
      email: contactInfo.email,
      phone: contactInfo.phone,
      address: contactInfo.address,
      businessName: contactInfo.businessName || "",
      // Social links
      facebook: socialLinks?.facebook || "",
      twitter: socialLinks?.twitter || "",
      linkedin: socialLinks?.linkedin || "",
      youtube: socialLinks?.youtube || "",
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating contact info:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
