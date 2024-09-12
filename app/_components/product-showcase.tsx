"use client"

import { Image } from "@nextui-org/image"
import { useTheme } from "next-themes"
import NextImage from "next/image"

import ShineBorder from "@/components/ui/shine-border"

export default function ProductShowcase() {
  const { theme } = useTheme()

  return (
    <ShineBorder borderRadius={24} borderWidth={2} color={theme === "light" ? "black" : "white"}>
      <Image
        as={NextImage}
        className="z-0 hidden dark:block"
        height="984"
        src="/hero-dark.png"
        width="1280"
      />
      <Image
        as={NextImage}
        className="dark:hidden"
        height="984"
        src="/hero-light.png"
        width="1280"
      />
    </ShineBorder>
  )
}
