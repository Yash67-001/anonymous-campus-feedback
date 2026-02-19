"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFeedback } from "@/lib/feedback-store"
import { FeedbackCard } from "@/components/feedback-card"
import { cn } from "@/lib/utils"

const categories = ["All", "Infrastructure", "Academics", "Campus Life", "Safety", "Administration", "Faculty", "Events", "Other"]
const statuses = ["All", "Pending", "Reviewed", "Resolved"]

type SortOption = "votes" | "newest" | "oldest"

export function PublicBoard() {
  const { feedbacks } = useFeedback()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [sort, setSort] = useState<SortOption>("votes")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = feedbacks

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (fb) =>
          fb.title.toLowerCase().includes(q) ||
          fb.message.toLowerCase().includes(q) ||
          fb.category.toLowerCase().includes(q)
      )
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter((fb) => fb.category === selectedCategory)
    }

    // Status
    if (selectedStatus !== "All") {
      result = result.filter((fb) => fb.status === selectedStatus.toLowerCase())
    }

    // Sort
    switch (sort) {
      case "votes":
        result = [...result].sort((a, b) => b.votes - a.votes)
        break
      case "newest":
        result = [...result].sort((a, b) => b.timestamp - a.timestamp)
        break
      case "oldest":
        result = [...result].sort((a, b) => a.timestamp - b.timestamp)
        break
    }

    return result
  }, [feedbacks, search, selectedCategory, selectedStatus, sort])

  const totalVotes = feedbacks.reduce((acc, fb) => acc + fb.votes, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Total Feedbacks", value: feedbacks.length, color: "text-primary" },
          { label: "Total Votes", value: totalVotes, color: "text-primary" },
          { label: "Pending", value: feedbacks.filter((f) => f.status === "pending").length, color: "text-yellow-400" },
          { label: "Resolved", value: feedbacks.filter((f) => f.status === "resolved").length, color: "text-green-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <p className={cn("mt-1 font-mono text-2xl font-bold", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border bg-input pl-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "shrink-0 border-border text-muted-foreground",
              showFilters && "bg-primary/10 text-primary ring-1 ring-primary/30"
            )}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 md:flex-row md:items-end">
            <div className="flex flex-1 flex-col gap-1.5">
              <span className="text-xs text-muted-foreground">Category</span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "cursor-pointer border-border text-xs transition-colors",
                      selectedCategory === cat
                        ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                        : "text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">Status</span>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[130px] border-border bg-input text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card">
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">Sort</span>
                <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                  <SelectTrigger className="w-[140px] border-border bg-input text-foreground">
                    <ArrowUpDown className="mr-2 h-3 w-3" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card">
                    <SelectItem value="votes">Most Votes</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
          <Search className="h-8 w-8 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No feedbacks found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <span className="text-xs text-muted-foreground">
            Showing {filtered.length} of {feedbacks.length} feedbacks
          </span>
          {filtered.map((fb) => (
            <FeedbackCard key={fb.id} feedback={fb} />
          ))}
        </div>
      )}
    </div>
  )
}
