"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"

const TutorialContext = createContext(undefined)

const tutorials = {
  "/": {
    id: "dashboard",
    title: "Welcome to IOPn Dashboard! 🎉",
    content: "This is your main hub where you can see your REP points, recent activity, and quick actions. REP points are earned through missions, gaming, social media engagement, and referrals. Start by minting your Origin NFT to unlock the full potential of the platform!",
    primaryButton: "Got it!",
    secondaryButton: "Mint your Origin NFT",
    secondaryAction: "/nft-mint"
  },
  "/nft-mint": {
    id: "nft-mint",
    title: "Create Your Origin NFT 🎨",
    content: "Your Origin NFT is your unique digital identity in IOPn. It serves as your profile picture, can be customized with badges you earn, provides REP multipliers, and may unlock exclusive features. Each wallet can only mint one Origin NFT, so make it count!",
    primaryButton: "Got it!",
    secondaryButton: "After minting, customize it",
    secondaryAction: "/nft-showcase"
  },
  "/nft-showcase": {
    id: "nft-showcase",
    title: "NFT Showcase & Badge Forge 🏆",
    content: "Here you can customize your Origin NFT by adding and removing badges you've earned. Badges show your achievements and can provide REP multipliers. Drag and drop badges anywhere on your NFT to position them perfectly!",
    primaryButton: "Got it!",
    secondaryButton: "Start earning badges through missions",
    secondaryAction: "/missions"
  },
  "/missions": {
    id: "missions",
    title: "Mission Console 🎯",
    content: "Complete missions to earn REP points and badges! There are daily missions (reset every 24h), weekly missions (reset every 7 days), and special limited-time missions. The more missions you complete, the more rewards you'll earn!",
    primaryButton: "Got it!",
    secondaryButton: "Check out the marketplace",
    secondaryAction: "/marketplace"
  },
  "/marketplace": {
    id: "marketplace",
    title: "Badge Marketplace 🛒",
    content: "Buy and sell badges with other players using your REP points! You can also purchase IOPn merchandise. Rare badges can significantly boost your REP earning potential, so invest wisely!",
    primaryButton: "Got it!",
    secondaryButton: "Build your referral network",
    secondaryAction: "/referrals"
  },
  "/referrals": {
    id: "referrals",
    title: "Referral Dashboard 👥",
    content: "Invite friends to join IOPn and earn REP when they complete actions! Share your unique referral code and build your network. The more active referrals you have, the more passive REP you'll earn!",
    primaryButton: "Got it!",
    secondaryButton: "Check out the leaderboard",
    secondaryAction: "/leaderboard"
  },
  "/leaderboard": {
    id: "leaderboard",
    title: "Leaderboard 🏆",
    content: "See how you rank against other players! Compete to be at the top and earn rewards for your achievements. Check back regularly to see your progress!",
    primaryButton: "Got it!",
    secondaryButton: "Back to Dashboard",
    secondaryAction: "/"
  }
}

export function TutorialProvider({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [viewedTutorials, setViewedTutorials] = useState([])
  const [currentTutorial, setCurrentTutorial] = useState(null)

  // Load viewed tutorials from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("iopn-viewed-tutorials")
    if (saved) {
      setViewedTutorials(JSON.parse(saved))
    }
  }, [])

  // Auto-show tutorial on page load if not viewed
  useEffect(() => {
    // Debug logging
    console.log("Current pathname:", pathname)
    console.log("Tutorial exists for this path:", !!tutorials[pathname])
    console.log("Viewed tutorials:", viewedTutorials)
    
    const tutorial = tutorials[pathname]
    if (tutorial && !viewedTutorials.includes(tutorial.id)) {
      // Small delay to let page render first
      const timer = setTimeout(() => {
        setCurrentTutorial(tutorial)
        setIsVisible(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [pathname, viewedTutorials])

  const showTutorial = useCallback(() => {
    console.log("showTutorial called, pathname:", pathname)
    const tutorial = tutorials[pathname]
    console.log("Tutorial found:", tutorial)
    if (tutorial) {
      setCurrentTutorial(tutorial)
      setIsVisible(true)
    }
  }, [pathname])

  const closeTutorial = useCallback(() => {
    if (currentTutorial) {
      // Mark as viewed
      const updated = [...viewedTutorials, currentTutorial.id]
      setViewedTutorials(updated)
      localStorage.setItem("iopn-viewed-tutorials", JSON.stringify(updated))
    }
    
    setIsVisible(false)
    setTimeout(() => setCurrentTutorial(null), 300) // Wait for animation
  }, [currentTutorial, viewedTutorials])

  const handleSecondaryAction = useCallback(() => {
    if (currentTutorial?.secondaryAction) {
      closeTutorial()
      router.push(currentTutorial.secondaryAction)
    }
  }, [currentTutorial, closeTutorial, router])

  const resetTutorials = useCallback(() => {
    setViewedTutorials([])
    localStorage.removeItem("iopn-viewed-tutorials")
  }, [])

  const value = {
    isVisible,
    currentTutorial,
    showTutorial,
    closeTutorial,
    handleSecondaryAction,
    resetTutorials,
  }

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  )
}

export function useTutorial() {
  const context = useContext(TutorialContext)
  if (context === undefined) {
    throw new Error("useTutorial must be used within a TutorialProvider")
  }
  return context
}