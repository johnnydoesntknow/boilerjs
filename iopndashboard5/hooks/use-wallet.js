"use client"

import { createContext, useContext, useState, useEffect } from "react"

const WalletContext = createContext(undefined)

export function WalletProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check for existing wallet connection
    const savedAddress = localStorage.getItem("iopn-wallet-address")
    if (savedAddress) {
      setWalletAddress(savedAddress)
      setIsConnected(true)
    }
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate a mock wallet address
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`
      
      setWalletAddress(mockAddress)
      setIsConnected(true)
      
      // Save to localStorage
      localStorage.setItem("iopn-wallet-address", mockAddress)
      
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setIsConnected(false)
    localStorage.removeItem("iopn-wallet-address")
    
    // Clear all related data
    localStorage.removeItem("iopn-discord-user")
    localStorage.removeItem("iopn-discord-skipped")
    localStorage.removeItem("iopn-user")
    localStorage.removeItem("iopn-user-nft")
    localStorage.removeItem("iopn-completed-tutorials")
    localStorage.removeItem("iopn-tutorial-cycle-completed")
  }

  const value = {
    walletAddress,
    isConnected,
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