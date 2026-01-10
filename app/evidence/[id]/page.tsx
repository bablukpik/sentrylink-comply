"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { StatusChip } from "@/components/status-chip"
import { UploadVersionModal } from "@/components/upload-version-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockEvidence } from "@/lib/mock-data"
import { ArrowLeft, Upload, FileText, Calendar, User, HardDrive, FileDown, Clock, Tag } from "lucide-react"

export default function EvidenceDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const evidence = mockEvidence.find((e) => e.id === id)

  if (!evidence) {
    return (
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="text-center py-12">
            <h1 className="text-xl font-semibold text-foreground">Evidence not found</h1>
            <p className="text-muted-foreground mt-2">The requested document could not be found.</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Back to Vault
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Not set"
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleUpload = (data: { notes: string; expiryDate: string; file: File | null }) => {
    console.log("Uploading version:", data)
    alert(`New version uploaded!\nNotes: ${data.notes}\nExpiry: ${data.expiryDate || "Not set"}`)
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-8">
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Evidence Vault
          </Link>
        </div>

        {/* Header */}
        <header className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-foreground">{evidence.name}</h1>
                <StatusChip status={evidence.status} />
              </div>
              {evidence.description && <p className="text-muted-foreground mt-1">{evidence.description}</p>}
            </div>
          </div>
          <Button onClick={() => setUploadModalOpen(true)} className="bg-primary text-primary-foreground">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Version
          </Button>
        </header>

        {/* Metadata Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Document Type</p>
                  <p className="font-medium text-foreground">{evidence.docType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Expiry Date</p>
                  <p className="font-medium text-foreground">{formatDate(evidence.expiryDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-foreground">{formatDate(evidence.lastUpdated)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Versions</p>
                  <p className="font-medium text-foreground">{evidence.versions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Version History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Version History</CardTitle>
            <CardDescription>All versions of this document</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evidence.versions.map((version, index) => (
                <div
                  key={version.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                >
                  {/* Version indicator */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">v{version.version}</span>
                    </div>
                    {index < evidence.versions.length - 1 && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border" />
                    )}
                  </div>

                  {/* Version details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{version.fileName}</span>
                        {index === 0 && (
                          <span className="text-xs px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/30">
                            Latest
                          </span>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <FileDown className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{version.notes}</p>

                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(version.uploadedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {version.uploader}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5" />
                        {version.fileSize}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <UploadVersionModal
          open={uploadModalOpen}
          onOpenChange={setUploadModalOpen}
          evidence={evidence}
          onUpload={handleUpload}
        />
      </main>
    </div>
  )
}
