"use client"

import { Database, Globe, Server, Code2 } from "lucide-react"

const techItems = [
  {
    icon: Globe,
    label: "Frontend",
    tech: "React + Next.js",
    description: "Modern UI with server-side rendering for fast load times.",
  },
  {
    icon: Server,
    label: "Backend",
    tech: "Node.js + Express",
    description: "Metadata API layer for managing non-sensitive feedback data.",
  },
  {
    icon: Database,
    label: "Blockchain",
    tech: "Algorand Testnet",
    description: "ASA tokens, Note field transactions, and atomic transfers for voting.",
  },
  {
    icon: Code2,
    label: "Smart Contracts",
    tech: "PyTeal / Beaker",
    description: "On-chain logic for token verification and vote tallying.",
  },
]

export function TechStack() {
  return (
    <section className="border-t border-border px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="font-mono text-sm text-primary">ARCHITECTURE</span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Built on Proven Technology
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {techItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex flex-col items-start rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="mt-4 font-mono text-xs text-muted-foreground">{item.label}</span>
                <h3 className="mt-1 text-base font-semibold text-foreground">{item.tech}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
