"use client"

import { SVGProps } from "react"

import { useIconTheme } from "@/hooks/icon-theme"

export function UsersIcon(props: SVGProps<SVGSVGElement>) {
  const fill = useIconTheme()

  return (
    <svg
      height="1.5em"
      viewBox="0 0 24 24"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0" fill={fill} />
      <path
        d="M19.5 7.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-15 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0"
        fill={fill}
        opacity=".5"
      />
      <path
        d="M18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5"
        fill={fill}
      />
      <path
        d="M22 16.5c0 1.38-1.79 2.5-4 2.5s-4-1.12-4-2.5s1.79-2.5 4-2.5s4 1.12 4 2.5m-20 0C2 17.88 3.79 19 6 19s4-1.12 4-2.5S8.21 14 6 14s-4 1.12-4 2.5"
        fill={fill}
        opacity=".5"
      />
    </svg>
  )
}
