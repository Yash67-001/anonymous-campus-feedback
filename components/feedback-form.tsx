"use client"

import { useState } from "react"
import { Send, Shield, Wallet, AlertTriangle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWallet } from "@/lib/wallet-context"
import { useFeedback } from "@/lib/feedback-store"

const categories = [
  "Infrastructure",
  "Academics",
  "Campus Life",
  "Safety",
  "Administration",
  "Faculty",
  "Events",
  "Other",
]

export function FeedbackForm() {
  const { isConnected, hasToken, connect } = useWallet()
  const { addFeedback } = useFeedback()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [lastTx, setLastTx] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !category || !message.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    // Simulate blockchain transaction delay
    await new Promise((r) => setTimeout(r, 2000))

    const newFb = addFeedback({ category, title: title.trim(), message: message.trim() })
    setLastTx(newFb.txHash)
    setSubmitted(true)
    setIsSubmitting(false)

    toast.success("Feedback Submitted On-Chain", {
      description: `Tx: ${newFb.txHash.slice(0, 12)}...`,
    })
  }

  const handleReset = () => {
    setTitle("")
    setCategory("")
    setMessage("")
    setSubmitted(false)
    setLastTx("")
  }

  // Not connected state
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
          <Wallet className="h-7 w-7 text-primary" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-foreground">Wallet Connection Required</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Connect your Pera or Defly wallet to verify you hold the campus ASA token. Your identity remains anonymous.
        </p>
        <Button onClick={connect} className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
    )
  }

  // No token state
  if (!hasToken) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-accent/30 bg-card p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/30">
          <AlertTriangle className="h-7 w-7 text-accent" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-foreground">Token Not Found</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Your wallet does not hold the required campus ASA token. Contact your campus administration to receive your token.
        </p>
      </div>
    )
  }

  // Success state
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-primary/30 bg-card p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-foreground">Feedback Submitted</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your anonymous feedback has been recorded on the Algorand Testnet.
        </p>
        <div className="mt-4 rounded-lg border border-border bg-secondary px-4 py-2">
          <span className="text-xs text-muted-foreground">Transaction Hash</span>
          <p className="mt-1 break-all font-mono text-xs text-primary">{lastTx}</p>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">No wallet address was linked to this feedback</span>
        </div>
        <Button onClick={handleReset} className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
          Submit Another Feedback
        </Button>
      </div>
    )
  }

  // Form state
  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 md:p-8">
      {/* Anonymity indicator */}
      <div className="mb-6 flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-3 ring-1 ring-primary/20">
        <Shield className="h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-primary">Anonymous Mode Active</span> &mdash; Your wallet has been verified, but your address will NOT be stored with this feedback.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Category */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="category" className="text-sm font-medium text-foreground">
            Category
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="border-border bg-input text-foreground">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="title" className="text-sm font-medium text-foreground">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Brief summary of your feedback"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-border bg-input text-foreground placeholder:text-muted-foreground"
            maxLength={100}
          />
          <span className="text-right text-xs text-muted-foreground">{title.length}/100</span>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-sm font-medium text-foreground">
            Feedback Message
          </Label>
          <Textarea
            id="message"
            placeholder="Describe your feedback in detail..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[160px] resize-none border-border bg-input text-foreground placeholder:text-muted-foreground"
            maxLength={1000}
          />
          <span className="text-right text-xs text-muted-foreground">{message.length}/1000</span>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting || !title.trim() || !category || !message.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Submitting to Algorand...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Feedback On-Chain
            </>
          )}
        </Button>
      </div>

      {/* Info */}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Feedback is stored on-chain via Algorand Note field transactions. IPFS hash storage is available for longer messages.
      </p>
    </form>
  )
}
