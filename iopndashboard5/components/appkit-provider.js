"use client"

import React, { useEffect, useState } from "react"
import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { mainnet, polygon, arbitrum, optimism } from "@reown/appkit/networks"
import { opnNetwork } from "@/lib/chains/opn-chain"
import { injectChainImages } from "@/lib/chain-images"

const queryClient = new QueryClient()

// Force inject solid black styles immediately
if (typeof window !== 'undefined') {
  const forceBlackStyles = `
    /* FORCE SOLID BLACK MODAL - NUCLEAR OPTION */
    w3m-modal, w3m-modal *, 
    w3m-router, w3m-router *,
    appkit-modal, appkit-modal *,
    appkit-router, appkit-router *,
    [data-testid*="w3m"], [data-testid*="w3m"] *,
    [class*="w3m"], [class*="w3m"] * {
      background: #000000 !important;
      background-color: #000000 !important;
      background-image: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    
    /* Override any transparency */
    w3m-modal > div,
    w3m-modal > div > div,
    w3m-modal > div > div > div {
      background: #000000 !important;
      background-color: #000000 !important;
      opacity: 1 !important;
    }
    
    /* Modal content container */
    w3m-modal .w3m-active,
    w3m-modal [class*="container"],
    w3m-modal [class*="content"] {
      background: #000000 !important;
      border: 1px solid rgba(0, 255, 255, 0.3) !important;
    }
    
    /* Wallet buttons */
    w3m-modal button,
    w3m-wallet-button,
    [class*="wallet-button"] {
      background: rgba(20, 20, 20, 1) !important;
      opacity: 1 !important;
    }
    
    /* Remove all blur effects globally */
    * {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
  `
  
  // Inject immediately
  const style = document.createElement('style')
  style.id = 'force-black-modal'
  style.textContent = forceBlackStyles
  document.head.appendChild(style)
  
  // Re-inject every 100ms for 2 seconds to override any dynamic styles
  let counter = 0
  const interval = setInterval(() => {
    if (!document.getElementById('force-black-modal')) {
      const newStyle = document.createElement('style')
      newStyle.id = 'force-black-modal'
      newStyle.textContent = forceBlackStyles
      document.head.appendChild(newStyle)
    }
    counter++
    if (counter > 20) clearInterval(interval)
  }, 100)
}

function AppKitContent({ children }) {
  const [wagmiAdapter, setWagmiAdapter] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('dark') // Default to dark

  useEffect(() => {
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setCurrentTheme(savedTheme)
    
    const initAppKit = async () => {
      try {
        // Inject chain images first
        injectChainImages()
        
        // 1. Project ID
        const projectId = "ebc52553bc90f2f63204ad5ac0395e65"
        
        console.log('Initializing AppKit with project ID:', projectId)
        console.log('Theme set to:', savedTheme)

        // 2. Create metadata
        const metadata = {
          name: "IOPn Dashboard",
          description: "Your gateway to the IOPn ecosystem",
          url: typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000",
          icons: ["https://i.ibb.co/dN1sMhw/logo.jpg"]
        }

        // 3. Create wagmi adapter with OPN chain
        const adapter = new WagmiAdapter({
          networks: [opnNetwork, mainnet, polygon, arbitrum, optimism],
          projectId
        })

        // 4. ALWAYS use dark theme with solid black
        const themeVariables = {
          '--w3m-color-mix': '#00FFFF',
          '--w3m-color-mix-strength': 0, // Set to 0 to remove any mixing
          '--w3m-accent': '#00FFFF',
          '--w3m-border-radius-master': '12px',
          '--w3m-font-family': 'Inter, sans-serif',
          '--w3m-z-index': 10000,
          // Force solid black backgrounds
          '--w3m-background-color': 'rgb(0, 0, 0)',
          '--w3m-background-image-url': 'none',
          '--w3m-foreground-color': 'rgb(255, 255, 255)',
          '--w3m-text-color': 'rgb(255, 255, 255)',
          '--w3m-text-medium-regular-color': 'rgb(160, 160, 160)',
          '--w3m-overlay-background-color': 'rgba(0, 0, 0, 0.95)',
          '--w3m-overlay-backdrop-filter': 'none',
          // Additional overrides
          '--w3m-color-bg-1': 'rgb(0, 0, 0)',
          '--w3m-color-bg-2': 'rgb(10, 10, 10)',
          '--w3m-color-bg-3': 'rgb(20, 20, 20)',
          '--w3m-color-fg-1': 'rgb(255, 255, 255)',
          '--w3m-color-fg-2': 'rgb(200, 200, 200)',
          '--w3m-color-fg-3': 'rgb(160, 160, 160)',
          // Remove ALL transparency
          '--w3m-color-overlay': 'rgba(0, 0, 0, 0.95)',
          '--w3m-backdrop-filter': 'none',
          '--w3m-background-border-radius': '16px',
          '--w3m-container-border-radius': '16px',
          '--w3m-wallet-button-background': 'rgb(20, 20, 20)',
          '--w3m-wallet-button-border-radius': '12px',
        }

        // 5. Create AppKit - ALWAYS in dark mode for solid black
        const appKit = createAppKit({
          adapters: [adapter],
          networks: [opnNetwork, mainnet, polygon, arbitrum, optimism],
          projectId,
          metadata,
          features: {
            analytics: true,
            swaps: false,
            onramp: false,
            email: true,
            socials: ['google', 'x', 'discord', 'github'],
          },
          themeMode: 'dark', // ALWAYS dark for solid black
          themeVariables,
          defaultNetwork: opnNetwork,
          allowUnsupportedChain: true,
          enableNetworkView: true,
          enableAccountView: true,
          termsConditionsUrl: 'https://iopn.network/terms',
          privacyPolicyUrl: 'https://iopn.network/privacy',
          chainImages: {
            984: 'https://i.ibb.co/dN1sMhw/logo.jpg'
          }
        })

        // 6. Override AppKit modal styles after creation
        setTimeout(() => {
          const overrideStyles = `
            /* OVERRIDE APPKIT MODAL STYLES */
            :root {
              --w3m-background-color: #000000 !important;
              --w3m-background-image-url: none !important;
              --w3m-overlay-backdrop-filter: none !important;
              --w3m-color-mix-strength: 0 !important;
            }
            
            body w3m-modal,
            body w3m-router,
            body [data-testid="w3m-modal"] {
              --w3m-background-color: #000000 !important;
              --w3m-overlay-backdrop-filter: none !important;
            }
            
            /* Target the modal shadow DOM if it exists */
            w3m-modal::part(container) {
              background: #000000 !important;
              backdrop-filter: none !important;
            }
            
            /* Override inline styles */
            [style*="backdrop-filter"] {
              backdrop-filter: none !important;
              -webkit-backdrop-filter: none !important;
            }
            
            [style*="background"] {
              background-image: none !important;
            }
          `
          
          const overrideStyle = document.createElement('style')
          overrideStyle.textContent = overrideStyles
          document.head.appendChild(overrideStyle)
          
          // Also try to directly modify the modal element if it exists
          const modal = document.querySelector('w3m-modal')
          if (modal) {
            modal.style.setProperty('background', '#000000', 'important')
            modal.style.setProperty('backdrop-filter', 'none', 'important')
            modal.style.setProperty('-webkit-backdrop-filter', 'none', 'important')
          }
        }, 100)

        setWagmiAdapter(adapter)
        setIsInitialized(true)
        console.log('AppKit initialized successfully with forced dark/black theme')
      } catch (error) {
        console.error('Failed to initialize AppKit:', error)
      }
    }

    // Initialize immediately
    initAppKit()
    
    // Also watch for the modal to appear and force black background
    const observer = new MutationObserver((mutations) => {
      const modal = document.querySelector('w3m-modal')
      if (modal) {
        modal.style.setProperty('background', '#000000', 'important')
        modal.style.setProperty('backdrop-filter', 'none', 'important')
        
        // Find all child elements and force black
        modal.querySelectorAll('*').forEach(el => {
          if (el.style) {
            el.style.setProperty('backdrop-filter', 'none', 'important')
            el.style.setProperty('-webkit-backdrop-filter', 'none', 'important')
          }
        })
      }
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    return () => observer.disconnect()
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

export function AppKitProvider({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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