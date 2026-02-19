"use client"

import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Campus<span className="text-primary">Voice</span>
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/feedback" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Submit Feedback
          </Link>
          <Link href="/board" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Public Board
          </Link>
          <Link href="/admin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Admin
          </Link>
        </nav>

        <p className="font-mono text-xs text-muted-foreground">
          Algorand Testnet &middot; B.Tech Project 2026
        </p>
      </div>
    </footer>
  )
}
