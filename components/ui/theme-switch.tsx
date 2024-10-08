"use client"

import { Button, ButtonProps } from "@nextui-org/button"
import { useIsSSR } from "@react-aria/ssr"
import { MoonStarIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export const ThemeSwitch = ({ ...props }: ButtonProps) => {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()
  const isDark = theme === "dark"

  const onChange = () => {
    isDark ? setTheme("light") : setTheme("dark")
  }

  if (isSSR) return null

  return (
    <Button variant="ghost" onPress={onChange} {...props}>
      {isDark ? <MoonStarIcon /> : <SunIcon />}
    </Button>
  )
}
