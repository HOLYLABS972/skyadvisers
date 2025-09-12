import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "./firebase"

export const signInAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export const signOutAdmin = async () => {
  try {
    await signOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser
  if (user) {
    try {
      return await user.getIdToken()
    } catch (error) {
      console.error("Error getting auth token:", error)
      return null
    }
  }
  return null
}
