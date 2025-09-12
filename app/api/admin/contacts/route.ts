import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"

// Force Node.js runtime for Firebase client compatibility
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { collection, getDocs, query, orderBy } from "firebase/firestore"

// Check if Firebase is properly initialized
if (!db) {
  console.error("Firebase is not initialized. Please check your environment variables.")
}

function getAdminUserFromHeaders(request: NextRequest) {
  const userHeader = request.headers.get("x-admin-user")
  return userHeader ? JSON.parse(userHeader) : null
}

export async function GET(request: NextRequest) {
  try {
    // Check if Firebase is initialized
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 503 })
    }

    // Temporarily allow access without authentication for testing
    // const adminUser = getAdminUserFromHeaders(request)
    // if (!adminUser) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const contactsQuery = query(collection(db, "contacts"), orderBy("submittedAt", "desc"))
    const snapshot = await getDocs(contactsQuery)

    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt?.toDate?.()?.toISOString() || doc.data().submittedAt,
    }))

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
