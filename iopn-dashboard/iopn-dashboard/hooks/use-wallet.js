"use client"

import { createContext, useContext, useState, useEffect } from "react"

const WalletContext = createContext(undefined)

export function WalletProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check localStorage for existing wallet connection
    const savedAddress = localStorage.getItem("iopn-wallet-address")
    if (savedAddress) {
      setWalletAddress(savedAddress)
      setIsConnected(true)
    }
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)
    
    try {
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, generate a mock wallet address
      // In production, this would use Reown/WalletConnect
      const mockAddress = "0x" + Math.random().toString(16).substr(2, 40)
      
      setWalletAddress(mockAddress)
      setIsConnected(true)
      
      // Save to localStorage
      localStorage.setItem("iopn-wallet-address", mockAddress)
      
      // Save user data
      const userData = {
        address: mockAddress,
        connectedAt: new Date().toISOString(),
      }
      localStorage.setItem("iopn-user", JSON.stringify(userData))
      
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setIsConnected(false)
    
    // Clear all wallet-related data
    localStorage.removeItem("iopn-wallet-address")
    localStorage.removeItem("iopn-user")
  }

  const value = {
    isConnected,
    walletAddress,
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