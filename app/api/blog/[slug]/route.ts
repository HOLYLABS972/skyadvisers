import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

// Check if Firebase is properly initialized
if (!db) {
  console.error("Firebase is not initialized. Please check your environment variables.")
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    // Check if Firebase is initialized
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 503 })
    }

    const postQuery = query(
      collection(db, "blog_posts"),
      where("slug", "==", params.slug),
      where("status", "==", "published"),
    )
    const snapshot = await getDocs(postQuery)

    if (snapshot.empty) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    const doc = snapshot.docs[0]
    const post = {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
