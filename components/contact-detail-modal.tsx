"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Calendar, Globe, MessageSquare, X } from "lucide-react"

interface ContactForm {
  id: string
  name: string
  email: string
  message: string
  locale: string
  submittedAt: string
  clientTimestamp: string
  status: "new" | "read" | "responded"
  source: string
}

interface ContactDetailModalProps {
  contact: ContactForm
  onClose: () => void
  onStatusUpdate: (id: string, status: "new" | "read" | "responded") => void
}

export function ContactDetailModal({ contact, onClose, onStatusUpdate }: ContactDetailModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "read":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "responded":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleEmailReply = () => {
    const subject = `Re: Your inquiry to Skyadvisers`
    const body = `Dear ${contact.name},\n\nThank you for contacting Skyadvisers. We have received your message:\n\n"${contact.message}"\n\nWe will get back to you shortly with a detailed response.\n\nBest regards,\nSkyadvisers Team`

    window.open(`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Contact Details</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Contact Information
                <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{contact.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                    <p className="font-medium">{new Date(contact.submittedAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-medium">{contact.locale.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="whitespace-pre-wrap text-foreground">{contact.message}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="space-x-2">
              {contact.status !== "read" && (
                <Button variant="outline" onClick={() => onStatusUpdate(contact.id, "read")}>
                  Mark as Read
                </Button>
              )}
              {contact.status !== "responded" && (
                <Button variant="outline" onClick={() => onStatusUpdate(contact.id, "responded")}>
                  Mark as Responded
                </Button>
              )}
            </div>

            <div className="space-x-2">
              <Button onClick={handleEmailReply} className="bg-secondary hover:bg-secondary/90">
                <Mail className="mr-2 h-4 w-4" />
                Reply via Email
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
