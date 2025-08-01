"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTutorial } from "@/hooks/use-tutorial"
import { useTheme } from "next-themes"

export function TutorialButton({ pageId }) {
  const { showTutorial, completedTutorials } = useTutorial()
  const { theme } = useTheme()
  
  const isCompleted = completedTutorials.includes(pageId)
  
  const handleClick = () => {
    showTutorial(pageId)
  }
  
  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="icon"
      className={`fixed bottom-6 right-6 z-50 rounded-full ${
        theme === "light"
          ? "bg-white border-gray-300 hover:bg-gray-100"
          : "bg-black/80 border-bright-aqua/50 hover:bg-bright-aqua/10"
      } ${!isCompleted ? "animate-pulse" : ""}`}
      title="Show tutorial"
    >
      <HelpCircle className={`h-5 w-5 ${
        theme === "light" ? "text-gray-600" : "text-bright-aqua"
      }`} />
    </Button>
  )
}