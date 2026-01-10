"use client"

import { StatusChip } from "@/components/status-chip"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockEvidence, type RequestItem } from "@/lib/mock-data"
import { Calendar, Building2, FileText, CheckCircle2 } from "lucide-react"

interface RequestListProps {
  requests: RequestItem[]
  onFulfill: (request: RequestItem) => void
}

export function RequestList({ requests, onFulfill }: RequestListProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntilDue = (dateStr: string) => {
    const due = new Date(dateStr)
    const today = new Date()
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const getFulfilledEvidence = (evidenceId: string | undefined) => {
    if (!evidenceId) return null
    return mockEvidence.find((e) => e.id === evidenceId)
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-border rounded-lg">
        <p className="text-muted-foreground">No requests found</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => {
        const daysUntilDue = getDaysUntilDue(request.dueDate)
        const fulfilledEvidence = getFulfilledEvidence(request.fulfilledWith)

        return (
          <Card key={request.id} className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                {/* Left: Request Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-foreground">{request.docType}</h3>
                      <StatusChip status={request.status} />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        {request.buyerName}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Due {formatDate(request.dueDate)}
                        {daysUntilDue < 0 ? (
                          <span className="text-red-400 ml-1">({Math.abs(daysUntilDue)} days overdue)</span>
                        ) : daysUntilDue <= 7 ? (
                          <span className="text-amber-400 ml-1">({daysUntilDue} days left)</span>
                        ) : null}
                      </span>
                    </div>

                    {request.notes && <p className="text-sm text-muted-foreground">{request.notes}</p>}

                    {/* Show fulfilled evidence */}
                    {request.status === "Fulfilled" && fulfilledEvidence && (
                      <div className="mt-3 flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-muted-foreground">Fulfilled with:</span>
                        <span className="text-foreground font-medium">{fulfilledEvidence.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Action */}
                <div className="shrink-0">
                  {request.status !== "Fulfilled" ? (
                    <Button
                      onClick={() => onFulfill(request)}
                      variant={request.status === "Overdue" ? "destructive" : "default"}
                      size="sm"
                      className={
                        request.status !== "Overdue" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                      }
                    >
                      Fulfill
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      Completed
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
