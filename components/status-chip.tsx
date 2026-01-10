import { cn } from "@/lib/utils"
import type { DocStatus, RequestStatus } from "@/lib/mock-data"

interface StatusChipProps {
  status: DocStatus | RequestStatus
  className?: string
}

const statusStyles: Record<DocStatus | RequestStatus, string> = {
  Valid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Expired: "bg-red-500/15 text-red-400 border-red-500/30",
  "Expiring Soon": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Pending Review": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Draft: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  Pending: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Fulfilled: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Overdue: "bg-red-500/15 text-red-400 border-red-500/30",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/30",
}

export function StatusChip({ status, className }: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status],
        className,
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full mr-1.5",
          status === "Valid" || status === "Fulfilled"
            ? "bg-emerald-400"
            : status === "Expired" || status === "Overdue"
              ? "bg-red-400"
              : status === "Expiring Soon" || status === "In Progress"
                ? "bg-amber-400"
                : status === "Pending Review" || status === "Pending"
                  ? "bg-blue-400"
                  : "bg-slate-400",
        )}
      />
      {status}
    </span>
  )
}
