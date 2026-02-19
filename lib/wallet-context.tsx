"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { toast } from "sonner"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  hasToken: boolean
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

// Simulate Algorand Testnet wallet addresses
const MOCK_ADDRESSES = [
  "ALGO7X2KXQJ5HZQK3MNBV4T6FPJIMWCEQ5GQTM",
  "ALGOB9R4WMCZP8NKDYF3JXQT2LVHAE6UCRGXNH",
  "ALGOC3K7YNDT5XRMHZ4JWQ8BFPEG6AS2CTLVQ9",
]

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [hasToken, setHasToken] = useState(false)

  const connect = useCallback(() => {
    // Simulate Pera/Defly wallet connection on Algorand Testnet
    const randomAddress = MOCK_ADDRESSES[Math.floor(Math.random() * MOCK_ADDRESSES.length)]
    setAddress(randomAddress)
    setIsConnected(true)
    // Simulate ASA token-gate check
    setHasToken(true)
    toast.success("Wallet Connected", {
      description: `Connected to Algorand Testnet: ${randomAddress.slice(0, 8)}...`,
    })
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    setIsConnected(false)
    setHasToken(false)
    toast.info("Wallet Disconnected")
  }, [])

  return (
    <WalletContext.Provider value={{ isConnected, address, hasToken, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
