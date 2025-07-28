"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Gift, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useNFT } from "@/hooks/use-nft"
import { useTutorial } from "@/hooks/use-tutorial"
import { useAchievement } from "@/hooks/use-achievement"
import { TutorialButton } from "@/components/tutorial-button"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"

export default function NFTMintPage() {
  const router = useRouter()
  const { mintNFT, isMinting, hasNFT } = useNFT()
  const { showTutorial } = useTutorial()
  const { triggerAchievement } = useAchievement()
  const { theme } = useTheme()
  
  const [referralCode, setReferralCode] = useState("")
  const [nftName, setNftName] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (hasNFT) {
      router.push("/nft-showcase")
    } else {
      showTutorial("nft-mint")
    }
  }, [hasNFT, router, showTutorial])

  const handleMint = async () => {
    try {
      await mintNFT({
        name: nftName || undefined,
        referralCode: referralCode || undefined,
      })
      
      // Trigger achievement
      triggerAchievement({
        id: "first_mint",
        title: "Genesis Creator!",
        description: "You've minted your first Origin NFT",
        type: "achievement",
      })
      
      setShowSuccess(true)
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push("/nft-showcase")
      }, 2000)
    } catch (error) {
      console.error("Minting failed:", error)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-black cyber-grid hex-pattern p-4 md:p-8">
          {/* Tutorial Button */}
          <TutorialButton pageId="nft-mint" />
          
          {/* Sidebar Trigger */}
          <div className="absolute top-4 left-4 z-50">
            <SidebarTrigger className="text-bright-aqua hover:text-white" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-indigo to-bright-aqua bg-clip-text text-transparent mb-4">
                Mint Your Origin NFT
              </h1>
              <p className="text-gray-400 text-lg">
                Create your unique digital identity in the IOPn ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* NFT Preview */}
              <Card className={`nft-preview ${
                theme === "light" 
                  ? "bg-white border-gray-200 shadow-xl" 
                  : "holo-card card-hover neon-border"
              }`}>
                <CardHeader>
                  <CardTitle className={theme === "light" ? "text-gray-800" : "text-white"}>
                    NFT Preview
                  </CardTitle>
                  <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                    Your unique Origin NFT
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-violet-indigo via-bright-aqua to-crimson-red p-1">
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="w-20 h-20 text-bright-aqua mx-auto mb-4 animate-pulse" />
                        <p className="text-white font-bold text-xl">
                          {nftName || "Origin Genesis"}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          #{Math.floor(Math.random() * 9999) + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Rarity</span>
                      <Badge className="bg-gradient-to-r from-violet-indigo to-bright-aqua text-white">
                        Genesis
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Type</span>
                      <Badge variant="secondary">Origin</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Mint Date</span>
                      <span className="text-sm text-gray-300">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mint Form */}
              <Card className={`mint-form ${
                theme === "light" 
                  ? "bg-white border-gray-200 shadow-xl" 
                  : "holo-card card-hover neon-border"
              }`}>
                <CardHeader>
                  <CardTitle className={theme === "light" ? "text-gray-800" : "text-white"}>
                    Mint Details
                  </CardTitle>
                  <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                    Customize your NFT
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nft-name" className={theme === "light" ? "text-gray-700" : "text-gray-300"}>
                      NFT Name (Optional)
                    </Label>
                    <Input
                      id="nft-name"
                      placeholder="Enter a custom name for your NFT"
                      value={nftName}
                      onChange={(e) => setNftName(e.target.value)}
                      className={theme === "light" 
                        ? "bg-white border-gray-300" 
                        : "bg-black/50 border-bright-aqua/30 text-white focus:border-bright-aqua"
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referral-code" className={theme === "light" ? "text-gray-700" : "text-gray-300"}>
                      Referral Code (Optional)
                    </Label>
                    <Input
                      id="referral-code"
                      placeholder="Enter referral code for bonus REP"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className={theme === "light" 
                        ? "bg-white border-gray-300" 
                        : "bg-black/50 border-bright-aqua/30 text-white focus:border-bright-aqua"
                      }
                    />
                    {referralCode && (
                      <p className="text-xs text-bright-aqua">
                        <Gift className="w-3 h-3 inline mr-1" />
                        +50 REP bonus for using a referral code!
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-violet-indigo/10 rounded-lg border border-violet-indigo/20">
                      <h4 className="font-semibold text-violet-indigo mb-2">
                        Minting Benefits
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-400">
                        <li>• Unlock badge equipping feature</li>
                        <li>• Access to exclusive missions</li>
                        <li>• Participate in NFT-holder events</li>
                        <li>• Showcase your achievements</li>
                      </ul>
                    </div>

                    <Button
                      onClick={handleMint}
                      disabled={isMinting || showSuccess}
                      className="mint-button w-full cyber-button pulse-glow bg-gradient-to-r from-violet-indigo to-bright-aqua hover:from-violet-indigo/90 hover:to-bright-aqua/90 text-white"
                      size="lg"
                    >
                      {isMinting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Minting...
                        </>
                      ) : showSuccess ? (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Success! Redirecting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Mint NFT (Free)
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-500">
                      One NFT per wallet. Gas fees covered by IOPn.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// components/ui/input.js
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

// components/ui/label.js
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Input, Label }