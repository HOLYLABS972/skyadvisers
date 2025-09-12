"use client"

import { useState, useEffect } from "react"

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ContactDetailModal } from "@/components/contact-detail-modal"
import { Mail, Search, Filter, Calendar, User, MessageSquare } from "lucide-react"

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

export default function ContactFormsPage() {
  const [contacts, setContacts] = useState<ContactForm[]>([])
  const [filteredContacts, setFilteredContacts] = useState<ContactForm[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedContact, setSelectedContact] = useState<ContactForm | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    filterContacts()
  }, [contacts, searchTerm, statusFilter])

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contacts")
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts || [])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contact forms",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterContacts = () => {
    let filtered = contacts

    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.message.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter)
    }

    setFilteredContacts(filtered)
  }

  const updateContactStatus = async (id: string, status: "new" | "read" | "responded") => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setContacts(contacts.map((contact) => (contact.id === id ? { ...contact, status } : contact)))
        toast({
          title: "Success",
          description: "Contact status updated successfully",
        })
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact status",
        variant: "destructive",
      })
    }
  }

  const handleContactClick = async (contact: ContactForm) => {
    setSelectedContact(contact)
    if (contact.status === "new") {
      await updateContactStatus(contact.id, "read")
    }
  }

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

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Contact Forms</h1>
          </div>
          <div className="text-center py-12">Loading...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Forms</h1>
          <p className="text-muted-foreground">Manage and respond to customer inquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{contacts.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{contacts.filter((c) => c.status === "new").length}</p>
                  <p className="text-xs text-muted-foreground">New</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{contacts.filter((c) => c.status === "read").length}</p>
                  <p className="text-xs text-muted-foreground">Read</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{contacts.filter((c) => c.status === "responded").length}</p>
                  <p className="text-xs text-muted-foreground">Responded</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contact List */}
        {filteredContacts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No contact forms found</h3>
              <p className="text-muted-foreground">
                {contacts.length === 0 ? "No contact forms have been submitted yet" : "No contacts match your filters"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${contact.status === "new" ? "border-l-4 border-l-red-500" : ""}`}
                onClick={() => handleContactClick(contact)}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-foreground">{contact.name}</h3>
                        <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                        <Badge variant="outline">{contact.locale.toUpperCase()}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                      <p className="text-sm text-foreground line-clamp-2">{contact.message}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(contact.submittedAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {contact.status !== "responded" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateContactStatus(contact.id, "responded")
                          }}
                        >
                          Mark Responded
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Contact Detail Modal */}
        {selectedContact && (
          <ContactDetailModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
            onStatusUpdate={updateContactStatus}
          />
        )}
      </div>
    </AdminLayout>
  )
}
