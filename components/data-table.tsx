"use client"

import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface Column<T> {
  key: string
  header: string
  render: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  selectable?: boolean
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  getItemId: (item: T) => string
}

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  getItemId,
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && data.every((item) => selectedIds.includes(getItemId(item)))
  const someSelected = selectedIds.length > 0 && !allSelected

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange?.([])
    } else {
      onSelectionChange?.(data.map((item) => getItemId(item)))
    }
  }

  const handleSelectItem = (item: T, e: React.MouseEvent) => {
    e.stopPropagation()
    const id = getItemId(item)
    if (selectedIds.includes(id)) {
      onSelectionChange?.(selectedIds.filter((i) => i !== id))
    } else {
      onSelectionChange?.([...selectedIds, id])
    }
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            {selectable && (
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                  className={cn(someSelected && "data-[state=checked]:bg-primary")}
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead key={column.key} className={cn("text-muted-foreground font-medium", column.className)}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center py-8 text-muted-foreground"
              >
                No items found
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={getItemId(item)}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedIds.includes(getItemId(item)) && "bg-primary/5",
                )}
              >
                {selectable && (
                  <TableCell className="w-12">
                    <Checkbox
                      checked={selectedIds.includes(getItemId(item))}
                      onClick={(e) => handleSelectItem(item, e)}
                      aria-label={`Select item`}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
