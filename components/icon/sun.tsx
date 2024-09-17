"use client"

import { SVGProps } from "react"

import { useIconTheme } from "@/hooks/icon-theme"

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  const fill = useIconTheme()

  return (
    <svg
      height="1.5em"
      viewBox="0 0 24 24"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="7" cy="7" fill={fill} opacity=".5" r="5" />
      <path
        d="M16.286 20C19.442 20 22 17.472 22 14.353c0-2.472-1.607-4.573-3.845-5.338C17.837 6.194 15.415 4 12.476 4C9.32 4 6.762 6.528 6.762 9.647c0 .69.125 1.35.354 1.962a4.4 4.4 0 0 0-.83-.08C3.919 11.53 2 13.426 2 15.765S3.919 20 6.286 20z"
        fill={fill}
      />
    </svg>
  )
}
