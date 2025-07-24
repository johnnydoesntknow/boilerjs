"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }) {
  useEffect(() => {
    // Add theme class to body for smooth transitions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target
          if (target.classList.contains("light")) {
            document.body.classList.add("light-mode")
            document.body.classList.remove("dark-mode")
          } else {
            document.body.classList.add("dark-mode")
            document.body.classList.remove("light-mode")
          }
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}