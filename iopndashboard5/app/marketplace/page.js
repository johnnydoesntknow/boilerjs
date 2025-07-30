"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Shield, Star, Lock, ShoppingCart, Filter, Package, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockBadges } from "@/lib/mock-data"
import { useBadgeMarketplace } from "@/hooks/use-badge-marketplace"
import { useAchievement } from "@/hooks/use-achievement"
import { useTutorial } from "@/hooks/use-tutorial"
import { TutorialButton } from "@/components/tutorial-button"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"

export default function MarketplacePage() {
  const router = useRouter()
  const { theme } = useTheme()
  const { 
    userBadges, 
    userREP, 
    purchaseBadge, 
    canPurchaseBadge,
    isLoading 
  } = useBadgeMarketplace()
  const { triggerAchievement } = useAchievement()
  const { showTutorial } = useTutorial()
  
  const [selectedRarity, setSelectedRarity] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [purchasingBadgeId, setPurchasingBadgeId] = useState(null)
  const [activeMainTab, setActiveMainTab] = useState("buy")
  const [equippedBadgeIds, setEquippedBadgeIds] = useState([])

  useEffect(() => {
    showTutorial("marketplace")
  }, [showTutorial])

  // Get user's NFT data to check equipped badges
  useEffect(() => {
    const nftData = localStorage.getItem("iopn-user-nft")
    if (nftData) {
      const nft = JSON.parse(nftData)
      const equipped = nft.badges?.map(b => b.id) || []
      setEquippedBadgeIds(equipped)
    }
  }, [])

  // Get user's badges for sell tab (only unequipped badges)
  const userBadgesForSale = userBadges
    .map(badgeId => mockBadges.find(b => b.id === badgeId))
    .filter(badge => badge && !equippedBadgeIds.includes(badge.id))

  const handlePurchase = async (badgeId) => {
    setPurchasingBadgeId(badgeId)
    
    try {
      const result = await purchaseBadge(badgeId)
      
      if (result.success) {
        triggerAchievement({
          id: `badge_purchase_${badgeId}`,
          title: "Badge Acquired!",
          description: `You purchased ${result.badge.name}`,
          type: "achievement",
        })
        
        // Check if this is the first badge purchase
        if (userBadges.length === 1) {
          triggerAchievement({
            id: "first_badge",
            title: "Badge Collector!",
            description: "Purchased your first badge",
            type: "milestone",
          })
        }
      }
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setPurchasingBadgeId(null)
    }
  }

  const handleSell = (badge) => {
    // Mock selling functionality
    const sellPrice = Math.floor(badge.price * 0.7) // 70% of original price
    triggerAchievement({
      id: `badge_sell_${badge.id}`,
      title: "Badge Listed!",
      description: `${badge.name} listed for ${sellPrice} REP`,
      type: "success"
    })
  }

  const filteredBadges = mockBadges.filter(badge => {
    if (selectedRarity !== "all" && badge.rarity !== selectedRarity) return false
    if (selectedCategory !== "all" && badge.category !== selectedCategory) return false
    return true
  })

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "legendary": return "from-yellow-400 to-yellow-600"
      case "epic": return "from-purple-400 to-purple-600"
      case "rare": return "from-blue-400 to-blue-600"
      default: return "from-gray-400 to-gray-600"
    }
  }

  const getRarityGlow = (rarity) => {
    switch (rarity) {
      case "legendary": return "legendary-glow"
      case "epic": return "epic-glow"
      case "rare": return "rare-glow"
      default: return "common-glow"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className={`min-h-screen p-4 md:p-8 ${
  theme === "light" ? "bg-white" : "bg-black cyber-grid hex-pattern"
}`}>
          {/* Tutorial Button */}
          <TutorialButton pageId="marketplace" />
          
          {/* Sidebar Trigger */}
          <div className="absolute top-4 left-4 z-50">
            <SidebarTrigger className="text-bright-aqua hover:text-white" />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-indigo to-bright-aqua bg-clip-text text-transparent mb-4">
                Badge Marketplace
              </h1>
              <p className="text-gray-400 text-lg">
                Trade badges with the community
              </p>
            </div>

            {/* User Stats */}
            <div className="flex justify-center mb-8">
              <Card className={`${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "bg-black/60 border-bright-aqua/20"
              }`}>
                <CardContent className="p-4 flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-1">Your REP</p>
                    <p className="text-2xl font-bold text-bright-aqua">
                      {userREP.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-12 w-px bg-gray-700" />
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-1">Badges Owned</p>
                    <p className="text-2xl font-bold text-violet-indigo">
                      {userBadges.length}
                    </p>
                  </div>
                  <div className="h-12 w-px bg-gray-700" />
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-1">Can Sell</p>
                    <p className="text-2xl font-bold text-amber-rust">
                      {userBadgesForSale.length}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Tabs */}
            <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="buy" className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Buy
                </TabsTrigger>
                <TabsTrigger value="sell" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Sell
                </TabsTrigger>
              </TabsList>

              {/* Buy Tab */}
              <TabsContent value="buy">
                <Card className={`${
                  theme === "light" 
                    ? "bg-white border-gray-200 shadow-xl" 
                    : "holo-card neon-border"
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className={theme === "light" ? "text-gray-800" : "text-white"}>
                          Available Badges
                        </CardTitle>
                        <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                          Purchase badges to customize your profile and NFT
                        </CardDescription>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="filter-buttons grid w-full grid-cols-5 mb-6">
                        <TabsTrigger value="all" onClick={() => setSelectedRarity("all")}>
                          All
                        </TabsTrigger>
                        <TabsTrigger value="common" onClick={() => setSelectedRarity("common")}>
                          Common
                        </TabsTrigger>
                        <TabsTrigger value="rare" onClick={() => setSelectedRarity("rare")}>
                          Rare
                        </TabsTrigger>
                        <TabsTrigger value="epic" onClick={() => setSelectedRarity("epic")}>
                          Epic
                        </TabsTrigger>
                        <TabsTrigger value="legendary" onClick={() => setSelectedRarity("legendary")}>
                          Legendary
                        </TabsTrigger>
                      </TabsList>

                      <div className="badge-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBadges.map((badge) => {
                          const isOwned = userBadges.includes(badge.id)
                          const canPurchase = canPurchaseBadge(badge.id)
                          const isPurchasing = purchasingBadgeId === badge.id
                          
                          return (
                            <Card
                              key={badge.id}
                              className={`relative overflow-hidden transition-all duration-300 ${
                                theme === "light"
                                  ? "bg-gray-50 border-gray-200 hover:shadow-xl"
                                  : `bg-black/60 border-gray-800 hover:border-bright-aqua/50 ${getRarityGlow(badge.rarity)}`
                              }`}
                            >
                              <CardContent className="p-6">
                                {/* Badge Icon */}
                                <div className="text-center mb-4">
                                  <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${
                                    getRarityColor(badge.rarity)
                                  } flex items-center justify-center mb-4 ${
                                    isOwned ? "opacity-50" : ""
                                  }`}>
                                    <Star className="w-12 h-12 text-white" />
                                  </div>
                                  
                                  <h3 className={`font-bold text-lg mb-1 ${
                                    theme === "light" ? "text-gray-800" : "text-white"
                                  }`}>
                                    {badge.name}
                                  </h3>
                                  
                                  <Badge variant="secondary" className={`mb-3 ${
                                    badge.rarity === "legendary" ? "bg-yellow-500/20 text-yellow-500" :
                                    badge.rarity === "epic" ? "bg-purple-500/20 text-purple-500" :
                                    badge.rarity === "rare" ? "bg-blue-500/20 text-blue-500" :
                                    "bg-gray-500/20 text-gray-500"
                                  }`}>
                                    {badge.rarity}
                                  </Badge>
                                  
                                  <p className="text-sm text-gray-400 mb-4">
                                    {badge.description}
                                  </p>
                                </div>

                                {/* Price and Requirements */}
                                <div className="space-y-3 mb-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Price</span>
                                    <span className="font-semibold text-bright-aqua">
                                      {badge.price} REP
                                    </span>
                                  </div>
                                  
                                  {badge.repThreshold > 0 && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-gray-400">Requires</span>
                                      <span className={`text-sm ${
                                        userREP >= badge.repThreshold
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}>
                                        {badge.repThreshold} REP
                                      </span>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Category</span>
                                    <Badge variant="outline" className="text-xs">
                                      {badge.category}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Purchase Button */}
                                {isOwned ? (
                                  <Button
                                    disabled
                                    className="w-full bg-gray-600 text-gray-400"
                                  >
                                    <Shield className="w-4 h-4 mr-2" />
                                    Owned
                                  </Button>
                                ) : !canPurchase ? (
                                  <Button
                                    disabled
                                    className="w-full bg-gray-600 text-gray-400"
                                  >
                                    <Lock className="w-4 h-4 mr-2" />
                                    {userREP < badge.repThreshold
                                      ? `Requires ${badge.repThreshold} REP`
                                      : "Insufficient REP"
                                    }
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handlePurchase(badge.id)}
                                    disabled={isPurchasing || isLoading}
                                    className="w-full cyber-button bg-gradient-to-r from-violet-indigo to-bright-aqua hover:from-violet-indigo/90 hover:to-bright-aqua/90 text-white"
                                  >
                                    {isPurchasing ? (
                                      <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                        Purchasing...
                                      </>
                                    ) : (
                                      <>
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Purchase
                                      </>
                                    )}
                                  </Button>
                                )}
                              </CardContent>
                              
                              {/* Owned Overlay */}
                              {isOwned && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                                  <div className="text-center">
                                    <Shield className="w-16 h-16 text-green-500 mb-2" />
                                    <p className="text-green-500 font-semibold">Owned</p>
                                  </div>
                                </div>
                              )}
                            </Card>
                          )
                        })}
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sell Tab */}
              <TabsContent value="sell">
                <Card className={`${
                  theme === "light" 
                    ? "bg-white border-gray-200 shadow-xl" 
                    : "holo-card neon-border"
                }`}>
                  <CardHeader>
                    <div>
                      <CardTitle className={theme === "light" ? "text-gray-800" : "text-white"}>
                        Your Badges
                      </CardTitle>
                      <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                        Sell your unequipped badges to other players. Badges currently on your NFT cannot be sold.
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {userBadgesForSale.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 mb-2">No badges available to sell</p>
                        <p className="text-sm text-gray-500">
                          All your badges are currently equipped on your NFT or you don't own any badges yet.
                        </p>
                        <Button 
                          onClick={() => router.push("/nft-showcase")}
                          className="mt-4 cyber-button bg-gradient-to-r from-violet-indigo to-bright-aqua hover:from-violet-indigo/90 hover:to-bright-aqua/90 text-white"
                        >
                          Manage NFT Badges
                        </Button>
                      </div>
                    ) : (
                      <div className="badge-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userBadgesForSale.map((badge) => {
                          if (!badge) return null
                          const sellPrice = Math.floor(badge.price * 0.7)
                          
                          return (
                            <Card
                              key={badge.id}
                              className={`relative overflow-hidden transition-all duration-300 ${
                                theme === "light"
                                  ? "bg-gray-50 border-gray-200 hover:shadow-xl"
                                  : `bg-black/60 border-gray-800 hover:border-bright-aqua/50 ${getRarityGlow(badge.rarity)}`
                              }`}
                            >
                              <CardContent className="p-6">
                                {/* Badge Icon */}
                                <div className="text-center mb-4">
                                  <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${
                                    getRarityColor(badge.rarity)
                                  } flex items-center justify-center mb-4`}>
                                    <Star className="w-12 h-12 text-white" />
                                  </div>
                                  
                                  <h3 className={`font-bold text-lg mb-1 ${
                                    theme === "light" ? "text-gray-800" : "text-white"
                                  }`}>
                                    {badge.name}
                                  </h3>
                                  
                                  <Badge variant="secondary" className={`mb-3 ${
                                    badge.rarity === "legendary" ? "bg-yellow-500/20 text-yellow-500" :
                                    badge.rarity === "epic" ? "bg-purple-500/20 text-purple-500" :
                                    badge.rarity === "rare" ? "bg-blue-500/20 text-blue-500" :
                                    "bg-gray-500/20 text-gray-500"
                                  }`}>
                                    {badge.rarity}
                                  </Badge>
                                  
                                  <p className="text-sm text-gray-400 mb-4">
                                    {badge.description}
                                  </p>
                                </div>

                                {/* Sell Info */}
                                <div className="space-y-3 mb-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Original Price</span>
                                    <span className="text-sm line-through text-gray-500">
                                      {badge.price} REP
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Sell Price</span>
                                    <span className="font-semibold text-bright-aqua">
                                      {sellPrice} REP
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Category</span>
                                    <Badge variant="outline" className="text-xs">
                                      {badge.category}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Sell Button */}
                                <Button
                                  onClick={() => handleSell(badge)}
                                  className="w-full cyber-button bg-gradient-to-r from-amber-rust to-crimson-red hover:from-amber-rust/90 hover:to-crimson-red/90 text-white"
                                >
                                  <DollarSign className="w-4 h-4 mr-2" />
                                  List for {sellPrice} REP
                                </Button>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}