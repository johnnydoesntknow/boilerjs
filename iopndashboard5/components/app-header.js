// Save this file as: components/app-header.js

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { useAuth } from "@/hooks/use-auth"
import { useBadgeMarketplace } from "@/hooks/use-badge-marketplace"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

export function AppHeader() {
  const { walletAddress, disconnectWallet } = useWallet()
  const { user } = useAuth()
  const { userREP } = useBadgeMarketplace()
  const { theme } = useTheme()
  const router = useRouter()

  const formatWalletAddress = (address) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleResetFlow = () => {
    // Clear ALL localStorage data
    localStorage.removeItem("iopn-wallet-address")
    localStorage.removeItem("iopn-discord-user")
    localStorage.removeItem("iopn-discord-skipped")
    localStorage.removeItem("iopn-user")
    localStorage.removeItem("iopn-user-nft")
    localStorage.removeItem("iopn-completed-tutorials")
    localStorage.removeItem("iopn-tutorial-cycle-completed")
    localStorage.removeItem("iopn-achievements")
    localStorage.removeItem("iopn-badges")
    localStorage.removeItem("iopn-marketplace-data")
    localStorage.removeItem("iopn-missions-data")
    localStorage.removeItem("iopn-referrals-data")
    localStorage.removeItem("iopn_user_badges")
    localStorage.removeItem("iopn_user_rep")
    localStorage.removeItem("iopn_marketplace_listings")

    // Clear everything that starts with "iopn-"
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("iopn-")) {
        localStorage.removeItem(key)
      }
    })

    // Disconnect wallet
    disconnectWallet()

    // Force page reload to reset all states
    window.location.reload()
  }

  // Get username - fallback to "User" if not available
  const username = user?.name || "Jimi"
  const userInitial = username.charAt(0).toUpperCase()

  return (
    <header className={`sticky top-0 z-30 flex h-14 lg:h-16 items-center gap-2 border-b px-3 sm:px-4 transition-all duration-300 bg-black/95 backdrop-blur-md border-bright-aqua/20`}>
      <div className="flex items-center justify-between w-full">
        {/* Left - Welcome message with username */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <Avatar className={`h-8 w-8 border border-bright-aqua/30`}>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback
              className={`text-sm bg-violet-indigo text-white`}
            >
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className={`text-xs lg:text-sm font-medium text-white`}>
              Welcome back, {username}
            </p>
            <p className={`text-xs truncate text-gray-500`}>
              {formatWalletAddress(walletAddress)}
            </p>
          </div>
        </div>

        {/* Right - Compact stats and reset button */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="text-right hidden sm:block">
            <p
              className={`text-xs uppercase tracking-wide font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
            >
              Wallet Balance
            </p>
            <p className={`text-sm font-bold text-bright-aqua`}>0 OPN</p>
          </div>
          <div className="text-right">
            <p
              className={`text-xs uppercase tracking-wide font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
            >
              Current REP
            </p>
            <p
              className={`text-sm font-bold transition-all duration-300 text-white`}
            >
              {userREP?.toLocaleString()} REP
            </p>
          </div>
          <Button
            onClick={handleResetFlow}
            variant="outline"
            size="sm"
            className={`text-xs hidden lg:inline-flex border-bright-aqua/30 text-bright-aqua hover:bg-bright-aqua/10 bg-transparent`}
          >
            Reset Flow
          </Button>
          
          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleResetFlow}>
                Reset Flow
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}