"use client"

import { RichTextEditor } from "./rich-text-editor"

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
  // Use RichTextEditor for ALL content (both single-line and multiline)
  return (
    <RichTextEditor
      value={value}
      onSave={onSave}
      placeholder={placeholder}
      className={className}
      multiline={type === "textarea" || multiline}
    />
  )
}
