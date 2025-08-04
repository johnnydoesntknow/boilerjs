"use client"

import React, { useEffect, useState } from "react"
import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { mainnet, polygon, arbitrum, optimism } from "@reown/appkit/networks"
import { opnNetwork } from "@/lib/chains/opn-chain"
import { useTheme } from "next-themes"
import { injectChainImages } from "@/lib/chain-images"

const queryClient = new QueryClient()

function AppKitContent({ children }) {
  const { theme, resolvedTheme } = useTheme()
  const [wagmiAdapter, setWagmiAdapter] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initAppKit = async () => {
      try {
        // Inject chain images first
        injectChainImages()
        
        // 1. Project ID - hardcoded for reliability
        const projectId = "ebc52553bc90f2f63204ad5ac0395e65"
        
        console.log('Initializing AppKit with project ID:', projectId)
        console.log('OPN Network configured with Chain ID:', opnNetwork.id)
        console.log('Current theme:', resolvedTheme || theme)

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

        // 4. Determine theme mode and variables based on current theme
        const currentTheme = resolvedTheme || theme || 'dark'
        const isDark = currentTheme === 'dark'
        
       const themeVariables = isDark ? {
          '--w3m-color-mix': '#00FFFF',
          '--w3m-color-mix-strength': 40,
          '--w3m-accent': '#00FFFF',
          '--w3m-border-radius-master': '12px',
          '--w3m-font-family': 'Inter, sans-serif',
          '--w3m-z-index': 9999,
          // Additional dark theme variables - NO TRANSPARENCY
          '--w3m-background-color': '#0a0a0a',
          '--w3m-foreground-color': '#ffffff',
          '--w3m-text-medium-regular-color': '#a0a0a0',
          '--w3m-input-background': '#111111',
          '--w3m-container-padding': '20px',
          '--w3m-wallet-icon-size': '60px',
          '--w3m-wallet-icon-border-radius': '16px',
          '--w3m-secondary-color': '#8B00FF',
          '--w3m-overlay-background': 'rgba(0, 0, 0, 0.95)',
          '--w3m-overlay-backdrop-filter': 'none',
          '--w3m-background-opacity': '1',
        } : {
          '--w3m-color-mix': '#3B82F6',
          '--w3m-color-mix-strength': 20,
          '--w3m-accent': '#3B82F6',
          '--w3m-border-radius-master': '12px',
          '--w3m-font-family': 'Inter, sans-serif',
          '--w3m-z-index': 9999,
          // Additional light theme variables
          '--w3m-background-color': '#ffffff',
          '--w3m-foreground-color': '#000000',
          '--w3m-text-medium-regular-color': '#666666',
          '--w3m-input-background': '#f9fafb',
          '--w3m-container-padding': '20px',
          '--w3m-wallet-icon-size': '60px',
          '--w3m-wallet-icon-border-radius': '16px',
          '--w3m-secondary-color': '#7C3AED',
          '--w3m-overlay-background': 'rgba(0, 0, 0, 0.6)',
          '--w3m-overlay-backdrop-filter': 'none',
          '--w3m-background-opacity': '1',
        }

        // 5. Create AppKit with OPN as default chain
        const appKit = createAppKit({
          adapters: [adapter],
          networks: [opnNetwork, mainnet, polygon, arbitrum, optimism], // OPN first
          projectId,
          metadata,
          features: {
            analytics: true,
            swaps: false,
            onramp: false,
            email: true, // Enable email login
            socials: ['google', 'x', 'discord', 'github'], // Enable social logins
          },
          themeMode: isDark ? 'dark' : 'light',
          themeVariables,
          defaultNetwork: opnNetwork, // Set OPN as default network
          allowUnsupportedChain: true, // Allow connection even if chain is not supported
          enableNetworkView: true, // Enable network switching view
          enableAccountView: true, // Enable account view
          termsConditionsUrl: 'https://iopn.network/terms',
          privacyPolicyUrl: 'https://iopn.network/privacy',
          // Add chain images configuration
          chainImages: {
            984: 'https://i.ibb.co/dN1sMhw/logo.jpg'
          }
        })

        // 6. Add custom chain assets if needed
        if (typeof window !== 'undefined' && window.localStorage) {
          // Store OPN network icon in local storage for caching
          const chainAssets = {
            984: {
              icon: 'https://i.ibb.co/dN1sMhw/logo.jpg',
              name: 'OPN Testnet'
            }
          }
          window.localStorage.setItem('appkit-chain-assets', JSON.stringify(chainAssets))
        }

        setWagmiAdapter(adapter)
        setIsInitialized(true)
        console.log('AppKit initialized successfully with OPN Testnet (Chain ID: 984)')
      } catch (error) {
        console.error('Failed to initialize AppKit:', error)
      }
    }

    // Initialize on mount and when theme changes
    if (typeof window !== 'undefined') {
      initAppKit()
    }
  }, [theme, resolvedTheme]) // Re-initialize when theme changes

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

export function AppKitProvider({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-aqua mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return <AppKitContent>{children}</AppKitContent>
}