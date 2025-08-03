"use client"

import React, { useEffect, useState } from "react"
import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { mainnet, polygon, arbitrum, optimism } from "@reown/appkit/networks"
import { opnNetwork } from "@/lib/chains/opn-chain"

const queryClient = new QueryClient()

export function AppKitProvider({ children }) {
  const [wagmiAdapter, setWagmiAdapter] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initAppKit = async () => {
      try {
        // 1. Project ID - hardcoded for reliability
        const projectId = "ebc52553bc90f2f63204ad5ac0395e65"
        
        console.log('Initializing AppKit with project ID:', projectId)
        console.log('OPN Network configured with Chain ID:', opnNetwork.id)

        // 2. Create metadata
        const metadata = {
          name: "IOPn Dashboard",
          description: "Your gateway to the IOPn ecosystem",
          url: typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000",
          icons: ["https://i.ibb.co/dN1sMhw/logo.jpg"]
        }

        // 3. Create wagmi adapter with OPN chain
        const adapter = new WagmiAdapter({
          networks: [opnNetwork, mainnet, polygon, arbitrum, optimism], // OPN first as default
          projectId
        })

        // 4. Create AppKit with OPN as default chain
        const appKit = createAppKit({
          adapters: [adapter],
          networks: [opnNetwork, mainnet, polygon, arbitrum, optimism], // OPN first
          projectId,
          metadata,
          features: {
            analytics: true,
            swaps: false,
            onramp: false
          },
          themeMode: 'dark',
          themeVariables: {
            '--w3m-color-mix': '#00FFFF',
            '--w3m-color-mix-strength': 20,
            '--w3m-accent': '#00FFFF',
            '--w3m-border-radius-master': '8px'
          },
          defaultNetwork: opnNetwork // Set OPN as default network
        })

        setWagmiAdapter(adapter)
        setIsInitialized(true)
        console.log('AppKit initialized successfully with OPN Testnet (Chain ID: 984)')
      } catch (error) {
        console.error('Failed to initialize AppKit:', error)
      }
    }

    if (typeof window !== 'undefined') {
      initAppKit()
    }
  }, [])

  if (!isInitialized || !wagmiAdapter) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-aqua mx-auto mb-4"></div>
          <p className="text-gray-400">Initializing wallet connection...</p>
        </div>
      </div>
    )
  }

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}