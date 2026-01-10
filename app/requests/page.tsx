"use client"

import { useState, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { RequestList } from "@/components/request-list"
import { FulfillRequestModal } from "@/components/fulfill-request-modal"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockRequests, type RequestItem, type RequestStatus } from "@/lib/mock-data"

export default function BuyerRequestsPage() {
  const [requests, setRequests] = useState(mockRequests)
  const [fulfillModalOpen, setFulfillModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | RequestStatus>("all")

  const filteredRequests = useMemo(() => {
    if (activeTab === "all") return requests
    return requests.filter((r) => r.status === activeTab)
  }, [requests, activeTab])

  const statusCounts = useMemo(() => {
    return {
      all: requests.length,
      Pending: requests.filter((r) => r.status === "Pending").length,
      "In Progress": requests.filter((r) => r.status === "In Progress").length,
      Overdue: requests.filter((r) => r.status === "Overdue").length,
      Fulfilled: requests.filter((r) => r.status === "Fulfilled").length,
    }
  }, [requests])

  const handleFulfill = (request: RequestItem) => {
    setSelectedRequest(request)
    setFulfillModalOpen(true)
  }

  const handleFulfillSubmit = (requestId: string, evidenceId: string | null, isNewEvidence: boolean) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: "Fulfilled" as RequestStatus,
              fulfilledWith: evidenceId || undefined,
            }
          : r,
      ),
    )

    const action = isNewEvidence ? "Created new evidence and fulfilled" : "Fulfilled with existing evidence"
    alert(`${action} request successfully!`)
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Buyer Requests</h1>
            <p className="text-muted-foreground mt-1">Manage and fulfill buyer document requests</p>
          </div>
        </header>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="all" className="data-[state=active]:bg-background">
              All ({statusCounts.all})
            </TabsTrigger>
            <TabsTrigger value="Pending" className="data-[state=active]:bg-background">
              Pending ({statusCounts.Pending})
            </TabsTrigger>
            <TabsTrigger value="In Progress" className="data-[state=active]:bg-background">
              In Progress ({statusCounts["In Progress"]})
            </TabsTrigger>
            <TabsTrigger value="Overdue" className="data-[state=active]:bg-background">
              Overdue ({statusCounts.Overdue})
            </TabsTrigger>
            <TabsTrigger value="Fulfilled" className="data-[state=active]:bg-background">
              Fulfilled ({statusCounts.Fulfilled})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Request List */}
        <RequestList requests={filteredRequests} onFulfill={handleFulfill} />

        {/* Fulfill Modal */}
        <FulfillRequestModal
          open={fulfillModalOpen}
          onOpenChange={setFulfillModalOpen}
          request={selectedRequest}
          onFulfill={handleFulfillSubmit}
        />
      </main>
    </div>
  )
}
