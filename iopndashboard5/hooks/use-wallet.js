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

  // hooks/use-wallet.js - Update the connectWallet function (around line 29)

const connectWallet = useCallback(async () => {
  try {
    setIsConnecting(true)
    
    // Method 1: Try using the global modal if available
    if (window.w3m && window.w3m.open) {
      await window.w3m.open()
      return
    }
    
    // Method 2: Dynamic import with proper connection handling
    const { useAppKit } = await import("@reown/appkit/react")
    const { open, close } = useAppKit()
    
    // Open the modal
    await open()
    
    // CRITICAL FIX: Watch for connection and auto-close modal
    const checkInterval = setInterval(() => {
      if (wagmiIsConnected && address) {
        close() // Close the modal when connected
        clearInterval(checkInterval)
        setIsConnecting(false)
      }
    }, 100)
    
    // Clean up after 30 seconds
    setTimeout(() => {
      clearInterval(checkInterval)
      setIsConnecting(false)
    }, 30000)
    
  } catch (error) {
    console.error("Failed to connect wallet:", error)
    setIsConnecting(false)
  }
}, [wagmiIsConnected, address]) // Add dependencies

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