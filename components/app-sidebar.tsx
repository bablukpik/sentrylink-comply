"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileBox, ClipboardList, Package } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Evidence Vault", icon: FileBox },
  { href: "/requests", label: "Buyer Requests", icon: ClipboardList },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-sidebar min-h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-semibold text-sidebar-foreground">SentryLink</span>
            <span className="text-xs text-muted-foreground block">Comply</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">FU</span>
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">Factory User</p>
            <p className="text-xs text-muted-foreground">factory@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
