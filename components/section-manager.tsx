"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { usePageSections, type PageSection } from "@/hooks/use-page-sections"
import { GripVertical, Eye, EyeOff, Settings } from "lucide-react"

export function SectionManager() {
  const { content, loading, toggleSection, reorderSections } = usePageSections()
  const [draggedSection, setDraggedSection] = useState<string | null>(null)
  const [dragOverSection, setDragOverSection] = useState<string | null>(null)

  // Fallback content if Firebase is not available
  const fallbackSections = [
    { id: "hero", name: "Hero Section", title: "Hero Section", enabled: true, order: 1 },
    { id: "about", name: "About Us", title: "About Us", enabled: true, order: 2 },
    { id: "services", name: "Services", title: "Services", enabled: true, order: 3 },
    { id: "clients", name: "Clients", title: "Our Clients", enabled: true, order: 4 },
    { id: "testimonials", name: "Testimonials", title: "Testimonials", enabled: true, order: 5 },
    { id: "contact", name: "Contact", title: "Contact", enabled: true, order: 6 },
  ]

  const sections = content?.sections || fallbackSections

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedSection(sectionId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverSection(sectionId)
  }

  const handleDragLeave = () => {
    setDragOverSection(null)
  }

  const handleDrop = async (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault()
    
    if (!draggedSection || draggedSection === targetSectionId) {
      setDraggedSection(null)
      setDragOverSection(null)
      return
    }

    const currentSections = content?.sections || fallbackSections
    const draggedIndex = currentSections.findIndex(s => s.id === draggedSection)
    const targetIndex = currentSections.findIndex(s => s.id === targetSectionId)

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedSection(null)
      setDragOverSection(null)
      return
    }

    const newSections = [...currentSections]
    const [draggedSectionData] = newSections.splice(draggedIndex, 1)
    newSections.splice(targetIndex, 0, draggedSectionData)

    if (content) {
      await reorderSections(newSections)
    } else {
      console.log("Firebase not available - reorder would work in production")
    }
    setDraggedSection(null)
    setDragOverSection(null)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Page Sections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Page Sections Management
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Drag and drop sections to reorder them on the page. Toggle visibility to show/hide sections.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sections
            ?.sort((a, b) => a.order - b.order)
            ?.map((section) => (
              <div
                key={section.id}
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onDragOver={(e) => handleDragOver(e, section.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, section.id)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                  draggedSection === section.id ? 'opacity-50' : ''
                } ${
                  dragOverSection === section.id ? 'border-secondary ring-2 ring-secondary/20' : 'border-border'
                } cursor-move hover:bg-muted/50`}
              >
                <div className="flex-shrink-0">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{section.name}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Order: {section.order}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{section.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {section.enabled ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={section.enabled}
                      onCheckedChange={() => {
                        if (content) {
                          toggleSection(section.id)
                        } else {
                          console.log("Firebase not available - toggle would work in production")
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>

      </CardContent>
    </Card>
  )
}
