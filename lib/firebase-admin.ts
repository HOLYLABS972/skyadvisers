import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

let adminApp: any = null
let adminDb: any = null

function initializeFirebaseAdmin() {
  if (adminApp) return adminApp

  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    console.warn("Firebase Admin environment variables are not configured - skipping initialization")
    return null
  }

  const firebaseAdminConfig = {
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  }

  // Initialize Firebase Admin only if it hasn't been initialized already
  adminApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig, "admin") : getApps()[0]
  return adminApp
}

function getAdminDb() {
  if (!adminDb) {
    const app = initializeFirebaseAdmin()
    if (!app) {
      console.warn("Firebase Admin not initialized - returning null")
      return null
    }
    adminDb = getFirestore(app)
  }
  return adminDb
}

// Export functions instead of initialized instances
export { getAdminDb }
export default initializeFirebaseAdmin
