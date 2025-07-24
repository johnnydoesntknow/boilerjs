"use client"

import { createContext, useContext, useState, useEffect } from "react"

const DiscordContext = createContext(undefined)

export function DiscordProvider({ children }) {
  const [isDiscordConnected, setIsDiscordConnected] = useState(false)
  const [discordUser, setDiscordUser] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check localStorage for existing Discord connection
    const savedDiscordUser = localStorage.getItem("iopn-discord-user")
    if (savedDiscordUser) {
      setDiscordUser(JSON.parse(savedDiscordUser))
      setIsDiscordConnected(true)
    }
  }, [])

  const connectDiscord = async () => {
    setIsConnecting(true)
    
    try {
      // Simulate Discord OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock Discord user data
      const mockDiscordUser = {
        id: Math.random().toString(36).substr(2, 9),
        username: "User#" + Math.floor(Math.random() * 9999),
        avatar: null,
        discriminator: Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
      }
      
      setDiscordUser(mockDiscordUser)
      setIsDiscordConnected(true)
      
      // Save to localStorage
      localStorage.setItem("iopn-discord-user", JSON.stringify(mockDiscordUser))
      
    } catch (error) {
      console.error("Failed to connect Discord:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectDiscord = () => {
    setDiscordUser(null)
    setIsDiscordConnected(false)
    
    // Clear Discord data
    localStorage.removeItem("iopn-discord-user")
    localStorage.removeItem("iopn-discord-skipped")
  }

  const skipDiscord = () => {
    localStorage.setItem("iopn-discord-skipped", "true")
  }

  const value = {
    isDiscordConnected,
    discordUser,
    isConnecting,
    connectDiscord,
    disconnectDiscord,
    skipDiscord,
  }

  return (
    <DiscordContext.Provider value={value}>
      {children}
    </DiscordContext.Provider>
  )
}

export function useDiscord() {
  const context = useContext(DiscordContext)
  if (context === undefined) {
    throw new Error("useDiscord must be used within a DiscordProvider")
  }
  return context
}