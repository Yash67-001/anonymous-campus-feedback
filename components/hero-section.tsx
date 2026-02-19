"use client"

import Link from "next/link"
import { Shield, ArrowRight, Lock, Eye, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet-context"

export function HeroSection() {
  const { isConnected, connect } = useWallet()

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 lg:px-8 lg:pb-32 lg:pt-24">
      {/* Glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 -z-10 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-xs text-primary">Powered by Algorand Testnet</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Your Voice,{" "}
            <span className="text-primary">Verified.</span>
            <br />
            Your Identity,{" "}
            <span className="text-accent">Protected.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            A blockchain-based anonymous campus feedback system. Token-gated access ensures only verified campus members can participate,
            while zero-knowledge architecture keeps your identity completely private.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {isConnected ? (
              <Link href="/feedback">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit Feedback
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" onClick={connect} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Connect Wallet to Start
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            <Link href="/board">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                View Public Board
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16">
            {[
              { value: "302", label: "Feedbacks Submitted" },
              { value: "1,247", label: "Anonymous Votes" },
              { value: "100%", label: "On-Chain Verified" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-mono text-2xl font-bold text-primary md:text-3xl">{stat.value}</span>
                <span className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-20 grid gap-4 md:grid-cols-3 lg:mt-28">
          {[
            {
              icon: Lock,
              title: "Token-Gated Access",
              description: "Only holders of the campus ASA token can submit feedback. Verified membership, guaranteed anonymity.",
              color: "primary" as const,
            },
            {
              icon: Eye,
              title: "Zero-Knowledge Privacy",
              description: "Your wallet verifies your eligibility, but feedback is never linked to your address. True anonymity on-chain.",
              color: "accent" as const,
            },
            {
              icon: Zap,
              title: "On-Chain Voting",
              description: "Vote on issues using 0-ALGO transactions. Every vote is a blockchain-native, transparent, and tamper-proof action.",
              color: "primary" as const,
            },
          ].map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-card/80"
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${feature.color === "accent" ? "bg-accent/10 ring-1 ring-accent/30" : "bg-primary/10 ring-1 ring-primary/30"}`}>
                  <Icon className={`h-5 w-5 ${feature.color === "accent" ? "text-accent" : "text-primary"}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
