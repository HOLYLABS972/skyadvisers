"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface InlineEditorProps {
  value: string
  onSave: (newValue: string) => Promise<void>
  type?: "input" | "textarea"
  placeholder?: string
  className?: string
  multiline?: boolean
}

export function InlineEditor({ 
  value, 
  onSave, 
  type = "input", 
  placeholder, 
  className = "",
  multiline = false 
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const handleEdit = () => {
    setEditValue(value)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (editValue.trim() === value.trim()) {
      setIsEditing(false)
      return
    }

    setSaving(true)
    try {
      await onSave(editValue.trim())
      setIsEditing(false)
      toast({
        title: "Success",
        description: "Content updated successfully",
      })
    } catch (error) {
      console.error("Failed to save:", error)
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (isEditing) {
    return (
      <div className={`relative group ${className}`}>
        {type === "textarea" || multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            className="min-h-[100px] resize-none"
            autoFocus
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
        )}
        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="h-8"
          >
            <Check className="h-4 w-4 mr-1" />
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={saving}
            className="h-8 text-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="group-hover:bg-muted/50 transition-colors rounded-md p-1 -m-1">
        {value || placeholder}
      </div>
      <button
        onClick={handleEdit}
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 bg-background border border-border shadow-sm hover:bg-muted text-foreground rounded-md flex items-center justify-center"
        type="button"
      >
        <Edit2 className="h-3 w-3" />
      </button>
    </div>
  )
}
