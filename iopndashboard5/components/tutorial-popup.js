"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTutorial } from "@/hooks/use-tutorial"
import { useTheme } from "next-themes"

export function TutorialPopup() {
  const {
    isVisible,
    currentStep,
    tutorials,
    nextStep,
    previousStep,
    skipTutorial,
  } = useTutorial()
  const { theme } = useTheme()
  const [targetRect, setTargetRect] = useState(null)

  useEffect(() => {
    if (isVisible && tutorials && tutorials[currentStep]) {
      const target = document.querySelector(tutorials[currentStep].target)
      if (target) {
        const rect = target.getBoundingClientRect()
        setTargetRect(rect)
        
        // Scroll to element
        target.scrollIntoView({ behavior: "smooth", block: "center" })
        
        // Add highlight
        target.classList.add("tutorial-highlight")
        
        return () => {
          target.classList.remove("tutorial-highlight")
        }
      }
    }
  }, [isVisible, currentStep, tutorials])

  if (!isVisible || !tutorials || !tutorials[currentStep]) return null

  const progress = ((currentStep + 1) / tutorials.length) * 100
  const currentTutorial = tutorials[currentStep]

  // Calculate popup position
  const getPopupPosition = () => {
    if (!targetRect) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
    
    const popupWidth = 320
    const popupHeight = 200
    const padding = 20
    
    let top = targetRect.bottom + padding
    let left = targetRect.left + targetRect.width / 2 - popupWidth / 2
    
    // Adjust if popup goes off screen
    if (left < padding) left = padding
    if (left + popupWidth > window.innerWidth - padding) {
      left = window.innerWidth - popupWidth - padding
    }
    
    if (top + popupHeight > window.innerHeight - padding) {
      top = targetRect.top - popupHeight - padding
    }
    
    return { top: `${top}px`, left: `${left}px` }
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
        onClick={skipTutorial}
      />
      
      {/* Tutorial Card */}
      <Card 
        className={`fixed z-[70] w-80 ${
          theme === "light" 
            ? "bg-white border-gray-200 shadow-2xl" 
            : "holo-card neon-border"
        }`}
        style={getPopupPosition()}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className={`text-lg ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}>
              {currentTutorial.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={skipTutorial}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
        
        <CardContent>
          <p className={`text-sm ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}>
            {currentTutorial.content}
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={previousStep}
            disabled={currentStep === 0}
            className={theme === "light" ? "" : "text-gray-300 hover:text-white"}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <span className={`text-xs ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}>
            {currentStep + 1} of {tutorials.length}
          </span>
          
          <Button
            size="sm"
            onClick={nextStep}
            className="cyber-button bg-gradient-to-r from-violet-indigo to-bright-aqua hover:from-violet-indigo/90 hover:to-bright-aqua/90 text-white"
          >
            {currentStep === tutorials.length - 1 ? "Finish" : "Next"}
            {currentStep < tutorials.length - 1 && (
              <ChevronRight className="h-4 w-4 ml-1" />
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

// Add these styles to your global CSS
const tutorialStyles = `
  .tutorial-highlight {
    position: relative;
    z-index: 65;
    box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.5);
    animation: tutorial-pulse 2s ease-in-out infinite;
  }
  
  @keyframes tutorial-pulse {
    0%, 100% {
      box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.5);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(0, 255, 255, 0.3);
    }
  }
`