"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Shield, Trophy, Star, ExternalLink, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useNFT } from "@/hooks/use-nft"
import { useBadgeMarketplace } from "@/hooks/use-badge-marketplace"
import { useWallet } from "@/hooks/use-wallet"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { mockBadges } from "@/lib/mock-data"

export default function NFTShowcasePage() {
  const router = useRouter()
  const { userNFT, hasNFT } = useNFT()
  const { userBadges, getUserBadgeDetails } = useBadgeMarketplace()
  const { walletAddress } = useWallet()
  const { theme } = useTheme()
  
  const [copied, setCopied] = useState(false)
  const [selectedBadges, setSelectedBadges] = useState([])
  const ownedBadges = getUserBadgeDetails()

  useEffect(() => {
    if (!hasNFT) {
      router.push("/nft-mint")
    }
  }, [hasNFT, router])

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleBadgeSelect = (badgeId) => {
    if (selectedBadges.includes(badgeId)) {
      setSelectedBadges(selectedBadges.filter(id => id !== badgeId))
    } else if (selectedBadges.length < 3) {
      setSelectedBadges([...selectedBadges, badgeId])
    }
  }

  if (!userNFT) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-black cyber-grid hex-pattern p-4 md:p-8">
          {/* Sidebar Trigger */}
          <div className="absolute top-4 left-4 z-50">
            <SidebarTrigger className="text-bright-aqua hover:text-white" />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-indigo to-bright-aqua bg-clip-text text-transparent mb-4">
                Your Origin NFT
              </h1>
              <p className="text-gray-400 text-lg">
                Showcase your unique digital identity
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* NFT Display */}
              <div className="lg:col-span-1">
                <Card className={`${
                  theme === "light" 
                    ? "bg-white border-gray-200 shadow-xl" 
                    : "holo-card card-hover neon-border"
                }`}>
                  <CardContent className="p-6">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-violet-indigo via-bright-aqua to-crimson-red p-1 mb-6">
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <div className="text-center">
                          <Sparkles className="w-24 h-24 text-bright-aqua mx-auto mb-4 animate-pulse" />
                          <p className="text-white font-bold text-2xl">
                            {userNFT.name}
                          </p>
                          <p className="text-gray-400 text-sm mt-2">
                            #{userNFT.id.slice(-4)}
                          </p>
                        </div>
                      </div>
                      
                      {/* Equipped Badges */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                        {selectedBadges.map((badgeId, index) => {
                          const badge = ownedBadges.find(b => b.id === badgeId)
                          if (!badge) return null
                          
                          return (
                            <div
                              key={badgeId}
                              className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                                badge.rarity === "legendary" ? "from-yellow-400 to-yellow-600 legendary-glow" :
                                badge.rarity === "epic" ? "from-purple-400 to-purple-600 epic-glow" :
                                badge.rarity === "rare" ? "from-blue-400 to-blue-600 rare-glow" :
                                "from-gray-400 to-gray-600 common-glow"
                              } flex items-center justify-center`}
                            >
                              <Star className="w-6 h-6 text-white" />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Owner</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-300 font-mono">
                            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyAddress}
                            className="h-6 w-6 p-0"
                          >
                            {copied ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Minted</span>
                        <span className="text-sm text-gray-300">
                          {userNFT.mintedAt}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Badges Equipped</span>
                        <span className="text-sm text-gray-300">
                          {selectedBadges.length}/3
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 cyber-button bg-gradient-to-r from-violet-indigo to-bright-aqua hover:from-violet-indigo/90 hover:to-bright-aqua/90 text-white"
                      onClick={() => window.open("#", "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Marketplace
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Badge Management */}
              <div className="lg:col-span-2">
                <Card className={`${
                  theme === "light" 
                    ? "bg-white border-gray-200 shadow-xl" 
                    : "holo-card neon-border"
                }`}>
                  <CardHeader>
                    <CardTitle className={theme === "light" ? "text-gray-800" : "text-white"}>
                      Badge Collection
                    </CardTitle>
                    <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                      Select up to 3 badges to display on your NFT
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="owned" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="owned">Owned Badges</TabsTrigger>
                        <TabsTrigger value="all">All Badges</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="owned" className="mt-6">
                        {ownedBadges.length === 0 ? (
                          <div className="text-center py-12">
                            <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">You don't own any badges yet</p>
                            <Button
                              onClick={() => router.push("/marketplace")}
                              className="mt-4 cyber-button"
                            >
                              Visit Marketplace
                            </Button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {ownedBadges.map((badge) => (
                              <div
                                key={badge.id}
                                onClick={() => handleBadgeSelect(badge.id)}
                                className={`cursor-pointer transition-all duration-200 ${
                                  selectedBadges.includes(badge.id) 
                                    ? "scale-105" 
                                    : "hover:scale-105"
                                }`}
                              >
                                <Card className={`relative overflow-hidden ${
                                  selectedBadges.includes(badge.id)
                                    ? "ring-2 ring-bright-aqua"
                                    : ""
                                } ${
                                  badge.rarity === "legendary" ? "legendary-glow" :
                                  badge.rarity === "epic" ? "epic-glow" :
                                  badge.rarity === "rare" ? "rare-glow" :
                                  "common-glow"
                                }`}>
                                  <CardContent className="p-4">
                                    <div className="text-center">
                                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${
                                        badge.rarity === "legendary" ? "from-yellow-400 to-yellow-600" :
                                        badge.rarity === "epic" ? "from-purple-400 to-purple-600" :
                                        badge.rarity === "rare" ? "from-blue-400 to-blue-600" :
                                        "from-gray-400 to-gray-600"
                                      } flex items-center justify-center`}>
                                        <Trophy className="w-8 h-8 text-white" />
                                      </div>
                                      <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                                      <Badge variant="secondary" className="text-xs">
                                        {badge.rarity}
                                      </Badge>
                                    </div>
                                    
                                    {selectedBadges.includes(badge.id) && (
                                      <div className="absolute top-2 right-2">
                                        <div className="w-6 h-6 bg-bright-aqua rounded-full flex items-center justify-center">
                                          <Check className="w-4 h-4 text-black" />
                                        </div>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {mockBadges.map((badge) => {
                            const isOwned = userBadges.includes(badge.id)
                            
                            return (
                              <div
                                key={badge.id}
                                className={`${
                                  !isOwned ? "opacity-50" : ""
                                }`}
                              >
                                <Card className={`relative overflow-hidden ${
                                  badge.rarity === "legendary" ? "legendary-glow" :
                                  badge.rarity === "epic" ? "epic-glow" :
                                  badge.rarity === "rare" ? "rare-glow" :
                                  "common-glow"
                                }`}>
                                  <CardContent className="p-4">
                                    <div className="text-center">
                                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${
                                        badge.rarity === "legendary" ? "from-yellow-400 to-yellow-600" :
                                        badge.rarity === "epic" ? "from-purple-400 to-purple-600" :
                                        badge.rarity === "rare" ? "from-blue-400 to-blue-600" :
                                        "from-gray-400 to-gray-600"
                                      } flex items-center justify-center`}>
                                        <Trophy className="w-8 h-8 text-white" />
                                      </div>
                                      <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                                      <Badge variant="secondary" className="text-xs mb-2">
                                        {badge.rarity}
                                      </Badge>
                                      {!isOwned && (
                                        <p className="text-xs text-gray-500">
                                          {badge.price} REP
                                        </p>
                                      )}
                                    </div>
                                    
                                    {!isOwned && (
                                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Shield className="w-8 h-8 text-gray-500" />
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            )
                          })}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}