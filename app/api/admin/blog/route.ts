import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"

// Force Node.js runtime for Firebase client compatibility
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore"

function getAdminUserFromHeaders(request: NextRequest) {
  const userHeader = request.headers.get("x-admin-user")
  return userHeader ? JSON.parse(userHeader) : null
}

export async function GET(request: NextRequest) {
  try {
    // Temporarily allow access without authentication for testing
    // const adminUser = getAdminUserFromHeaders(request)
    // if (!adminUser) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const postsQuery = query(collection(db, "blog_posts"), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(postsQuery)

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const blogPostData = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      status: status || "draft",
      locale: locale || "en",
      author: "admin@skyadvisers.com", // Temporarily hardcoded since auth is disabled
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "blog_posts"), blogPostData)

    return NextResponse.json({
      message: "Blog post created successfully",
      id: docRef.id,
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
