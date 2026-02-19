"use client"

import { ChevronUp, Clock, ExternalLink, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/lib/wallet-context"
import { useFeedback, type FeedbackItem } from "@/lib/feedback-store"
import { toast } from "sonner"

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const statusColors: Record<FeedbackItem["status"], string> = {
  pending: "bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/20",
  reviewed: "bg-primary/10 text-primary ring-1 ring-primary/20",
  resolved: "bg-green-500/10 text-green-400 ring-1 ring-green-500/20",
}

interface FeedbackCardProps {
  feedback: FeedbackItem
  showVote?: boolean
}

export function FeedbackCard({ feedback, showVote = true }: FeedbackCardProps) {
  const { isConnected, connect } = useWallet()
  const { voteFeedback } = useFeedback()

  const handleVote = () => {
    if (!isConnected) {
      toast.error("Connect your wallet to vote", {
        action: {
          label: "Connect",
          onClick: connect,
        },
      })
      return
    }
    voteFeedback(feedback.id)
    toast.success(feedback.hasVoted ? "Vote Removed" : "Vote Recorded (0-ALGO Tx)", {
      description: feedback.hasVoted
        ? "Your vote has been withdrawn."
        : "Your anonymous vote has been recorded on-chain.",
    })
  }

  return (
    <div className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/20">
      {/* Vote Column */}
      {showVote && (
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVote}
            className={cn(
              "h-8 w-8 rounded-lg p-0",
              feedback.hasVoted
                ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            )}
            aria-label={`Vote for: ${feedback.title}`}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
          <span className={cn(
            "font-mono text-sm font-bold",
            feedback.hasVoted ? "text-primary" : "text-muted-foreground"
          )}>
            {feedback.votes}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-border text-xs text-muted-foreground">
            <Tag className="mr-1 h-3 w-3" />
            {feedback.category}
          </Badge>
          <Badge className={cn("text-xs", statusColors[feedback.status])}>
            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
          </Badge>
        </div>

        <h3 className="mt-2 text-base font-semibold text-foreground">{feedback.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">{feedback.message}</p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timeAgo(feedback.timestamp)}
          </span>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <ExternalLink className="h-3 w-3" />
            Tx: {feedback.txHash.slice(0, 8)}...
          </span>
        </div>
      </div>
    </div>
  )
}
