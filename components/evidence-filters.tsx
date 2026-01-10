"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { docTypes } from "@/lib/mock-data"

export function EvidenceFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const docType = searchParams.get("docType") || "all"
  const status = searchParams.get("status") || "all"
  const expiry = searchParams.get("expiry") || "all"
  const search = searchParams.get("search") || ""

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all" || value === "") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const clearFilters = () => {
    router.push("/", { scroll: false })
  }

  const hasFilters = docType !== "all" || status !== "all" || expiry !== "all" || search !== ""

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          value={search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-9 bg-input border-border"
        />
      </div>

      <Select value={docType} onValueChange={(value) => updateFilter("docType", value)}>
        <SelectTrigger className="w-[160px] bg-input border-border">
          <SelectValue placeholder="Doc Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {docTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={(value) => updateFilter("status", value)}>
        <SelectTrigger className="w-[160px] bg-input border-border">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Valid">Valid</SelectItem>
          <SelectItem value="Expired">Expired</SelectItem>
          <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
          <SelectItem value="Pending Review">Pending Review</SelectItem>
          <SelectItem value="Draft">Draft</SelectItem>
        </SelectContent>
      </Select>

      <Select value={expiry} onValueChange={(value) => updateFilter("expiry", value)}>
        <SelectTrigger className="w-[160px] bg-input border-border">
          <SelectValue placeholder="Expiry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
          <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Clear filters</span>
        </Button>
      )}
    </div>
  )
}
