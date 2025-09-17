"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Edit2, 
  Check, 
  X, 
  Bold, 
  Italic, 
  Link, 
  List, 
  ListOrdered,
  Smile,
  Type
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RichTextEditorProps {
  value: string
  onSave: (newValue: string) => Promise<void>
  placeholder?: string
  className?: string
  multiline?: boolean
}

// Emoji data - common emojis for quick access
const EMOJIS = [
  "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
  "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙",
  "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔",
  "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥",
  "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
  "👆", "🖕", "👇", "☝️", "👋", "🤚", "🖐️", "✋", "🖖", "👏",
  "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💪", "🦾", "🦿", "🦵",
  "💯", "🔥", "⭐", "🌟", "💫", "✨", "🎉", "🎊", "🎈", "🎁",
  "💝", "💖", "💕", "💗", "💓", "💞", "💘", "💟", "💌", "💋",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔"
]

export function RichTextEditor({ 
  value, 
  onSave, 
  placeholder, 
  className = "",
  multiline = false 
}: RichTextEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [saving, setSaving] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()

  const handleEdit = () => {
    setEditValue(value)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
    setShowEmojiPicker(false)
    setShowLinkDialog(false)
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

  const insertText = (text: string) => {
    if (!textareaRef.current) {
      console.log('No textarea ref')
      return
    }
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const before = editValue.substring(0, start)
    const after = editValue.substring(end)
    
    const newValue = before + text + after
    console.log('Inserting text:', text, 'at position:', start, 'new value:', newValue)
    setEditValue(newValue)
    
    // Use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newCursorPos = start + text.length
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    })
  }

  const wrapText = (prefix: string, suffix: string = prefix) => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editValue.substring(start, end)
    
    if (selectedText) {
      const wrappedText = prefix + selectedText + suffix
      const before = editValue.substring(0, start)
      const after = editValue.substring(end)
      
      const newValue = before + wrappedText + after
      setEditValue(newValue)
      
      // Restore selection with requestAnimationFrame
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          const newStart = start + prefix.length
          const newEnd = newStart + selectedText.length
          textareaRef.current.setSelectionRange(newStart, newEnd)
        }
      })
    } else {
      insertText(prefix + suffix)
    }
  }

  const addLink = () => {
    if (!linkUrl.trim()) return
    
    const linkMarkdown = `[${linkText || linkUrl}](${linkUrl})`
    insertText(linkMarkdown)
    setShowLinkDialog(false)
    setLinkUrl("")
    setLinkText("")
  }

  const addList = (ordered: boolean = false) => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editValue.substring(start, end)
    
    if (selectedText) {
      const lines = selectedText.split('\n')
      const listItems = lines.map(line => 
        line.trim() ? `${ordered ? '1.' : '-'} ${line.trim()}` : line
      )
      const listText = listItems.join('\n')
      
      const before = editValue.substring(0, start)
      const after = editValue.substring(end)
      
      setEditValue(before + listText + after)
    } else {
      insertText(ordered ? '1. ' : '- ')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Enter key for new lines
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      insertText('\n')
    }
    
    // Handle Ctrl+B for bold
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault()
      wrapText('**')
    }
    
    // Handle Ctrl+I for italic
    if (e.ctrlKey && e.key === 'i') {
      e.preventDefault()
      wrapText('*')
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text/plain')
    insertText(pastedText)
  }

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEmojiPicker) {
        const target = event.target as HTMLElement
        if (!target.closest('.emoji-picker-container')) {
          setShowEmojiPicker(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmojiPicker])

  if (isEditing) {
    return (
      <div className={`relative group ${className}`}>
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 mb-2 p-2 bg-muted/50 rounded-md border">
          <Button
            size="sm"
            variant="outline"
            onClick={() => wrapText('**')}
            className="h-8 text-foreground hover:text-foreground"
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => wrapText('*')}
            className="h-8 text-foreground hover:text-foreground"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowLinkDialog(true)}
            className="h-8 text-foreground hover:text-foreground"
            title="Add Link"
          >
            <Link className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => addList(false)}
            className="h-8 text-foreground hover:text-foreground"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => addList(true)}
            className="h-8 text-foreground hover:text-foreground"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          
          <div className="relative emoji-picker-container">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-foreground hover:text-foreground"
              title="Add Emoji"
              onClick={() => {
                console.log('Emoji button clicked, current state:', showEmojiPicker)
                setShowEmojiPicker(!showEmojiPicker)
              }}
            >
              <Smile className="h-4 w-4" />
            </Button>
            
            {showEmojiPicker && (
              <div className="absolute top-full left-0 mt-2 w-80 p-4 bg-background border rounded-md shadow-lg z-[9999]">
                <div className="text-sm font-medium mb-2">Select an emoji:</div>
                <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
                  {EMOJIS.map((emoji, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-lg hover:bg-muted text-foreground"
                    onClick={() => {
                      console.log('Inserting emoji:', emoji)
                      insertText(emoji)
                      setShowEmojiPicker(false)
                    }}
                  >
                    {emoji}
                  </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Text Editor */}
        <Textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          className="min-h-[120px] resize-none"
          autoFocus
        />

        {/* Link Dialog */}
        {showLinkDialog && (
          <div className="absolute top-0 left-0 right-0 bg-background border rounded-md p-4 shadow-lg z-10">
            <div className="space-y-3">
              <div>
                <Label htmlFor="link-text">Link Text</Label>
                <Input
                  id="link-text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link text"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={addLink}>
                  Add Link
                </Button>
                <Button size="sm" variant="outline" className="text-foreground hover:text-foreground" onClick={() => setShowLinkDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
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
        {value ? (
          <div className="whitespace-pre-wrap">{value}</div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </div>
      <button
        onClick={handleEdit}
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 bg-background border border-border shadow-sm hover:bg-muted text-foreground rounded-md flex items-center justify-center"
        type="button"
        title="Edit content"
      >
        <Edit2 className="h-3 w-3" />
      </button>
    </div>
  )
}
