"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { Modal } from "@/components/modal"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Upload, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Evidence } from "@/lib/mock-data"

interface UploadVersionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  evidence: Evidence | null
  onUpload: (data: { notes: string; expiryDate: string; file: File | null }) => void
}

export function UploadVersionModal({ open, onOpenChange, evidence, onUpload }: UploadVersionModalProps) {
  const [notes, setNotes] = useState("")
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!notes.trim()) {
      setError("Notes are required")
      return
    }
    onUpload({
      notes,
      expiryDate: expiryDate ? format(expiryDate, "yyyy-MM-dd") : "",
      file
    })
    // Reset form
    setNotes("")
    setExpiryDate(undefined)
    setFile(null)
    setError("")
    setCalendarOpen(false)
    onOpenChange(false)
  }

  const handleClose = () => {
    setNotes("")
    setExpiryDate(undefined)
    setFile(null)
    setError("")
    setCalendarOpen(false)
    onOpenChange(false)
  }

  const handleDateConfirm = () => {
    setCalendarOpen(false)
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
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-input border-border",
                  !expiryDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {expiryDate ? format(expiryDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={expiryDate}
                onSelect={setExpiryDate}
                initialFocus
              />
              <div className="p-3 border-t border-border">
                <Button
                  type="button"
                  onClick={handleDateConfirm}
                  className="w-full"
                  size="sm"
                >
                  OK
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
