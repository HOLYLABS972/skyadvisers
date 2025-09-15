"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { uploadImage, validateImageFile } from "@/lib/image-upload"
import { Upload, X, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Client {
  id: string
  name: string
  description: string
  logoUrl: string
}

interface ClientModalProps {
  onSave: (client: Omit<Client, 'id'>) => Promise<void>
  trigger: React.ReactNode
}

export function ClientModal({ onSave, trigger }: ClientModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [logoPreview, setLogoPreview] = useState("")
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!validateImageFile(file)) {
      toast({
        title: "Invalid file",
        description: "Please select a valid image file (JPG, PNG, GIF, WebP)",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const { url } = await uploadImage(file, "client-logos")
      setLogoUrl(url)
      setLogoPreview(url)
    } catch (error) {
      console.error("Failed to upload image:", error)
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setLogoUrl("")
    setLogoPreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a client name",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      await onSave({
        name: name.trim(),
        description: description.trim(),
        logoUrl,
      })
      
      // Reset form
      setName("")
      setDescription("")
      setLogoUrl("")
      setLogoPreview("")
      setOpen(false)
      
      toast({
        title: "Client added",
        description: "Client has been added successfully",
      })
    } catch (error) {
      console.error("Failed to save client:", error)
      toast({
        title: "Save failed",
        description: "Failed to save client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setName("")
    setDescription("")
    setLogoUrl("")
    setLogoPreview("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Client Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Client Name *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter client name"
              className="w-full"
            />
          </div>

          {/* Client Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter client description (optional)"
              className="w-full min-h-[80px] resize-none"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Logo
            </label>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {logoPreview ? (
              <div className="space-y-2">
                <div className="relative">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-32 object-contain bg-muted rounded-lg border"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Change Logo"}
                </Button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
              >
                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center">
                  Click to upload logo
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, GIF, WebP (max 5MB)
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSave}
              disabled={saving || !name.trim()}
              className="flex-1"
            >
              {saving ? "Adding..." : "Add Client"}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={saving}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
