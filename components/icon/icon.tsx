"use client"

import { ReactNode, SVGProps } from "react"

import { useIconTheme } from "@/hooks/icon-theme"

interface Props extends SVGProps<SVGSVGElement> {
  children: ReactNode
}

export function SvgIcon({ children, ...props }: Props) {
  const fill = useIconTheme()

  return (
    <svg
      fill={fill}
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  )
}
