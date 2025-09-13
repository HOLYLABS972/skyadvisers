import { storage } from "./firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

export interface UploadResult {
  url: string
  path: string
}

export async function uploadImage(
  file: File,
  path: string = "blog-images"
): Promise<UploadResult> {
  if (!storage) {
    throw new Error("Firebase Storage not configured")
  }

  // Generate unique filename
  const timestamp = Date.now()
  const fileName = `${timestamp}-${file.name}`
  const fullPath = `${path}/${fileName}`

  // Create storage reference
  const storageRef = ref(storage, fullPath)

  try {
    // Upload file
    const snapshot = await uploadBytes(storageRef, file)
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return {
      url: downloadURL,
      path: fullPath
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    throw new Error("Failed to upload image")
  }
}

export async function deleteImage(imagePath: string): Promise<void> {
  if (!storage) {
    throw new Error("Firebase Storage not configured")
  }

  try {
    const imageRef = ref(storage, imagePath)
    await deleteObject(imageRef)
  } catch (error) {
    console.error("Error deleting image:", error)
    throw new Error("Failed to delete image")
  }
}

export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Please select a valid image file (JPEG, PNG, WebP, or GIF)"
    }
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "Image size must be less than 5MB"
    }
  }

  return { isValid: true }
}
