"use client"

import type { ReactNode } from "react"
import { WalletProvider } from "@/lib/wallet-context"
import { FeedbackProvider } from "@/lib/feedback-store"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      <FeedbackProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </FeedbackProvider>
    </WalletProvider>
  )
}
