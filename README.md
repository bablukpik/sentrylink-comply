# SentryLink Comply - Evidence Vault & Request Fulfillment UI

A modern compliance document management system built with Next.js 16, React 19, and Tailwind CSS. This application enables factory compliance teams to manage evidence documents, track versions, and fulfill buyer audit requests efficiently.

---

## Quick Start

1. **Clone/Download the project**

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## Application Overview

### What is this app?

**SentryLink Comply** is a B2B compliance management platform designed for factories and suppliers who need to:

- Store and organize compliance evidence documents (certifications, audit reports, policies)
- Track document versions and expiration dates
- Respond to buyer/auditor requests for specific documentation
- Maintain audit trails for regulatory compliance

### Problem it Solves

In supply chain compliance, factories are frequently audited by multiple buyers (retailers, brands). Each buyer requests evidence of compliance with various standards (labor, safety, environmental). Managing these documents across multiple systems leads to:

- Lost or outdated documents
- Missed expiration dates on certifications
- Slow response times to buyer requests
- No version control or audit trail

This application centralizes all evidence management in one place.

---

## Features & Screens

### Screen A: Evidence Vault (List View)

**Route:** `/`

| Feature             | Description                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| Document Table      | Displays all evidence with columns: Name, Type, Status, Expiry, Versions, Last Updated, Actions |
| Multi-Filter System | Filter by Document Type, Status (Active/Expired/Pending), Expiry status, and Search             |
| URL Persistence     | All filters are persisted in URL query strings for bookmarking/sharing                          |
| Bulk Selection      | Select multiple documents with "Add to Pack" functionality                                      |
| Quick Actions       | View details, upload new version, or delete documents                                           |

### Screen B: Evidence Detail + Version History

**Route:** `/evidence/[id]`

| Feature            | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| Document Metadata  | Full details including status, type, expiry date, and statistics            |
| Version Timeline   | Complete history of all document versions (v1, v2, v3...)                   |
| Version Details    | Each version shows: upload date, uploader name, notes, file size            |
| Upload New Version | Modal to add new version with required notes field and optional expiry date |

### Screen C: Buyer Request To-Do

**Route:** `/requests`

| Feature           | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| Request List      | All pending requests from buyers with due dates and status      |
| Status Tabs       | Filter by: All, Pending, In Progress, Overdue, Fulfilled        |
| Visual Indicators | Color-coded status chips and overdue warnings                   |
| Fulfill Workflow  | Modal to either select existing evidence OR create new document |
| Progress Tracking | Real-time status updates when requests are fulfilled            |

---

## Technical Architecture

### Tech Stack

| Technology      | Purpose                         |
| --------------- | ------------------------------- |
| Next.js 16      | React framework with App Router |
| React 19        | UI library with latest features |
| TypeScript      | Type safety                     |
| Tailwind CSS v4 | Utility-first styling           |
| shadcn/ui       | Component library               |
| Lucide React    | Icon system                     |

### Project Structure

```
├── app/
│   ├── page.tsx                 # Evidence Vault (Screen A)
│   ├── layout.tsx               # Root layout with sidebar
│   ├── globals.css              # Theme tokens & styles
│   ├── evidence/
│   │   └── [id]/
│   │       └── page.tsx         # Evidence Detail (Screen B)
│   └── requests/
│       └── page.tsx             # Buyer Requests (Screen C)
├── components/
│   ├── app-sidebar.tsx          # Navigation sidebar
│   ├── data-table.tsx           # Reusable table component
│   ├── modal.tsx                # Reusable modal component
│   ├── status-chip.tsx          # Reusable status badge
│   ├── evidence-vault-list.tsx  # Main vault list logic
│   ├── evidence-filters.tsx     # Filter controls
│   ├── upload-version-modal.tsx # Version upload form
│   ├── request-list.tsx         # Request list logic
│   ├── fulfill-request-modal.tsx# Fulfillment workflow
│   └── ui/                      # shadcn components
└── lib/
    ├── mock-data.ts             # Sample data & types
    └── utils.ts                 # Utility functions
```

### Reusable Components

1. **DataTable** - Generic table with selection, sorting-ready, and custom cell rendering
2. **Modal** - Accessible dialog wrapper with customizable header and footer
3. **StatusChip** - Color-coded status indicators for Active, Expired, Pending, etc.

### State Management

- **Local State**: React useState for UI interactions
- **URL State**: Filter persistence via useSearchParams
- **Mock Data**: JSON-based data simulating API responses

---

## Use Cases & Target Users

### Primary Users

| User Type                  | Use Case                                                           |
| -------------------------- | ------------------------------------------------------------------ |
| **Compliance Manager**     | Upload and organize factory certifications, track expiration dates |
| **Quality Assurance Team** | Maintain audit reports and inspection documents                    |
| **Factory Operations**     | Respond to buyer requests with correct documentation               |
| **Procurement/Sourcing**   | Review supplier compliance status                                  |

### Industry Applications

- **Retail Supply Chain** - Walmart, Target supplier compliance
- **Apparel & Textiles** - Labor and safety certifications (WRAP, BSCI)
- **Food & Beverage** - FDA, HACCP, organic certifications
- **Manufacturing** - ISO certifications, environmental compliance
- **Pharmaceuticals** - GMP, regulatory documentation

### Integration Possibilities

This UI can be extended to integrate with:

- **Backend APIs** - Replace mock data with real database (Supabase, PostgreSQL)
- **File Storage** - AWS S3, Vercel Blob for document uploads
- **Authentication** - User roles (Admin, Manager, Viewer)
- **Notifications** - Email alerts for expiring documents
- **Analytics** - Compliance dashboards and reporting
- **External Auditing Systems** - Sedex, EcoVadis, SAP Ariba

---

## Demo Walkthrough

### Evidence Vault

1. Browse the document table on the home page
2. Use filters to narrow down by type (Certificate, Audit Report, Policy)
3. Filter by status to find expired or pending documents
4. Select multiple items and click "Add to Pack"
5. Click "View" on any row to see details

### Version Management

1. Click "View" on any evidence item
2. Review the version history timeline
3. Click "Upload New Version" to add a new document version
4. Fill in notes (required) and optional expiry date

### Request Fulfillment

1. Navigate to "Buyer Requests" in the sidebar
2. Use tabs to filter by status (Pending, Overdue, etc.)
3. Click "Fulfill" on any request
4. Choose to link existing evidence or create new
5. Submit to mark as fulfilled

---

## Development Notes

### Adding Real Data

Replace the mock data in `lib/mock-data.ts` with API calls:

```typescript
// Example: Fetching evidence from API
const { data: evidence } = useSWR("/api/evidence", fetcher);
```

### Adding Authentication

Wrap protected routes with auth middleware:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Add authentication logic
}
```

### Database Schema (Suggested)

```sql
-- Evidence documents
CREATE TABLE evidence (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  doc_type VARCHAR(50),
  status VARCHAR(20),
  expiry_date DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Version history
CREATE TABLE evidence_versions (
  id UUID PRIMARY KEY,
  evidence_id UUID REFERENCES evidence(id),
  version_number INT,
  file_url TEXT,
  file_size VARCHAR(20),
  notes TEXT,
  uploaded_by VARCHAR(100),
  uploaded_at TIMESTAMP
);

-- Buyer requests
CREATE TABLE buyer_requests (
  id UUID PRIMARY KEY,
  doc_type VARCHAR(50),
  buyer_name VARCHAR(100),
  due_date DATE,
  status VARCHAR(20),
  notes TEXT,
  fulfilled_evidence_id UUID REFERENCES evidence(id)
);
```

---

## Contact

**Software Engineer:** Bablu Ahmed  
**Email:** bablukpik@gmail.com
