"use client"

import { Wallet, CheckCircle2, Send, BarChart3 } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Link your Pera or Defly wallet holding the campus ASA token to verify your membership.",
  },
  {
    step: "02",
    icon: CheckCircle2,
    title: "Token Verification",
    description: "The system checks your wallet for the campus token. Your address is verified but never stored.",
  },
  {
    step: "03",
    icon: Send,
    title: "Submit Anonymously",
    description: "Write your feedback and submit. It's recorded on-chain via a Note field transaction with no identity link.",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Vote & Track",
    description: "View all feedback on the public board. Vote on issues with 0-ALGO transactions to signal importance.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-secondary/30 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="font-mono text-sm text-primary">HOW IT WORKS</span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Four Steps to Anonymous Feedback
          </h2>
          <p className="mt-4 text-muted-foreground">
            Blockchain-verified, identity-protected, fully transparent.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={item.step} className="relative flex flex-col rounded-xl border border-border bg-card p-6">
                {/* Step Number */}
                <span className="font-mono text-xs text-muted-foreground">{item.step}</span>
                {/* Icon */}
                <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                {/* Content */}
                <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                {/* Connector line (not on last) */}
                {idx < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border lg:block" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
