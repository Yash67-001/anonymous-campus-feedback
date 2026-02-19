"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface FeedbackItem {
  id: string
  category: string
  title: string
  message: string
  timestamp: number
  txHash: string
  votes: number
  hasVoted: boolean
  status: "pending" | "reviewed" | "resolved"
}

interface FeedbackContextType {
  feedbacks: FeedbackItem[]
  addFeedback: (feedback: Omit<FeedbackItem, "id" | "timestamp" | "txHash" | "votes" | "hasVoted" | "status">) => FeedbackItem
  voteFeedback: (id: string) => void
  updateStatus: (id: string, status: FeedbackItem["status"]) => void
  deleteFeedback: (id: string) => void
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined)

function generateTxHash(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
  let hash = ""
  for (let i = 0; i < 52; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}

const INITIAL_FEEDBACKS: FeedbackItem[] = [
  {
    id: "fb-001",
    category: "Infrastructure",
    title: "Library Wi-Fi constantly drops during peak hours",
    message: "The Wi-Fi in the main library building drops connection every 15-20 minutes during peak hours (10am-4pm). This severely affects students trying to do online research or attend virtual classes. The IT department should upgrade the access points or add more bandwidth capacity.",
    timestamp: Date.now() - 86400000 * 2,
    txHash: generateTxHash(),
    votes: 47,
    hasVoted: false,
    status: "reviewed",
  },
  {
    id: "fb-002",
    category: "Academics",
    title: "Need more lab hours for CS department",
    message: "The computer science labs close at 6pm which is way too early. Many students have classes until 5pm and barely get any lab time. Extending hours to 10pm would greatly benefit students working on projects and assignments.",
    timestamp: Date.now() - 86400000 * 1,
    txHash: generateTxHash(),
    votes: 32,
    hasVoted: false,
    status: "pending",
  },
  {
    id: "fb-003",
    category: "Campus Life",
    title: "Cafeteria food quality has declined significantly",
    message: "Over the past semester, the quality and variety of food in the main cafeteria has noticeably declined. The portions are smaller, prices have increased, and there are fewer healthy options available. Students deserve better nutrition options on campus.",
    timestamp: Date.now() - 86400000 * 3,
    txHash: generateTxHash(),
    votes: 89,
    hasVoted: false,
    status: "resolved",
  },
  {
    id: "fb-004",
    category: "Safety",
    title: "Poor lighting near the south parking lot",
    message: "The walkway between the south parking lot and the engineering building has very poor lighting. Several students have reported feeling unsafe walking there after evening classes. Additional street lights or emergency call stations would improve safety.",
    timestamp: Date.now() - 86400000 * 5,
    txHash: generateTxHash(),
    votes: 63,
    hasVoted: false,
    status: "pending",
  },
  {
    id: "fb-005",
    category: "Administration",
    title: "Registration system crashes during enrollment",
    message: "Every semester, the online course registration system crashes or becomes extremely slow during the enrollment window. This causes students to miss out on required courses. The system needs a serious infrastructure upgrade to handle concurrent users.",
    timestamp: Date.now() - 86400000 * 4,
    txHash: generateTxHash(),
    votes: 71,
    hasVoted: false,
    status: "reviewed",
  },
]

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(INITIAL_FEEDBACKS)

  const addFeedback = useCallback((feedback: Omit<FeedbackItem, "id" | "timestamp" | "txHash" | "votes" | "hasVoted" | "status">) => {
    const newFeedback: FeedbackItem = {
      ...feedback,
      id: `fb-${Date.now()}`,
      timestamp: Date.now(),
      txHash: generateTxHash(),
      votes: 0,
      hasVoted: false,
      status: "pending",
    }
    setFeedbacks((prev) => [newFeedback, ...prev])
    return newFeedback
  }, [])

  const voteFeedback = useCallback((id: string) => {
    setFeedbacks((prev) =>
      prev.map((fb) =>
        fb.id === id
          ? { ...fb, votes: fb.hasVoted ? fb.votes - 1 : fb.votes + 1, hasVoted: !fb.hasVoted }
          : fb
      )
    )
  }, [])

  const updateStatus = useCallback((id: string, status: FeedbackItem["status"]) => {
    setFeedbacks((prev) =>
      prev.map((fb) => (fb.id === id ? { ...fb, status } : fb))
    )
  }, [])

  const deleteFeedback = useCallback((id: string) => {
    setFeedbacks((prev) => prev.filter((fb) => fb.id !== id))
  }, [])

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, voteFeedback, updateStatus, deleteFeedback }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export function useFeedback() {
  const context = useContext(FeedbackContext)
  if (context === undefined) {
    throw new Error("useFeedback must be used within a FeedbackProvider")
  }
  return context
}
