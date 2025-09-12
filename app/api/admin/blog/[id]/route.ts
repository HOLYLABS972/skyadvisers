import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"

// Force Node.js runtime for Firebase client compatibility
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"

// Check if Firebase is properly initialized
if (!db) {
  console.error("Firebase is not initialized. Please check your environment variables.")
}

function getAdminUserFromHeaders(request: NextRequest) {
  const userHeader = request.headers.get("x-admin-user")
  return userHeader ? JSON.parse(userHeader) : null
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const docRef = doc(db, "blog_posts", params.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    const post = {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate?.()?.toISOString() || docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt?.toDate?.()?.toISOString() || docSnap.data().updatedAt,
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const body = await request.json()
    const { title, slug, excerpt, content, status, locale } = body

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const docRef = doc(db, "blog_posts", params.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    const updateData = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      status: status || "draft",
      locale: locale || "en",
      updatedAt: serverTimestamp(),
    }

    await updateDoc(docRef, updateData)

    return NextResponse.json({
      message: "Blog post updated successfully",
      id: params.id,
    })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const docRef = doc(db, "blog_posts", params.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    await deleteDoc(docRef)

    return NextResponse.json({
      message: "Blog post deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    const body = await request.json()
    const { status } = body

    if (!["draft", "published"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const docRef = doc(db, "blog_posts", params.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    })

    return NextResponse.json({
      message: "Blog post status updated successfully",
    })
  } catch (error) {
    console.error("Error updating blog post status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
