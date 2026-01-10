// Mock data for the Evidence Vault application

export type DocType = "Certificate" | "Audit Report" | "Policy" | "License" | "Insurance" | "Contract"
export type DocStatus = "Valid" | "Expired" | "Expiring Soon" | "Pending Review" | "Draft"
export type RequestStatus = "Pending" | "Fulfilled" | "Overdue" | "In Progress"

export interface EvidenceVersion {
  id: string
  version: number
  uploadedAt: string
  uploader: string
  notes: string
  fileSize: string
  fileName: string
}

export interface Evidence {
  id: string
  name: string
  docType: DocType
  status: DocStatus
  expiryDate: string | null
  versions: EvidenceVersion[]
  lastUpdated: string
  description?: string
}

export interface RequestItem {
  id: string
  docType: DocType
  dueDate: string
  status: RequestStatus
  buyerName: string
  fulfilledWith?: string
  notes?: string
}

export const mockEvidence: Evidence[] = [
  {
    id: "ev-001",
    name: "ISO 9001:2015 Certificate",
    docType: "Certificate",
    status: "Valid",
    expiryDate: "2027-03-15",
    lastUpdated: "2025-12-10",
    description: "Quality Management System certification for manufacturing operations",
    versions: [
      {
        id: "v3",
        version: 3,
        uploadedAt: "2025-12-10",
        uploader: "John Smith",
        notes: "Annual renewal approved",
        fileSize: "2.4 MB",
        fileName: "ISO_9001_2025.pdf",
      },
      {
        id: "v2",
        version: 2,
        uploadedAt: "2024-12-08",
        uploader: "Jane Doe",
        notes: "Updated scope",
        fileSize: "2.1 MB",
        fileName: "ISO_9001_2024.pdf",
      },
      {
        id: "v1",
        version: 1,
        uploadedAt: "2023-12-01",
        uploader: "John Smith",
        notes: "Initial certification",
        fileSize: "1.9 MB",
        fileName: "ISO_9001_2023.pdf",
      },
    ],
  },
  {
    id: "ev-002",
    name: "Factory Audit Report Q4 2025",
    docType: "Audit Report",
    status: "Valid",
    expiryDate: null,
    lastUpdated: "2025-11-28",
    description: "Quarterly audit report covering safety and compliance",
    versions: [
      {
        id: "v1",
        version: 1,
        uploadedAt: "2025-11-28",
        uploader: "External Auditor",
        notes: "Q4 audit completed with no major findings",
        fileSize: "5.8 MB",
        fileName: "Audit_Q4_2025.pdf",
      },
    ],
  },
  {
    id: "ev-003",
    name: "Environmental Policy Statement",
    docType: "Policy",
    status: "Expiring Soon",
    expiryDate: "2026-02-01",
    lastUpdated: "2025-01-15",
    description: "Corporate environmental policy and commitments",
    versions: [
      {
        id: "v2",
        version: 2,
        uploadedAt: "2025-01-15",
        uploader: "Sarah Wilson",
        notes: "Updated emissions targets",
        fileSize: "890 KB",
        fileName: "Env_Policy_v2.pdf",
      },
      {
        id: "v1",
        version: 1,
        uploadedAt: "2024-01-10",
        uploader: "Sarah Wilson",
        notes: "Initial policy document",
        fileSize: "750 KB",
        fileName: "Env_Policy_v1.pdf",
      },
    ],
  },
  {
    id: "ev-004",
    name: "Business Operating License",
    docType: "License",
    status: "Expired",
    expiryDate: "2025-12-31",
    lastUpdated: "2024-12-20",
    description: "State business operating license",
    versions: [
      {
        id: "v1",
        version: 1,
        uploadedAt: "2024-12-20",
        uploader: "Admin Team",
        notes: "License renewal pending",
        fileSize: "1.2 MB",
        fileName: "Business_License_2024.pdf",
      },
    ],
  },
  {
    id: "ev-005",
    name: "General Liability Insurance",
    docType: "Insurance",
    status: "Valid",
    expiryDate: "2026-06-30",
    lastUpdated: "2025-07-01",
    description: "Commercial general liability insurance certificate",
    versions: [
      {
        id: "v2",
        version: 2,
        uploadedAt: "2025-07-01",
        uploader: "Finance Dept",
        notes: "Coverage increased to $5M",
        fileSize: "450 KB",
        fileName: "Liability_Insurance_2025.pdf",
      },
      {
        id: "v1",
        version: 1,
        uploadedAt: "2024-07-01",
        uploader: "Finance Dept",
        notes: "Annual renewal",
        fileSize: "420 KB",
        fileName: "Liability_Insurance_2024.pdf",
      },
    ],
  },
  {
    id: "ev-006",
    name: "Supplier Agreement - Acme Corp",
    docType: "Contract",
    status: "Pending Review",
    expiryDate: "2027-01-01",
    lastUpdated: "2025-12-05",
    description: "Master supplier agreement with Acme Corporation",
    versions: [
      {
        id: "v3",
        version: 3,
        uploadedAt: "2025-12-05",
        uploader: "Legal Team",
        notes: "Amendment for pricing update",
        fileSize: "3.2 MB",
        fileName: "Acme_Agreement_v3.pdf",
      },
      {
        id: "v2",
        version: 2,
        uploadedAt: "2025-06-01",
        uploader: "Legal Team",
        notes: "Extended terms",
        fileSize: "3.0 MB",
        fileName: "Acme_Agreement_v2.pdf",
      },
      {
        id: "v1",
        version: 1,
        uploadedAt: "2024-01-01",
        uploader: "Legal Team",
        notes: "Initial agreement",
        fileSize: "2.8 MB",
        fileName: "Acme_Agreement_v1.pdf",
      },
    ],
  },
  {
    id: "ev-007",
    name: "ISO 14001 Environmental Certificate",
    docType: "Certificate",
    status: "Valid",
    expiryDate: "2026-09-20",
    lastUpdated: "2025-09-20",
    description: "Environmental Management System certification",
    versions: [
      {
        id: "v1",
        version: 1,
        uploadedAt: "2025-09-20",
        uploader: "John Smith",
        notes: "Initial certification obtained",
        fileSize: "2.6 MB",
        fileName: "ISO_14001.pdf",
      },
    ],
  },
  {
    id: "ev-008",
    name: "Workers Compensation Policy",
    docType: "Insurance",
    status: "Draft",
    expiryDate: null,
    lastUpdated: "2026-01-08",
    description: "Workers compensation insurance documentation",
    versions: [
      {
        id: "v1",
        version: 1,
        uploadedAt: "2026-01-08",
        uploader: "HR Team",
        notes: "Draft for review",
        fileSize: "680 KB",
        fileName: "Workers_Comp_Draft.pdf",
      },
    ],
  },
]

export const mockRequests: RequestItem[] = [
  {
    id: "req-001",
    docType: "Certificate",
    dueDate: "2026-01-15",
    status: "Pending",
    buyerName: "GlobalTech Inc.",
    notes: "Requesting ISO 9001 certification for vendor qualification",
  },
  {
    id: "req-002",
    docType: "Audit Report",
    dueDate: "2026-01-20",
    status: "In Progress",
    buyerName: "EcoSupply Co.",
    notes: "Need latest factory audit for sustainability review",
  },
  {
    id: "req-003",
    docType: "Insurance",
    dueDate: "2026-01-10",
    status: "Overdue",
    buyerName: "SafeSource Ltd.",
    notes: "Liability insurance proof required urgently",
  },
  {
    id: "req-004",
    docType: "Policy",
    dueDate: "2026-01-25",
    status: "Pending",
    buyerName: "GreenMfg Partners",
    notes: "Environmental policy needed for compliance check",
  },
  {
    id: "req-005",
    docType: "License",
    dueDate: "2026-01-05",
    status: "Fulfilled",
    buyerName: "QualityFirst Corp.",
    fulfilledWith: "ev-004",
    notes: "Business license verification complete",
  },
  {
    id: "req-006",
    docType: "Certificate",
    dueDate: "2026-02-01",
    status: "Pending",
    buyerName: "TrustChain Solutions",
    notes: "ISO 14001 certificate for environmental assessment",
  },
]

export const docTypes: DocType[] = ["Certificate", "Audit Report", "Policy", "License", "Insurance", "Contract"]
export const docStatuses: DocStatus[] = ["Valid", "Expired", "Expiring Soon", "Pending Review", "Draft"]
export const requestStatuses: RequestStatus[] = ["Pending", "Fulfilled", "Overdue", "In Progress"]
