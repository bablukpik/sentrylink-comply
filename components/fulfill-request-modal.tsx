"use client"

import { useState } from "react"
import { Modal } from "@/components/modal"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mockEvidence, type RequestItem } from "@/lib/mock-data"
import { FileText, Plus, Check } from "lucide-react"

interface FulfillRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: RequestItem | null
  onFulfill: (requestId: string, evidenceId: string | null, isNewEvidence: boolean) => void
}

export function FulfillRequestModal({ open, onOpenChange, request, onFulfill }: FulfillRequestModalProps) {
  const [mode, setMode] = useState<"existing" | "new">("existing")
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>("")
  const [newEvidenceName, setNewEvidenceName] = useState("")
  const [newEvidenceNotes, setNewEvidenceNotes] = useState("")

  // Filter evidence that matches the request doc type
  const matchingEvidence = request ? mockEvidence.filter((e) => e.docType === request.docType) : []

  const handleFulfill = () => {
    if (!request) return

    if (mode === "existing" && selectedEvidenceId) {
      onFulfill(request.id, selectedEvidenceId, false)
    } else if (mode === "new" && newEvidenceName) {
      onFulfill(request.id, null, true)
    }

    // Reset and close
    setMode("existing")
    setSelectedEvidenceId("")
    setNewEvidenceName("")
    setNewEvidenceNotes("")
    onOpenChange(false)
  }

  const handleClose = () => {
    setMode("existing")
    setSelectedEvidenceId("")
    setNewEvidenceName("")
    setNewEvidenceNotes("")
    onOpenChange(false)
  }

  const canFulfill =
    (mode === "existing" && selectedEvidenceId) || (mode === "new" && newEvidenceName.trim().length > 0)

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Fulfill Request"
      description={
        request ? `Provide ${request.docType} evidence for ${request.buyerName}` : "Select evidence to fulfill request"
      }
      className="sm:max-w-[600px]"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleFulfill}
            disabled={!canFulfill}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark as Fulfilled
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Mode Selection */}
        <RadioGroup value={mode} onValueChange={(v) => setMode(v as "existing" | "new")} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="existing" id="existing" />
            <Label htmlFor="existing" className="cursor-pointer">
              Use existing evidence
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new" />
            <Label htmlFor="new" className="cursor-pointer">
              Create new evidence
            </Label>
          </div>
        </RadioGroup>

        {/* Existing Evidence Selection */}
        {mode === "existing" && (
          <div className="space-y-3">
            <Label className="text-muted-foreground text-sm">Select from available {request?.docType} documents:</Label>
            {matchingEvidence.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground text-sm">No matching evidence found in vault</p>
                <Button variant="link" onClick={() => setMode("new")} className="text-primary mt-2">
                  Create new evidence instead
                </Button>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {matchingEvidence.map((evidence) => (
                  <div
                    key={evidence.id}
                    onClick={() => setSelectedEvidenceId(evidence.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedEvidenceId === evidence.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedEvidenceId === evidence.id ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}
                    >
                      {selectedEvidenceId === evidence.id && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                    </div>
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{evidence.name}</p>
                      <p className="text-xs text-muted-foreground">
                        v{evidence.versions.length} • Updated{" "}
                        {new Date(evidence.lastUpdated).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* New Evidence Form */}
        {mode === "new" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Document Name *</Label>
              <Input
                id="name"
                placeholder={`New ${request?.docType} document...`}
                value={newEvidenceName}
                onChange={(e) => setNewEvidenceName(e.target.value)}
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any relevant notes..."
                value={newEvidenceNotes}
                onChange={(e) => setNewEvidenceNotes(e.target.value)}
                className="bg-input border-border min-h-[80px]"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Plus className="w-3.5 h-3.5" />
              <span>This will create a new evidence item in your vault</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
