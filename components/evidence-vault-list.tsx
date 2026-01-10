"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FileText, MoreHorizontal, Eye, Upload, Package } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { StatusChip } from "@/components/status-chip"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockEvidence, type Evidence } from "@/lib/mock-data"

interface EvidenceVaultListProps {
  onUploadVersion: (evidence: Evidence) => void
}

export function EvidenceVaultList({ onUploadVersion }: EvidenceVaultListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Filter evidence based on URL params
  const filteredEvidence = useMemo(() => {
    let result = [...mockEvidence]

    const docType = searchParams.get("docType")
    const status = searchParams.get("status")
    const expiry = searchParams.get("expiry")
    const search = searchParams.get("search")?.toLowerCase()

    if (docType && docType !== "all") {
      result = result.filter((e) => e.docType === docType)
    }

    if (status && status !== "all") {
      result = result.filter((e) => e.status === status)
    }

    if (expiry === "expired") {
      result = result.filter((e) => e.status === "Expired")
    } else if (expiry === "expiring-soon") {
      result = result.filter((e) => e.status === "Expiring Soon")
    }

    if (search) {
      result = result.filter((e) => e.name.toLowerCase().includes(search) || e.docType.toLowerCase().includes(search))
    }

    return result
  }, [searchParams])

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—"
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const columns = [
    {
      key: "name",
      header: "Doc Name",
      render: (item: Evidence) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="font-medium text-foreground">{item.name}</span>
        </div>
      ),
    },
    {
      key: "docType",
      header: "Doc Type",
      render: (item: Evidence) => <span className="text-muted-foreground">{item.docType}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Evidence) => <StatusChip status={item.status} />,
    },
    {
      key: "expiry",
      header: "Expiry",
      render: (item: Evidence) => <span className="text-muted-foreground">{formatDate(item.expiryDate)}</span>,
    },
    {
      key: "versions",
      header: "Versions",
      render: (item: Evidence) => <span className="text-muted-foreground">v{item.versions.length}</span>,
      className: "text-center",
    },
    {
      key: "lastUpdated",
      header: "Last Updated",
      render: (item: Evidence) => <span className="text-muted-foreground">{formatDate(item.lastUpdated)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Evidence) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/evidence/${item.id}`)
            }}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/evidence/${item.id}`)}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUploadVersion(item)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Version
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      className: "w-28",
    },
  ]

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <span className="text-sm font-medium text-primary">
            {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected
          </span>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Package className="w-4 h-4 mr-2" />
            Add to Pack
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
            Clear selection
          </Button>
        </div>
      )}

      <DataTable
        data={filteredEvidence}
        columns={columns}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        getItemId={(item) => item.id}
        onRowClick={(item) => router.push(`/evidence/${item.id}`)}
      />
    </div>
  )
}
