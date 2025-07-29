"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useTheme } from "next-themes"
import { useWallet } from "@/hooks/use-wallet"
import { useBadgeMarketplace } from "@/hooks/use-badge-marketplace"
import { useAchievement } from "@/hooks/use-achievement"
import { Save, X, Star, Sparkles, Plus, Search } from "lucide-react"
import { mockBadges } from "@/lib/mock-data"

export default function NFTShowcasePage() {
  const router = useRouter()
  const { theme } = useTheme()
  const { walletAddress } = useWallet()
  const { userBadges } = useBadgeMarketplace()
  const { triggerAchievement } = useAchievement()
  const [userNFT, setUserNFT] = useState(null)
  const [draggedBadge, setDraggedBadge] = useState(null)
  const [badgePositions, setBadgePositions] = useState({})
  const [hasChanges, setHasChanges] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const nftContainerRef = useRef(null)

  // Also check localStorage directly for badges
  const [localUserBadges, setLocalUserBadges] = useState([])
  
  useEffect(() => {
    // Check localStorage for user badges
    const savedBadges = localStorage.getItem("iopn_user_badges")
    if (savedBadges) {
      setLocalUserBadges(JSON.parse(savedBadges))
    }
  }, [])

  // Use whichever has badges
  let actualUserBadges = userBadges.length > 0 ? userBadges : localUserBadges
  
  // Temporary: If still no badges, use the first 3 badge IDs from mockBadges
  if (actualUserBadges.length === 0) {
    actualUserBadges = ["badge_1", "badge_2", "badge_3"]
  }

  useEffect(() => {
    // Load NFT data
    const savedNFT = localStorage.getItem("iopn-user-nft")
    if (savedNFT) {
      const nft = JSON.parse(savedNFT)
      setUserNFT(nft)
      // Load badge positions if they exist
      if (nft.badges && Array.isArray(nft.badges)) {
        const positions = {}
        nft.badges.forEach(badge => {
          if (badge.position) {
            positions[badge.id] = badge.position
          }
        })
        setBadgePositions(positions)
      }
      
      // If no badges on NFT yet, add Originator badge by default
      if (!nft.badges || nft.badges.length === 0) {
        const originatorBadge = mockBadges.find(b => b.id === "badge_1")
        if (originatorBadge) {
          setUserNFT({
            ...nft,
            badges: [originatorBadge]
          })
          setBadgePositions({
            [originatorBadge.id]: { x: 40, y: 30 } // Center position
          })
          setHasChanges(true)
        }
      }
    } else {
      router.push("/nft-mint")
    }
  }, [router])

  // Get badges that are currently on the NFT
  const equippedBadges = userNFT?.badges || []
  const equippedBadgeIds = equippedBadges.map(b => typeof b === 'string' ? b : b.id)

  // Get user's available badges (not equipped)
  const availableBadges = actualUserBadges
    .map(badgeId => {
      // Handle both string IDs and full badge objects
      if (typeof badgeId === 'object' && badgeId.id) {
        return badgeId
      }
      const badge = mockBadges.find(b => b.id === badgeId)
      return badge
    })
    .filter(badge => badge && !equippedBadgeIds.includes(badge.id))
    .filter(badge => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return badge.name.toLowerCase().includes(query) || 
             badge.rarity.toLowerCase().includes(query) ||
             badge.description.toLowerCase().includes(query)
    })
    .filter(badge => {
      if (filterType === "all") return true
      return badge.rarity === filterType
    })
  
  // Apply same filters to equipped badges for display
  const filteredEquippedBadges = equippedBadges
    .filter(badgeData => {
      const badge = typeof badgeData === 'string' 
        ? mockBadges.find(b => b.id === badgeData) 
        : badgeData
      if (!badge) return false
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matches = badge.name.toLowerCase().includes(query) || 
                       badge.rarity.toLowerCase().includes(query) ||
                       badge.description.toLowerCase().includes(query)
        if (!matches) return false
      }
      
      if (filterType !== "all" && badge.rarity !== filterType) return false
      
      return true
    })

  // Add badge to NFT at random position
  const addBadgeToNFT = (badge) => {
    if (!nftContainerRef.current) return

    // Generate random position within NFT bounds
    const badgeSize = 60
    const maxX = 100 - (badgeSize / nftContainerRef.current.offsetWidth * 100)
    const maxY = 100 - (badgeSize / nftContainerRef.current.offsetHeight * 100)
    
    const randomX = Math.random() * maxX
    const randomY = Math.random() * maxY

    // Add badge to NFT if not already there
    if (!equippedBadgeIds.includes(badge.id)) {
      const updatedBadges = [...equippedBadges, badge]
      setUserNFT({ ...userNFT, badges: updatedBadges })
    }

    // Update position
    setBadgePositions({
      ...badgePositions,
      [badge.id]: { x: randomX, y: randomY }
    })

    setHasChanges(true)
  }

  // Handle drag start
  const handleDragStart = (e, badge) => {
    setDraggedBadge(badge)
    e.dataTransfer.effectAllowed = "move"
  }

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  // Handle drop on NFT
  const handleDrop = (e) => {
    e.preventDefault()
    if (!draggedBadge || !nftContainerRef.current) return

    const rect = nftContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate percentage positions
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    // Ensure badge stays within bounds (considering badge size ~60px)
    const badgeSize = 60
    const maxX = ((rect.width - badgeSize) / rect.width) * 100
    const maxY = ((rect.height - badgeSize) / rect.height) * 100

    const finalX = Math.max(0, Math.min(xPercent, maxX))
    const finalY = Math.max(0, Math.min(yPercent, maxY))

    // Add badge to NFT if not already there
    if (!equippedBadgeIds.includes(draggedBadge.id)) {
      const updatedBadges = [...equippedBadges, draggedBadge]
      setUserNFT({ ...userNFT, badges: updatedBadges })
    }

    // Update position
    setBadgePositions({
      ...badgePositions,
      [draggedBadge.id]: { x: finalX, y: finalY }
    })

    setHasChanges(true)
    setDraggedBadge(null)
  }

  // Handle badge drag on NFT
  const handleBadgeDrag = (e, badgeId) => {
    if (!nftContainerRef.current) return

    const rect = nftContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate percentage positions
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    // Ensure badge stays within bounds
    const badgeSize = 60
    const maxX = ((rect.width - badgeSize) / rect.width) * 100
    const maxY = ((rect.height - badgeSize) / rect.height) * 100

    const finalX = Math.max(0, Math.min(xPercent, maxX))
    const finalY = Math.max(0, Math.min(yPercent, maxY))

    setBadgePositions({
      ...badgePositions,
      [badgeId]: { x: finalX, y: finalY }
    })

    setHasChanges(true)
  }

  // Remove badge from NFT
  const removeBadgeFromNFT = (badgeId) => {
    const updatedBadges = equippedBadges.filter(b => {
      const id = typeof b === 'string' ? b : b.id
      return id !== badgeId
    })
    setUserNFT({ ...userNFT, badges: updatedBadges })
    
    const newPositions = { ...badgePositions }
    delete newPositions[badgeId]
    setBadgePositions(newPositions)
    
    setHasChanges(true)
  }

  // Save NFT with badge positions
  const saveNFT = () => {
    if (!userNFT) return

    // Update badges with their positions
    const updatedBadges = equippedBadges.map(badgeData => {
      const badge = typeof badgeData === 'string' 
        ? mockBadges.find(b => b.id === badgeData)
        : badgeData
      
      return {
        ...badge,
        position: badgePositions[badge.id] || { x: 0, y: 0 }
      }
    })

    const updatedNFT = {
      ...userNFT,
      badges: updatedBadges
    }

    // Save to localStorage (in production, this would be an API call)
    localStorage.setItem("iopn-user-nft", JSON.stringify(updatedNFT))
    
    // Trigger achievement
    triggerAchievement({
      id: "nft_customized",
      title: "NFT Customized!",
      description: "Your NFT has been updated",
      type: "success"
    })

    setHasChanges(false)
  }

  const formatAddress = (address) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!userNFT) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="min-h-screen bg-black flex items-center justify-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className={`min-h-screen transition-all duration-300 ${
          theme === "light" ? "bg-gray-50" : "bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20"
        }`}>
          <div className="flex h-screen p-6">
            <div className="flex flex-1 gap-6 max-w-[1600px] mx-auto w-full">
              {/* Left Column - NFT Display */}
              <div className="flex-1 max-w-2xl">
                {/* NFT Card */}
                <Card className={`h-full ${
                  theme === "light" 
                    ? "bg-white border-gray-200" 
                    : "bg-gradient-to-br from-black/90 via-purple-900/20 to-blue-900/20 border-gray-800"
                }`}>
                  <CardHeader className="pb-4">
                    <CardTitle className={`flex items-center space-x-2 text-xl ${
                      theme === "light" ? "text-gray-800" : "text-white"
                    }`}>
                      <Star className="w-5 h-5 text-violet-indigo" />
                      <span>Your Origin NFT</span>
                    </CardTitle>
                    <CardDescription className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                      Origin Genesis #{userNFT.name?.match(/\d+/)?.[0] || "1976"} - Drag badges to position them anywhere
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-[calc(100%-80px)]">
                    <div 
                      ref={nftContainerRef}
                      className="relative rounded-lg overflow-hidden bg-black flex-1 mb-4"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <img
                        src={userNFT.image}
                        alt={userNFT.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* IOPn Watermark */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/50 text-white border-0">IOPn</Badge>
                      </div>
                      
                      {/* Display equipped badges */}
                      {equippedBadges.map((badgeData) => {
                        const badge = typeof badgeData === 'string' 
                          ? mockBadges.find(b => b.id === badgeData) 
                          : badgeData
                        if (!badge) return null
                        
                        const position = badgePositions[badge.id] || { x: 0, y: 0 }
                        return (
                          <div
                            key={badge.id}
                            draggable
                            onDragEnd={(e) => handleBadgeDrag(e, badge.id)}
                            className="absolute cursor-move group"
                            style={{
                              left: `${position.x}%`,
                              top: `${position.y}%`,
                              width: '60px',
                              height: '60px'
                            }}
                          >
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 bg-black/20 rounded-lg border border-bright-aqua/50"></div>
                              <img
                                src={badge.image}
                                alt={badge.name}
                                className="w-full h-full object-contain relative z-10"
                              />
                            </div>
                            <button
                              onClick={() => removeBadgeFromNFT(badge.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* NFT Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`text-lg font-bold ${
                            theme === "light" ? "text-gray-900" : "text-white"
                          }`}>
                            {userNFT.name}
                          </h3>
                          <p className={`text-xs ${
                            theme === "light" ? "text-gray-600" : "text-gray-400"
                          }`}>
                            {walletAddress ? formatAddress(walletAddress) : "0xa720...ac58"}
                          </p>
                        </div>
                        <div>
                          <div className="text-right">
                            <p className={`text-xs ${
                              theme === "light" ? "text-gray-600" : "text-gray-400"
                            }`}>
                              Traits:
                            </p>
                            <div className="flex gap-1 mt-1">
                              <Badge className="bg-violet-indigo text-white text-xs px-2 py-0">Special</Badge>
                              <Badge className="bg-bright-aqua text-black text-xs px-2 py-0">Rare</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className={`text-xs ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}>
                        Minted on: {new Date(userNFT.mintedAt).toLocaleDateString()}
                      </p>

                      </div>

                      {/* Save Button */}
                      <Button
                        onClick={saveNFT}
                        disabled={!hasChanges}
                        className={`w-full ${
                          hasChanges 
                            ? "bg-gradient-to-r from-bright-aqua to-blue-500 hover:from-bright-aqua/90 hover:to-blue-500/90" 
                            : "bg-gray-600 hover:bg-gray-700"
                        } text-white`}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Save NFT Configuration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Available Badges */}
              <div className="flex-[0.8] min-w-[400px]">
                <div className="h-full space-y-4">
                  <CardHeader className="pb-4 px-0">
                    <div className="bg-violet-indigo rounded-lg p-3 mb-4">
                      <h2 className="text-xl font-semibold text-white">
                        My Badges ({actualUserBadges.length})
                      </h2>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2">
                        <Button
                          variant={filterType === "all" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterType("all")}
                          className={filterType === "all" 
                            ? "bg-violet-indigo text-white border-0" 
                            : "bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
                          }
                        >
                          All
                        </Button>
                        <Button
                          variant={filterType === "legendary" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterType("legendary")}
                          className={filterType === "legendary" 
                            ? "bg-violet-indigo text-white border-0" 
                            : "bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
                          }
                        >
                          Legendary
                        </Button>
                        <Button
                          variant={filterType === "epic" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterType("epic")}
                          className={filterType === "epic" 
                            ? "bg-violet-indigo text-white border-0" 
                            : "bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
                          }
                        >
                          Epic
                        </Button>
                        <Button
                          variant={filterType === "rare" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterType("rare")}
                          className={filterType === "rare" 
                            ? "bg-violet-indigo text-white border-0" 
                            : "bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
                          }
                        >
                          Rare
                        </Button>
                        <Button
                          variant={filterType === "common" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterType("common")}
                          className={filterType === "common" 
                            ? "bg-violet-indigo text-white border-0" 
                            : "bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
                          }
                        >
                          Common
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                        theme === "light" ? "text-gray-400" : "text-gray-500"
                      }`} />
                      <Input
                        placeholder="Search badges..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`pl-10 ${
                          theme === "light"
                            ? "bg-gray-50 border-gray-300"
                            : "bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                        }`}
                      />
                    </div>
                  </CardHeader>
                  <div className="h-[calc(100vh-260px)] overflow-y-auto pr-2">{/* Removed CardContent wrapper */}
                      {/* If user has badges */}
                      {actualUserBadges.length > 0 ? (
                        <div className="space-y-4">
                          {/* Show message if no badges match filter */}
                          {filteredEquippedBadges.length === 0 && availableBadges.length === 0 && (
                            <div className="text-center py-8">
                              <p className={`${
                                theme === "light" ? "text-gray-500" : "text-gray-400"
                              }`}>
                                No badges found matching your filters
                              </p>
                            </div>
                          )}
                          
                          {/* Equipped Badges Section */}
                          {filteredEquippedBadges.length > 0 && (
                            <>
                              <p className={`text-sm font-medium ${
                                theme === "light" ? "text-gray-700" : "text-gray-300"
                              }`}>
                                Equipped on NFT
                              </p>
                              <div className="grid grid-cols-2 gap-3">
                                {filteredEquippedBadges.map((badgeData) => {
                                  const badge = typeof badgeData === 'string' 
                                    ? mockBadges.find(b => b.id === badgeData) 
                                    : badgeData
                                  if (!badge) return null
                                  
                                  return (
                                    <Card
                                      key={badge.id}
                                      className={`p-4 relative ${
                                        theme === "light"
                                          ? "bg-gray-50 border-gray-200"
                                          : "bg-gray-900/50 border-gray-800"
                                      }`}
                                    >
                                      <div className="text-center">
                                        <div className="relative inline-block mb-4">
                                          <img
                                            src={badge.image || `/images/badges/${badge.id}.png`}
                                            alt={badge.name}
                                            className="w-32 h-32 object-contain mx-auto"
                                          />
                                        </div>
                                        <h4 className={`font-semibold text-lg mb-2 ${
                                          theme === "light" ? "text-gray-800" : "text-white"
                                        }`}>
                                          {badge.name}
                                        </h4>
                                        <Badge 
                                          className={`mb-3 px-3 py-1 ${
                                            badge.rarity === "legendary" ? "bg-amber-rust text-black font-bold" :
                                            badge.rarity === "epic" ? "bg-violet-indigo text-white" :
                                            badge.rarity === "rare" ? "bg-bright-aqua text-black" :
                                            "bg-gray-600 text-white"
                                          }`}
                                        >
                                          {badge.rarity}
                                        </Badge>
                                        <p className={`text-sm mb-4 ${
                                          theme === "light" ? "text-gray-600" : "text-gray-400"
                                        }`}>
                                          {badge.description}
                                        </p>
                                        <Button
                                          onClick={() => removeBadgeFromNFT(badge.id)}
                                          className="w-full bg-gradient-to-r from-bright-aqua to-blue-500 hover:from-bright-aqua/90 hover:to-blue-500/90 text-white"
                                        >
                                          Remove from NFT
                                        </Button>
                                      </div>
                                    </Card>
                                  )
                                })}
                              </div>
                              {availableBadges.length > 0 && filteredEquippedBadges.length > 0 && (
                                <div className="my-6" />
                              )}
                            </>
                          )}

                          {/* Available Badges Section */}
                          {availableBadges.length > 0 && (
                            <>
                              <div className="bg-violet-indigo/20 rounded-lg p-3 mb-4">
                                <p className={`text-sm font-medium ${
                                  theme === "light" ? "text-gray-700" : "text-white"
                                }`}>
                                  Available to Add
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                {availableBadges.map((badge) => (
                                  <Card
                                    key={badge.id}
                                    className={`p-4 relative ${
                                      theme === "light"
                                        ? "bg-gray-50 border-gray-200"
                                        : "bg-gray-900/50 border-gray-800"
                                    }`}
                                  >
                                    <div className="text-center">
                                      <div className="relative inline-block mb-4">
                                        <img
                                          src={badge.image}
                                          alt={badge.name}
                                          className="w-32 h-32 object-contain mx-auto"
                                        />
                                      </div>
                                      <h4 className={`font-semibold text-lg mb-2 ${
                                        theme === "light" ? "text-gray-800" : "text-white"
                                      }`}>
                                        {badge.name}
                                      </h4>
                                      <Badge 
                                        className={`mb-3 px-3 py-1 ${
                                          badge.rarity === "legendary" ? "bg-amber-rust text-black font-bold" :
                                          badge.rarity === "epic" ? "bg-violet-indigo text-white" :
                                          badge.rarity === "rare" ? "bg-bright-aqua text-black" :
                                          "bg-gray-600 text-white"
                                        }`}
                                      >
                                        {badge.rarity}
                                      </Badge>
                                      <p className={`text-sm mb-4 ${
                                        theme === "light" ? "text-gray-600" : "text-gray-400"
                                      }`}>
                                        {badge.description}
                                      </p>
                                      <Button
                                        onClick={() => addBadgeToNFT(badge)}
                                        className="w-full bg-gradient-to-r from-bright-aqua to-blue-500 hover:from-bright-aqua/90 hover:to-blue-500/90 text-white"
                                      >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add to NFT
                                      </Button>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        /* No badges at all */
                        <div className="text-center py-8">
                          <p className={`${
                            theme === "light" ? "text-gray-500" : "text-gray-400"
                          }`}>
                            You don't own any badges yet
                          </p>
                          <Button
                            onClick={() => router.push("/marketplace")}
                            className="mt-4 cyber-button bg-gradient-to-r from-violet-indigo to-bright-aqua hover:from-violet-indigo/90 hover:to-bright-aqua/90 text-white"
                          >
                            Get Badges
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}