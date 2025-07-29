"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Gift, Zap, Users, Sparkles, Trophy, Moon, Sun, LogOut } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { useDiscord } from "@/hooks/use-discord"
import { mockUser } from "@/lib/mock-data"
import { useSidebar } from "@/components/ui/sidebar"
import { useBadgeMarketplace } from "@/hooks/use-badge-marketplace"

const navigationItems = [
  { name: "Dashboard", href: "/", icon: TrendingUp },
  { name: "NFT Mint", href: "/nft-mint", icon: Sparkles },
  { name: "NFT Showcase", href: "/nft-showcase", icon: Gift },
  { name: "Missions", href: "/missions", icon: Target },
  { name: "Marketplace", href: "/marketplace", icon: Zap },
  { name: "Referrals", href: "/referrals", icon: Users },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
]

export function AppSidebar({ ...props }) {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } = useWallet()
  const { isDiscordConnected, disconnectDiscord } = useDiscord()
  const { isMobile } = useSidebar()
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { userREP } = useBadgeMarketplace()
  const currentRep = userREP ?? 0

  const formatWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  const handleDiscordDisconnect = () => {
    disconnectDiscord()
  }

  return (
    <Sidebar
      collapsible="icon"
      className={`${theme === "light" ? "light-mode-sidebar" : "bg-black"} text-foreground border-r border-border transition-all duration-300 data-[state=open]:bg-opacity-95 data-[state=open]:backdrop-blur-sm`}
      {...props}
    >
      <div className="h-full w-full bg-background/95 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none flex flex-col">
        <SidebarHeader>
          <div className="flex items-center space-x-3 px-2 py-4">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              <Image
                src={theme === "light" ? "/images/iopn-logo.png" : "/images/iopn-logo-white.png"}
                alt="IOPn Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="group-data-[collapsible=icon]:hidden min-w-0">
              <h1 className={`text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white glow-text"}`}>
                IOPn
              </h1>
              <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Dashboard</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="px-2 pb-4 group-data-[collapsible=icon]:hidden">
            <div className="flex items-center justify-center space-x-4">
              <a
                href="https://twitter.com/iopn"
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme === "light" ? "text-gray-500 hover:text-bright-aqua" : "text-gray-400 hover:text-bright-aqua"} transition-colors`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me/iopn"
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme === "light" ? "text-gray-500 hover:text-bright-aqua" : "text-gray-400 hover:text-bright-aqua"} transition-colors`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/iopn"
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme === "light" ? "text-gray-500 hover:text-bright-aqua" : "text-gray-400 hover:text-bright-aqua"} transition-colors`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* User Stats */}
          {isConnected && (
            <div className="px-2 pb-4 space-y-2 group-data-[collapsible=icon]:hidden">
              <div
                className={`${theme === "light" ? "light-mode-card" : "bg-black/80 border border-violet-indigo/20"} rounded-lg p-3 text-center transition-all duration-300`}
              >
                <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-300"} mb-1 font-medium`}>
                  Connected
                </p>
                <p className={`text-sm font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  {formatWalletAddress(walletAddress)}
                </p>
              </div>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel className={theme === "light" ? "text-gray-700" : ""}>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.href}
                          className={`${theme === "light" ? "hover:bg-gray-100" : "neon-hover"} transition-colors duration-200 ${
                            isActive ? "bg-accent text-accent-foreground" : ""
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Quick Stats - Only show when connected AND Discord connected */}
          {isConnected && isDiscordConnected && (
            <SidebarGroup>
              <SidebarGroupLabel className={theme === "light" ? "text-gray-700" : ""}>Quick Stats</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-2 space-y-3 group-data-[collapsible=icon]:hidden">
                  <div
                    className={`${theme === "light" ? "light-mode-badge-bright-aqua" : "bg-gradient-to-r from-bright-aqua/10 to-bright-aqua/5 border border-bright-aqua/20"} rounded-lg p-3 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        REP Points
                      </span>
                      <Badge
                        variant="outline"
                        className={`${theme === "light" ? "light-mode-badge-bright-aqua" : "bg-bright-aqua/10 text-bright-aqua border-bright-aqua"}`}
                      >
                        {currentRep.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className={`${theme === "light" ? "light-mode-badge-violet-indigo" : "bg-gradient-to-r from-violet-indigo/10 to-violet-indigo/5 border border-violet-indigo/20"} rounded-lg p-3 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        Badges
                      </span>
                      <Badge
                        variant="outline"
                        className={`${theme === "light" ? "light-mode-badge-violet-indigo" : "bg-violet-indigo/10 text-violet-indigo border-violet-indigo"}`}
                      >
                        {mockUser.badges.length}
                      </Badge>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        {/* Footer */}
        <div className="mt-auto">
          <SidebarFooter>
            {/* Disconnect Buttons */}
            {isConnected && (
              <div className="px-2 pb-2 space-y-2 group-data-[collapsible=icon]:hidden">
                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  className={`w-full justify-start ${theme === "light" ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100" : "bg-crimson-red/20 border-crimson-red/40 text-crimson-red hover:bg-crimson-red/30 hover:border-crimson-red/60"} transition-all duration-200`}
                  size="sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect Wallet
                </Button>
              </div>
            )}

            {isDiscordConnected && (
              <div className="px-2 pb-2 group-data-[collapsible=icon]:hidden">
                <Button
                  onClick={handleDiscordDisconnect}
                  variant="outline"
                  className={`w-full justify-start ${theme === "light" ? "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100" : "bg-purple-500/20 border-purple-500/40 text-purple-400 hover:bg-purple-500/30 hover:border-purple-500/60"} transition-all duration-200`}
                  size="sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25-1.845-.276-3.68-.276-5.487 0-.164-.394-.406-.875-.618-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
                  </svg>
                  Disconnect Discord
                </Button>
              </div>
            )}

            {/* Theme Toggle Button */}
            <div className="px-2 pb-2 group-data-[collapsible=icon]:hidden">
              <Button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                variant="outline"
                className={`w-full justify-start ${theme === "light" ? "light-mode-button" : "bg-violet-indigo/20 border-violet-indigo/40 text-violet-indigo hover:bg-violet-indigo/30 hover:border-violet-indigo/60"} transition-all duration-200`}
                size="sm"
              >
                {theme === "light" ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </Button>
            </div>
          </SidebarFooter>
        </div>
      </div>
    </Sidebar>
  )
}