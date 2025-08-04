"use client"

import React, { useEffect, useState } from "react"
import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { mainnet, polygon, arbitrum, optimism } from "@reown/appkit/networks"
import { opnNetwork } from "@/lib/chains/opn-chain"
import { injectChainImages } from "@/lib/chain-images"
import { watchAccount } from '@wagmi/core'

const queryClient = new QueryClient()

// Force inject solid black styles immediately
if (typeof window !== 'undefined') {
  const forceBlackStyles = `
    /* FORCE SOLID BLACK MODAL - NUCLEAR OPTION */
    
    /* Override EVERYTHING */
    *, *::before, *::after {
      --w3m-backdrop-filter: none !important;
      --w3m-background-blend-mode: normal !important;
    }
    
    /* Target all possible modal elements */
    w3m-modal,
    w3m-modal *,
    w3m-router,
    w3m-router *,
    w3m-modal-router,
    w3m-modal-router *,
    wui-card,
    wui-card *,
    wui-flex,
    wui-flex *,
    .w3m-container,
    .w3m-container *,
    [data-w3m-modal],
    [data-w3m-modal] * {
      background: #000000 !important;
      background-color: #000000 !important;
      background-image: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      filter: none !important;
    }
    
    /* Specific targeting for connecting views */
    w3m-connecting-wc-view,
    w3m-connecting-wc-view *,
    w3m-connecting-siwe-view,
    w3m-connecting-siwe-view *,
    w3m-connecting-external-view,
    w3m-connecting-external-view * {
      background: #000000 !important;
      backdrop-filter: none !important;
    }
    
    /* Override glass effects */
    [class*="glass"],
    [class*="Glass"],
    [class*="blur"],
    [class*="Blur"],
    [class*="transparent"],
    [class*="Transparent"] {
      background: #000000 !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    
    /* Force override ANY inline styles */
    [style*="backdrop-filter"],
    [style*="rgba("],
    [style*="transparent"],
    [style*="blur"] {
      background: #000000 !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    
    /* Override at the attribute level */
    [data-variant*="glass"],
    [data-variant*="transparent"] {
      background: #000000 !important;
    }
  `
  
  // Inject immediately
  const style = document.createElement('style')
  style.id = 'force-black-modal'
  style.textContent = forceBlackStyles
  document.head.appendChild(style)
  
  // Re-inject aggressively
  let counter = 0
  const interval = setInterval(() => {
    if (!document.getElementById('force-black-modal')) {
      const newStyle = document.createElement('style')
      newStyle.id = 'force-black-modal'
      newStyle.textContent = forceBlackStyles
      document.head.appendChild(newStyle)
    }
    
    // Also force styles directly on modal
    const modal = document.querySelector('w3m-modal')
    if (modal) {
      modal.style.cssText = 'background: #000000 !important; backdrop-filter: none !important;'
      modal.querySelectorAll('*').forEach(el => {
        if (el.style) {
          el.style.backgroundColor = '#000000'
          el.style.backdropFilter = 'none'
        }
      })
    }
    
    counter++
    if (counter > 50) clearInterval(interval) // More aggressive
  }, 50) // Faster interval
}

function AppKitContent({ children }) {
  const [wagmiAdapter, setWagmiAdapter] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [appKitInstance, setAppKitInstance] = useState(null)

  useEffect(() => {
    const initAppKit = async () => {
      try {
        // Inject chain images first
        injectChainImages()
        
        // 1. Project ID
        const projectId = "ebc52553bc90f2f63204ad5ac0395e65"
        
        console.log('Initializing AppKit with project ID:', projectId)

        // 2. Create metadata
        const metadata = {
          name: "IOPn Dashboard",
          description: "Your gateway to the IOPn ecosystem",
          url: typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000",
          icons: ["https://i.ibb.co/dN1sMhw/logo.jpg"]
        }

        // 3. Create wagmi adapter
        const adapter = new WagmiAdapter({
          networks: [opnNetwork, mainnet, polygon, arbitrum, optimism],
          projectId
        })

        // 4. Theme variables - MAXIMUM BLACK
        const themeVariables = {
          '--w3m-color-mix': '#00FFFF',
          '--w3m-color-mix-strength': 0,
          '--w3m-accent': '#00FFFF',
          '--w3m-border-radius-master': '12px',
          '--w3m-font-family': 'Inter, sans-serif',
          '--w3m-z-index': 10000,
          // EVERY POSSIBLE BACKGROUND OVERRIDE
          '--w3m-background-color': '#000000',
          '--w3m-background-image-url': 'none',
          '--w3m-overlay-background-color': '#000000',
          '--w3m-overlay-backdrop-filter': 'none',
          '--w3m-color-bg-1': '#000000',
          '--w3m-color-bg-2': '#000000', // Make ALL backgrounds pure black
          '--w3m-color-bg-3': '#000000',
          '--w3m-color-glass': '#000000',
          '--w3m-color-glass-border': 'rgba(0, 255, 255, 0.3)',
          '--w3m-color-overlay': '#000000',
          '--w3m-color-overlay-background': '#000000',
          '--w3m-color-overlay-backdrop-filter': 'none',
          '--w3m-modal-background-color': '#000000',
          '--w3m-modal-overlay-background': '#000000',
          '--w3m-modal-overlay-backdrop-filter': 'none',
          '--w3m-background-blend-mode': 'normal',
          '--w3m-backdrop-blur': 'none',
          '--w3m-backdrop-filter': 'none',
        }

        // 5. Create AppKit
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
          themeMode: 'dark',
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

        // CRITICAL FIX: Watch for account changes and auto-close modal
        const unwatch = watchAccount(adapter.wagmiConfig, {
          onChange(account) {
            console.log('Account changed:', account)
            if (account.isConnected && account.address) {
              // Close the modal when connected
              setTimeout(() => {
                appKit.close()
                // Also force remove the modal
                const modal = document.querySelector('w3m-modal')
                if (modal) {
                  modal.style.display = 'none'
                  setTimeout(() => modal.remove(), 100)
                }
              }, 500)
            }
          }
        })

        // Set up MetaMask specific handlers
        if (typeof window !== 'undefined' && window.ethereum) {
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts && accounts.length > 0) {
              console.log('MetaMask account changed:', accounts[0])
              // Force close modal
              setTimeout(() => {
                appKit.close()
                const modal = document.querySelector('w3m-modal')
                if (modal) modal.remove()
              }, 500)
            }
          })
        }

        // Override modal open to add connection watcher
        const originalOpen = appKit.open
        appKit.open = async function(...args) {
          const result = await originalOpen.apply(this, args)
          
          // Set up connection watcher
          let checkCount = 0
          const watcher = setInterval(() => {
            const state = adapter.wagmiConfig.state
            const account = state.current
            
            if (account && account.address) {
              console.log('Connection detected, closing modal')
              clearInterval(watcher)
              appKit.close()
              
              // Force remove modal if still there
              setTimeout(() => {
                const modal = document.querySelector('w3m-modal')
                if (modal) modal.remove()
              }, 300)
            }
            
            // Also check if MetaMask popup is gone but modal stuck
            checkCount++
            if (checkCount > 10) { // After ~2.5 seconds
              const connectingView = document.querySelector('w3m-connecting-external-view')
              if (connectingView) {
                // Check if we're actually connected
                if (window.ethereum && window.ethereum.selectedAddress) {
                  console.log('MetaMask connected but modal stuck, forcing close')
                  clearInterval(watcher)
                  appKit.close()
                  const modal = document.querySelector('w3m-modal')
                  if (modal) modal.remove()
                }
              }
            }
            
            if (checkCount > 120) clearInterval(watcher) // Stop after 30 seconds
          }, 250)
          
          return result
        }

        // Additional style injection after modal creation
        setTimeout(() => {
          const additionalStyles = `
            /* ADDITIONAL OVERRIDES */
            :root, *, body {
              --w3m-background-color: #000000 !important;
              --w3m-background-image-url: none !important;
              --w3m-overlay-backdrop-filter: none !important;
              --w3m-color-mix-strength: 0 !important;
            }
            
            /* Target wui components */
            wui-card {
              background: #000000 !important;
              --wui-color-modal-bg: #000000 !important;
              --wui-color-bg-base: #000000 !important;
            }
            
            wui-flex[data-variant="glass"] {
              background: #000000 !important;
            }
          `
          
          const overrideStyle = document.createElement('style')
          overrideStyle.textContent = additionalStyles
          document.head.appendChild(overrideStyle)
        }, 100)

        setWagmiAdapter(adapter)
        setAppKitInstance(appKit)
        setIsInitialized(true)
        console.log('AppKit initialized with connection monitoring')
        
        // Store cleanup function
        return () => {
          unwatch()
          if (window.ethereum && window.ethereum.removeAllListeners) {
            window.ethereum.removeAllListeners('accountsChanged')
          }
        }
      } catch (error) {
        console.error('Failed to initialize AppKit:', error)
      }
    }

    // Initialize
    const cleanup = initAppKit()
    
    // Mutation observer for aggressive style enforcement
    const observer = new MutationObserver((mutations) => {
      const modal = document.querySelector('w3m-modal')
      if (modal) {
        modal.style.cssText = 'background: #000000 !important; backdrop-filter: none !important;'
        
        // Check all children
        modal.querySelectorAll('*').forEach(el => {
          const styles = window.getComputedStyle(el)
          if (styles.backdropFilter !== 'none' || styles.backgroundColor.includes('rgba')) {
            el.style.cssText += 'background: #000000 !important; backdrop-filter: none !important;'
          }
        })
      }
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    })
    
    return () => {
      observer.disconnect()
      cleanup?.then(fn => fn?.())
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