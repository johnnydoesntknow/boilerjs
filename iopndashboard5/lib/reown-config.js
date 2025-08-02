import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { mainnet, polygon, arbitrum, optimism } from "@reown/appkit/networks"

// 1. Get projectId from https://dashboard.reown.com
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "YOUR_PROJECT_ID"

// 2. Create metadata
const metadata = {
  name: "IOPn Dashboard",
  description: "Your gateway to the IOPn ecosystem",
  url: "https://iopn.network", // Replace with your actual domain
  icons: ["https://i.ibb.co/dN1sMhw/logo.jpg"]
}

// 3. Create wagmiAdapter
export const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, polygon, arbitrum, optimism],
  projectId
})

// 4. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, polygon, arbitrum, optimism],
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
  }
})