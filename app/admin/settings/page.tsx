"use client"

import { AdminLayout } from "@/components/admin-layout"
import { SectionManager } from "@/components/section-manager"
import { Settings } from "lucide-react"

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your website configuration and layout</p>
        </div>


        {/* Section Management */}
        <SectionManager />
      </div>
    </AdminLayout>
  )
}
