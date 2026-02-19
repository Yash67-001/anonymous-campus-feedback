"use client"

import { useState, useMemo } from "react"
import {
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Tag,
  ExternalLink,
  ChevronUp,
  Filter,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useFeedback, type FeedbackItem } from "@/lib/feedback-store"
import { cn } from "@/lib/utils"

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

const statusConfig: Record<FeedbackItem["status"], { icon: typeof Clock; label: string; color: string }> = {
  pending: { icon: Clock, label: "Pending", color: "text-yellow-400" },
  reviewed: { icon: Eye, label: "Reviewed", color: "text-primary" },
  resolved: { icon: CheckCircle2, label: "Resolved", color: "text-green-400" },
}

export function AdminDashboard() {
  const { feedbacks, updateStatus, deleteFeedback } = useFeedback()
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (filterStatus === "all") return feedbacks
    return feedbacks.filter((fb) => fb.status === filterStatus)
  }, [feedbacks, filterStatus])

  const stats = useMemo(() => {
    return {
      total: feedbacks.length,
      pending: feedbacks.filter((f) => f.status === "pending").length,
      reviewed: feedbacks.filter((f) => f.status === "reviewed").length,
      resolved: feedbacks.filter((f) => f.status === "resolved").length,
      totalVotes: feedbacks.reduce((acc, f) => acc + f.votes, 0),
    }
  }, [feedbacks])

  const handleStatusChange = (id: string, newStatus: FeedbackItem["status"]) => {
    updateStatus(id, newStatus)
    toast.success(`Status updated to "${newStatus}"`)
  }

  const handleDelete = (id: string) => {
    deleteFeedback(id)
    toast.success("Feedback removed from dashboard")
  }

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {}
    feedbacks.forEach((fb) => {
      map[fb.category] = (map[fb.category] || 0) + 1
    })
    return Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }, [feedbacks])

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {[
          { label: "Total", value: stats.total, icon: BarChart3, color: "text-primary" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-400" },
          { label: "Reviewed", value: stats.reviewed, icon: Eye, color: "text-primary" },
          { label: "Resolved", value: stats.resolved, icon: CheckCircle2, color: "text-green-400" },
          { label: "Total Votes", value: stats.totalVotes, icon: ChevronUp, color: "text-accent" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </div>
              <p className={cn("mt-2 font-mono text-2xl font-bold", stat.color)}>{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Category Breakdown */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground">Category Breakdown</h3>
        <div className="mt-4 flex flex-col gap-3">
          {categoryBreakdown.map(([cat, count]) => {
            const pct = Math.round((count / feedbacks.length) * 100)
            return (
              <div key={cat} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-sm text-muted-foreground">{cat}</span>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className="w-12 text-right font-mono text-xs text-muted-foreground">{count} ({pct}%)</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Feedback Management Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-sm font-semibold text-foreground">Manage Feedback</h3>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[130px] border-border bg-input text-xs text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-card">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">No feedbacks match this filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((fb) => {
              const statusCfg = statusConfig[fb.status]
              const StatusIcon = statusCfg.icon
              const isExpanded = expandedId === fb.id

              return (
                <div key={fb.id} className="px-5 py-4">
                  {/* Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : fb.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setExpandedId(isExpanded ? null : fb.id)}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusIcon className={cn("h-3.5 w-3.5", statusCfg.color)} />
                        <span className={cn("text-xs font-medium", statusCfg.color)}>{statusCfg.label}</span>
                        <Badge variant="outline" className="border-border text-xs text-muted-foreground">
                          <Tag className="mr-1 h-2.5 w-2.5" />
                          {fb.category}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">{fb.votes} votes</span>
                      </div>
                      <h4 className="mt-1.5 text-sm font-medium text-foreground">{fb.title}</h4>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{timeAgo(fb.timestamp)}</span>
                        <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                          <ExternalLink className="h-2.5 w-2.5" />
                          {fb.txHash.slice(0, 10)}...
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {/* Status Change */}
                      <Select
                        value={fb.status}
                        onValueChange={(v) => handleStatusChange(fb.id, v as FeedbackItem["status"])}
                      >
                        <SelectTrigger className="w-[110px] border-border bg-input text-xs text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-border bg-card">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete feedback"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="border-border bg-card">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-foreground">Delete Feedback</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              This will remove the feedback from the dashboard. The on-chain record remains immutable.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-border text-foreground hover:bg-secondary">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(fb.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-3 rounded-lg border border-border bg-secondary p-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">{fb.message}</p>
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-background px-3 py-2">
                        <span className="text-xs text-muted-foreground">Full Tx Hash:</span>
                        <code className="font-mono text-xs text-primary">{fb.txHash}</code>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
