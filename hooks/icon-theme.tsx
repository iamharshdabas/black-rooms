"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useIconTheme() {
  const { theme } = useTheme()
  const [fill, setFill] = useState("#000000")

  useEffect(() => {
    setFill(theme === "dark" ? "#ffffff" : "#000000")
  }, [theme])

  return fill
}
