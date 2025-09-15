"use client"

import { useState, useRef } from "react"
import { useClientsContent } from "@/hooks/use-clients-content"
import { useAuth } from "@/hooks/use-auth"
import { getTranslation, type Locale } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { uploadImage, deleteImage, validateImageFile } from "@/lib/image-upload"
import { ClientModal } from "@/components/client-modal"
import { Plus, Trash2, Upload, X, Edit2 } from "lucide-react"

interface ClientsSectionProps {
  locale: string
}

interface Client {
  id: string
  name: string
  logoUrl: string
  link: string
}

export function ClientsSection({ locale }: ClientsSectionProps) {
  const { content, updateContent } = useClientsContent()
  const { isLoggedIn } = useAuth()
  const t = (key: string) => getTranslation(key, locale as Locale)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingLogo, setUploadingLogo] = useState<string | null>(null)
  const [editingClient, setEditingClient] = useState<string | null>(null)
  const [clientName, setClientName] = useState("")

  const addClient = async (clientData: Omit<Client, 'id'>) => {
    const newClient = {
      id: Date.now().toString(),
      ...clientData,
    }
    const updatedClients = [...(content?.clients || []), newClient]
    await updateContent({ clients: updatedClients })
  }

  const removeClient = (clientId: string) => {
    const updatedClients = content?.clients?.filter(client => client.id !== clientId) || []
    updateContent({ clients: updatedClients })
  }

  const updateClientName = (clientId: string, newName: string) => {
    const updatedClients = content?.clients?.map(client => 
      client.id === clientId ? { ...client, name: newName } : client
    ) || []
    updateContent({ clients: updatedClients })
  }

  const handleLogoUpload = async (clientId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!validateImageFile(file)) {
      return
    }

    setUploadingLogo(clientId)
    try {
      const { url, path } = await uploadImage(file, "client-logos")
      const updatedClients = content?.clients?.map(client => 
        client.id === clientId ? { ...client, logoUrl: url } : client
      ) || []
      await updateContent({ clients: updatedClients })
    } catch (error) {
      console.error("Failed to upload logo:", error)
    } finally {
      setUploadingLogo(null)
    }
  }

  return (
    <section id="clients" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {t("clients.title")}
          </h2>
          {isLoggedIn && (
            <ClientModal onSave={addClient} trigger={
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            } />
          )}
        </div>

        {/* Client Logos */}
        {content?.clients && content.clients.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {content.clients.map((client: Client) => (
              <div key={client.id} className="flex flex-col items-center justify-center relative group">
                <div className="h-16 w-full flex items-center justify-center mb-2">
                  {client.logoUrl ? (
                    client.link ? (
                      <a 
                        href={client.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={client.logoUrl}
                          alt={client.name}
                          className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                        />
                      </a>
                    ) : (
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    )
                  ) : (
                    <div className="h-12 w-full bg-muted rounded flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">No Logo</span>
                    </div>
                  )}
                </div>
                
                {/* Client Name */}
                {isLoggedIn ? (
                  <div className="w-full">
                    {editingClient === client.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          onBlur={() => {
                            updateClientName(client.id, clientName)
                            setEditingClient(null)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updateClientName(client.id, clientName)
                              setEditingClient(null)
                            }
                          }}
                          className="h-6 text-xs text-center"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <span 
                        className="text-sm text-muted-foreground text-center cursor-pointer hover:text-foreground"
                        onClick={() => {
                          setClientName(client.name)
                          setEditingClient(client.id)
                        }}
                      >
                        {client.name}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground text-center">{client.name}</span>
                )}

                {/* Admin Controls */}
                {isLoggedIn && (
                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLogoUpload(client.id, e)}
                      className="hidden"
                      id={`logo-upload-${client.id}`}
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => document.getElementById(`logo-upload-${client.id}`)?.click()}
                      disabled={uploadingLogo === client.id}
                      className="h-6 w-6 p-0"
                    >
                      <Upload className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeClient(client.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              {/* Placeholder for client logos */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center justify-center h-16 bg-muted rounded-lg">
                  <span className="text-muted-foreground text-sm font-medium">
                    Logo {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
