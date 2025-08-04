"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useDisconnect } from "wagmi"
import { useAccount } from "wagmi"

const WalletContext = createContext(undefined)

export function WalletProvider({ children }) {
  const { address, isConnected: wagmiIsConnected, status } = useAccount()
  const { disconnect } = useDisconnect()
  const [isConnecting, setIsConnecting] = useState(false)
  const [modalReady, setModalReady] = useState(false)

  // Sync connection state
  useEffect(() => {
    setIsConnecting(status === "connecting")
  }, [status])

  // Check if modal is ready
  useEffect(() => {
    const checkModal = async () => {
      try {
        // Wait a bit for the modal to initialize
        await new Promise(resolve => setTimeout(resolve, 1000))
        setModalReady(true)
      } catch (error) {
        console.error("Modal check failed:", error)
      }
    }
    
    if (typeof window !== 'undefined') {
      checkModal()
    }
  }, [])

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true)
      
      // Method 1: Try using the global modal if available
      if (window.w3m && window.w3m.open) {
        await window.w3m.open()
        return
      }
      
      // Method 2: Dynamic import with retry logic
      let retries = 3
      while (retries > 0) {
        try {
          const { useAppKit } = await import("@reown/appkit/react")
          const { open } = useAppKit()
          await open()
          break
        } catch (error) {
          console.warn(`Failed to open modal, retries left: ${retries - 1}`, error)
          retries--
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 500))
          }
        }
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      // Don't throw - just log the error
    } finally {
      setIsConnecting(false)
    }
  }, [])

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
    modalReady,
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