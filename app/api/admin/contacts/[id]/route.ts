import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"

// Force Node.js runtime for Firebase client compatibility
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { doc, updateDoc } from "firebase/firestore"

function getAdminUserFromHeaders(request: NextRequest) {
  const userHeader = request.headers.get("x-admin-user")
  return userHeader ? JSON.parse(userHeader) : null
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Temporarily allow access without authentication for testing
    // const adminUser = getAdminUserFromHeaders(request)
    // if (!adminUser) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const { status } = await request.json()

    if (!["new", "read", "responded"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const contactRef = doc(db, "contacts", params.id)
    await updateDoc(contactRef, { status })

    return NextResponse.json({ message: "Contact status updated successfully" })
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
