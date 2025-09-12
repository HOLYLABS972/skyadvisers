import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export interface ContactFormData {
  name: string
  email: string
  message: string
  locale?: string
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const contactData = {
      ...data,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
      submittedAt: serverTimestamp(),
      status: "new",
      source: "website_contact_form",
    }

    const docRef = await addDoc(collection(db, "contacts"), contactData)
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw new Error("Failed to submit contact form")
  }
}
