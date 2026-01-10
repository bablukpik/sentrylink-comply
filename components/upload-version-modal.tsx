"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "@/components/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import type { Evidence } from "@/lib/mock-data"

interface UploadVersionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  evidence: Evidence | null
  onUpload: (data: { notes: string; expiryDate: string; file: File | null }) => void
}

export function UploadVersionModal({ open, onOpenChange, evidence, onUpload }: UploadVersionModalProps) {
  const [notes, setNotes] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!notes.trim()) {
      setError("Notes are required")
      return
    }
    onUpload({ notes, expiryDate, file })
    // Reset form
    setNotes("")
    setExpiryDate("")
    setFile(null)
    setError("")
    onOpenChange(false)
  }

  const handleClose = () => {
    setNotes("")
    setExpiryDate("")
    setFile(null)
    setError("")
    onOpenChange(false)
  }

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Upload New Version"
      description={evidence ? `Add a new version to "${evidence.name}"` : "Upload a new document version"}
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-primary text-primary-foreground">
            Upload Version
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">Notes *</Label>
          <Textarea
            id="notes"
            placeholder="Describe what changed in this version..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value)
              setError("")
            }}
            className="bg-input border-border min-h-[100px]"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date (Optional)</Label>
          <Input
            id="expiry"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="bg-input border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <input id="file" type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <label htmlFor="file" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              {file ? (
                <p className="text-sm text-foreground">{file.name}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              )}
            </label>
          </div>
        </div>
      </form>
    </Modal>
  )
}
