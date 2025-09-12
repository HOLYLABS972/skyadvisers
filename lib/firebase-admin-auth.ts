import { getAuth } from "firebase-admin/auth"
import { getAdminApp } from "./firebase-admin"

export const verifyAuthToken = async (token: string) => {
  try {
    const app = await getAdminApp()
    if (!app) {
      return { user: null, error: "Firebase Admin not available" }
    }

    const auth = getAuth(app)
    const decodedToken = await auth.verifyIdToken(token)
    return { user: decodedToken, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export const isAdminUser = (user: any): boolean => {
  // You can check custom claims, specific email domains, or user UIDs
  return (
    user?.email?.endsWith("@skyadvisers.com") ||
    user?.customClaims?.admin === true ||
    user?.uid === process.env.ADMIN_USER_UID
  )
}
