"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, MessageSquare, LayoutDashboard, Vote, Menu, X, Wallet } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet-context"

const navLinks = [
  { href: "/", label: "Home", icon: Shield },
  { href: "/feedback", label: "Submit Feedback", icon: MessageSquare },
  { href: "/board", label: "Public Board", icon: Vote },
  { href: "/admin", label: "Admin", icon: LayoutDashboard },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isConnected, address, connect, disconnect } = useWallet()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Campus<span className="text-primary">Voice</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Wallet + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {isConnected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={disconnect}
              className="hidden border-primary/30 font-mono text-xs text-primary hover:bg-primary/10 hover:text-primary md:flex"
            >
              <Wallet className="mr-2 h-3.5 w-3.5" />
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={connect}
              className="hidden bg-primary text-primary-foreground hover:bg-primary/90 md:flex"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
          <div className="mt-3 border-t border-border pt-3">
            {isConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => { disconnect(); setMobileOpen(false) }}
                className="w-full border-primary/30 font-mono text-xs text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Wallet className="mr-2 h-3.5 w-3.5" />
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => { connect(); setMobileOpen(false) }}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
