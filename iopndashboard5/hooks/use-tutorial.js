"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

const TutorialContext = createContext(undefined)

const tutorials = {
  dashboard: [
    {
      target: ".rep-progress",
      title: "REP Progress",
      content: "Track your reputation points here. Earn REP through missions, gaming, and social tasks!",
    },
    {
      target: ".quick-actions",
      title: "Quick Actions",
      content: "Access all main features quickly from here.",
    },
    {
      target: ".social-tasks",
      title: "Social Tasks",
      content: "Complete social media tasks to earn easy REP points!",
    },
  ],
  "nft-mint": [
    {
      target: ".nft-preview",
      title: "NFT Preview",
      content: "See your NFT preview here. Add a referral code to get bonus rewards!",
    },
    {
      target: ".mint-button",
      title: "Mint Your NFT",
      content: "Click here to mint your unique Origin NFT.",
    },
  ],
  marketplace: [
    {
      target: ".badge-grid",
      title: "Badge Collection",
      content: "Browse and purchase badges using your REP points.",
    },
    {
      target: ".filter-buttons",
      title: "Filter Badges",
      content: "Filter badges by rarity or category.",
    },
  ],
}

export function TutorialProvider({ children }) {
  const [currentTutorial, setCurrentTutorial] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [completedTutorials, setCompletedTutorials] = useState([])
  const [isCycleCompleted, setIsCycleCompleted] = useState(false)

  useEffect(() => {
    // Load completed tutorials from localStorage
    const saved = localStorage.getItem("iopn-completed-tutorials")
    const cycleCompleted = localStorage.getItem("iopn-tutorial-cycle-completed")
    if (saved) {
      setCompletedTutorials(JSON.parse(saved))
    }
    if (cycleCompleted === "true") {
      setIsCycleCompleted(true)
    }
  }, [])

  const showTutorial = useCallback((tutorialId) => {
    // Don't show if tutorial already completed
    if (completedTutorials.includes(tutorialId)) {
      return
    }
    
    const tutorial = tutorials[tutorialId]
    if (tutorial) {
      setCurrentTutorial(tutorialId)
      setCurrentStep(0)
      setIsVisible(true)
    }
  }, [completedTutorials])

  const nextStep = useCallback(() => {
    const tutorial = tutorials[currentTutorial]
    if (tutorial && currentStep < tutorial.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTutorial()
    }
  }, [currentTutorial, currentStep])

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const completeTutorial = useCallback(() => {
    if (currentTutorial) {
      const updated = [...completedTutorials, currentTutorial]
      setCompletedTutorials(updated)
      localStorage.setItem("iopn-completed-tutorials", JSON.stringify(updated))
      
      // Check if all tutorials are completed
      const allTutorialIds = Object.keys(tutorials)
      const allCompleted = allTutorialIds.every(id => updated.includes(id))
      
      if (allCompleted && !isCycleCompleted) {
        setIsCycleCompleted(true)
        localStorage.setItem("iopn-tutorial-cycle-completed", "true")
      }
    }
    
    setIsVisible(false)
    setCurrentTutorial(null)
    setCurrentStep(0)
  }, [currentTutorial, completedTutorials, isCycleCompleted])

  const skipTutorial = useCallback(() => {
    completeTutorial()
  }, [completeTutorial])

  const resetTutorials = useCallback(() => {
    setCompletedTutorials([])
    setIsCycleCompleted(false)
    localStorage.removeItem("iopn-completed-tutorials")
    localStorage.removeItem("iopn-tutorial-cycle-completed")
  }, [])

  const value = {
    currentTutorial,
    currentStep,
    isVisible,
    completedTutorials,
    isCycleCompleted,
    showTutorial,
    nextStep,
    previousStep,
    skipTutorial,
    resetTutorials,
    tutorials: currentTutorial ? tutorials[currentTutorial] : null,
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