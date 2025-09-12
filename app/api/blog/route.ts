import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"

// Check if Firebase is properly initialized
if (!db) {
  console.error("Firebase is not initialized. Please check your environment variables.")
}

export async function GET() {
  try {
    // Check if Firebase is initialized
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 503 })
    }

    const postsQuery = query(
      collection(db, "blog_posts"),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
    )
    const snapshot = await getDocs(postsQuery)

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
    }))

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching published blog posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
