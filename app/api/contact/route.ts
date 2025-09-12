import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

// Check if Firebase is properly initialized
if (!db) {
  console.error("Firebase is not initialized. Please check your environment variables.")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, timestamp, locale } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if Firebase is initialized
    if (!db) {
      // Fallback: log to console if Firebase is not configured
      console.log("Contact form submission (Firebase not configured):", {
        name,
        email,
        message,
        timestamp,
        locale,
      })

      return NextResponse.json(
        {
          message: "Contact form submitted successfully",
        },
        { status: 200 },
      )
    }

    try {
      const contactData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        locale: locale || "en",
        submittedAt: serverTimestamp(),
        clientTimestamp: timestamp,
        status: "new", // For tracking follow-up status
        source: "website_contact_form",
      }

      const docRef = await addDoc(collection(db, "contacts"), contactData)

      console.log("Contact form saved to Firebase with ID:", docRef.id)

      return NextResponse.json(
        {
          message: "Contact form submitted successfully",
          id: docRef.id,
        },
        { status: 200 },
      )
    } catch (firebaseError) {
      console.error("Firebase error:", firebaseError)

      // Fallback: log to console if Firebase fails
      console.log("Contact form submission (Firebase failed):", {
        name,
        email,
        message,
        timestamp,
        locale,
      })

      return NextResponse.json(
        {
          message: "Contact form submitted successfully",
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
