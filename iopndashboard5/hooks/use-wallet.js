"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAppKit, useAppKitAccount } from "@reown/appkit/react"
import { useDisconnect } from "wagmi"

const WalletContext = createContext(undefined)

export function WalletProvider({ children }) {
  const { open } = useAppKit()
  const { address, isConnected: wagmiIsConnected, status } = useAppKitAccount()
  const { disconnect } = useDisconnect()
  const [isConnecting, setIsConnecting] = useState(false)

  // Sync connection state
  useEffect(() => {
    setIsConnecting(status === "connecting")
  }, [status])

  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      await open()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    disconnect()
    
    // Clear all related data
    localStorage.removeItem("iopn-discord-user")
    localStorage.removeItem("iopn-discord-skipped")
    localStorage.removeItem("iopn-user")
    localStorage.removeItem("iopn-user-nft")
    localStorage.removeItem("iopn-completed-tutorials")
    localStorage.removeItem("iopn-tutorial-cycle-completed")
  }

  const value = {
    walletAddress: address,
    isConnected: wagmiIsConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
  }

  return (
    <WalletContext.Provider value={value}>
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