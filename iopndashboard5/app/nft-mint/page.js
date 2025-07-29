"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useTheme } from "next-themes"
import { useAchievement } from "@/hooks/use-achievement"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"

export default function NFTMintPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const { triggerAchievement } = useAchievement()
  const [currentStep, setCurrentStep] = useState(1)
  const [nftDescription, setNftDescription] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintProgress, setMintProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState([])

  // Generate mock images
  const generateImages = async () => {
    setIsGenerating(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Use mock images
    const mockImages = [
      "/images/nfts/nft1.png",
      "/images/nfts/nft2.png", 
      "/images/nfts/nft3.png"
    ]
    
    setGeneratedImages(mockImages)
    setIsGenerating(false)
    setCurrentStep(2)
  }

  // Handle minting process
  const handleMint = async () => {
    if (!selectedImage) return
    
    setIsMinting(true)
    setCurrentStep(3)
    
    // Simulate minting progress
    for (let i = 0; i <= 100; i += 10) {
      setMintProgress(i)
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    
    // Save NFT data
    const nftData = {
      id: `nft_${Date.now()}`,
      name: `Origin Genesis #${Math.floor(Math.random() * 9999) + 1}`,
      description: nftDescription,
      image: selectedImage,
      mintedAt: new Date().toISOString(),
      referralCode: referralCode,
      badges: [] // No badges initially
    }
    
    localStorage.setItem("iopn-user-nft", JSON.stringify(nftData))
    
    // Trigger achievement
    triggerAchievement({
      id: "first_nft",
      title: "Genesis Creator!",
      description: "You've minted your first Origin NFT",
      type: "achievement",
    })
    
    // Redirect to showcase
    setTimeout(() => {
      router.push("/nft-showcase")
    }, 500)
  }

  const styleTips = [
    { label: "Include style (realistic, anime, abstract, etc.)", color: "bright-aqua" },
    { label: "Mention colors, lighting, and mood", color: "violet-indigo" },
    { label: "Describe the character/subject and setting", color: "crimson-red" },
    { label: "Add unique details that make it yours", color: "amber-rust" }
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className={`min-h-screen transition-all duration-300 ${
          theme === "light" ? "bg-gray-50" : "bg-black cyber-grid hex-pattern"
        }`}>
          <div className="container mx-auto p-6 max-w-6xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className={`text-4xl font-bold mb-2 ${
                theme === "light" ? "text-gray-900" : "text-white glow-text"
              }`}>
                Mint Your Origin NFT
              </h1>
              <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                Create your unique identity in the IOPn ecosystem
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 1 ? "bg-bright-aqua" : "bg-gray-600"
                } text-white font-bold`}>
                  1
                </div>
                <div className={`w-24 h-1 ${currentStep >= 2 ? "bg-bright-aqua" : "bg-gray-600"}`} />
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 2 ? "bg-bright-aqua" : "bg-gray-600"
                } text-white font-bold`}>
                  2
                </div>
                <div className={`w-24 h-1 ${currentStep >= 3 ? "bg-bright-aqua" : "bg-gray-600"}`} />
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 3 ? "bg-bright-aqua" : "bg-gray-600"
                } text-white font-bold`}>
                  3
                </div>
              </div>
            </div>

            {/* Step 1: Describe NFT */}
            {currentStep === 1 && (
              <Card className={`max-w-2xl mx-auto ${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "holo-card bg-gradient-to-br from-black/80 to-midnight-indigo/30 neon-border"
              }`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                    Describe Your NFT
                  </CardTitle>
                  <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                    Describe what you want your Origin NFT to look like. Be creative and specific!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}>
                      NFT Description
                    </label>
                    <textarea
                      value={nftDescription}
                      onChange={(e) => setNftDescription(e.target.value)}
                      placeholder="e.g., A mystical warrior standing in a cyberpunk cityscape with neon lights, wearing futuristic armor with glowing blue accents..."
                      className={`w-full h-32 px-4 py-3 rounded-lg border transition-all ${
                        theme === "light"
                          ? "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                          : "bg-black/50 border-bright-aqua/30 text-white focus:border-bright-aqua"
                      } focus:outline-none focus:ring-2 focus:ring-bright-aqua/20`}
                      maxLength={500}
                    />
                    <p className={`text-xs mt-1 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      {nftDescription.length}/500 characters
                    </p>
                  </div>

                  {/* Style Tips */}
                  <div>
                    <h3 className={`text-sm font-semibold mb-3 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}>
                      💡 Pro Tips:
                    </h3>
                    <div className="space-y-2">
                      {styleTips.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className={`text-${tip.color} mt-0.5`}>•</span>
                          <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                            {tip.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Referral Code */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}>
                      Referral Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter referral code"
                      className={`w-full px-4 py-2 rounded-lg border transition-all ${
                        theme === "light"
                          ? "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                          : "bg-black/50 border-bright-aqua/30 text-white focus:border-bright-aqua"
                      } focus:outline-none focus:ring-2 focus:ring-bright-aqua/20`}
                    />
                    <p className={`text-xs mt-1 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                      If someone referred you to IOPn, enter their code here so they can earn REP rewards!
                    </p>
                  </div>

                  <Button
                    onClick={generateImages}
                    disabled={!nftDescription.trim() || isGenerating}
                    className="w-full cyber-button pulse-glow bg-gradient-to-r from-violet-indigo to-bright-aqua hover:from-violet-indigo/90 hover:to-bright-aqua/90 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating Options...
                      </>
                    ) : (
                      "Generate NFT Options"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Choose Image */}
            {currentStep === 2 && (
              <div className="max-w-6xl mx-auto space-y-6">
                <Card className={`${
                  theme === "light" 
                    ? "bg-white border-gray-200" 
                    : "holo-card bg-gradient-to-br from-black/80 to-midnight-indigo/30 neon-border"
                }`}>
                  <CardHeader className="text-center">
                    <CardTitle className={`text-2xl ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                      Choose Your Image
                    </CardTitle>
                    <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                      Select the image you like best, or regenerate for new options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {generatedImages.map((image, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedImage(image)}
                          className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                            selectedImage === image
                              ? "ring-4 ring-bright-aqua scale-105"
                              : "hover:scale-102"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`NFT Option ${index + 1}`}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="bg-black/50 text-white">
                              IOPn
                            </Badge>
                          </div>
                          {selectedImage === image && (
                            <div className="absolute inset-0 bg-bright-aqua/20 flex items-center justify-center">
                              <CheckCircle className="w-12 h-12 text-bright-aqua" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => generateImages()}
                        variant="outline"
                        className={`flex-1 ${
                          theme === "light"
                            ? "border-orange-500 text-orange-600 hover:bg-orange-50"
                            : "border-amber-rust text-amber-rust hover:bg-amber-rust/10"
                        }`}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate Images
                      </Button>
                      <Button
                        onClick={handleMint}
                        disabled={!selectedImage}
                        className="flex-1 cyber-button pulse-glow bg-gradient-to-r from-bright-aqua to-violet-indigo hover:from-bright-aqua/90 hover:to-violet-indigo/90 text-white"
                      >
                        Mint Selected Image
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Minting Progress */}
            {currentStep === 3 && (
              <Card className={`max-w-lg mx-auto ${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "holo-card bg-gradient-to-br from-black/80 to-midnight-indigo/30 neon-border"
              }`}>
                <CardHeader className="text-center">
                  <CardTitle className={`text-2xl ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                    Minting Your NFT
                  </CardTitle>
                  <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                    Please wait while we create your unique Origin NFT on the OPN chain...
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative h-48 flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Minting NFT"
                      className="h-full object-contain rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                        {mintProgress < 30 && "Connecting to OPN chain..."}
                        {mintProgress >= 30 && mintProgress < 60 && "Creating your NFT..."}
                        {mintProgress >= 60 && mintProgress < 90 && "Finalizing metadata..."}
                        {mintProgress >= 90 && "Almost done..."}
                      </span>
                      <span className={theme === "light" ? "text-gray-900" : "text-white"}>
                        {mintProgress}%
                      </span>
                    </div>
                    <Progress value={mintProgress} className="h-2" />
                  </div>

                  <div className={`text-center text-sm ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}>
                    {mintProgress === 100 ? (
                      <div className="flex items-center justify-center space-x-2 text-bright-aqua">
                        <CheckCircle className="w-5 h-5" />
                        <span>Complete! Redirecting to your showcase...</span>
                      </div>
                    ) : (
                      "This may take a few moments"
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}