"use client"

import { useState, Suspense } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { EvidenceFilters } from "@/components/evidence-filters"
import { EvidenceVaultList } from "@/components/evidence-vault-list"
import { UploadVersionModal } from "@/components/upload-version-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Evidence } from "@/lib/mock-data"

function EvidenceVaultContent() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null)

  const handleUploadVersion = (evidence: Evidence) => {
    setSelectedEvidence(evidence)
    setUploadModalOpen(true)
  }

  const handleUpload = (data: { notes: string; expiryDate: string; file: File | null }) => {
    // Mock upload - in real app, this would call an API
    console.log("Uploading version:", data)
    alert(`New version uploaded!\nNotes: ${data.notes}\nExpiry: ${data.expiryDate || "Not set"}`)
  }

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Evidence Vault</h1>
          <p className="text-muted-foreground mt-1">Manage your compliance documents and certificates</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Evidence
        </Button>
      </header>

      <div className="mb-6">
        <EvidenceFilters />
      </div>

      <EvidenceVaultList onUploadVersion={handleUploadVersion} />

      <UploadVersionModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        evidence={selectedEvidence}
        onUpload={handleUpload}
      />
    </>
  )
}

export default function EvidenceVaultPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-8">
        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
          <EvidenceVaultContent />
        </Suspense>
      </main>
    </div>
  )
}
