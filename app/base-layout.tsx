"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

import { Navbar, Sidebar } from "@/components/ui"

type Props = {
  children: ReactNode
}

export default function BaseLayout({ children }: Props) {
  const currentRoute = usePathname()

  const isRoomRoute = /^\/room\/.+/.test(currentRoute)

  return (
    <div className="relative flex h-screen flex-col">
      <Navbar isRoomRoute={isRoomRoute} />
      {isRoomRoute ? (
        <div className="flex flex-grow overflow-hidden">
          <div className="hidden max-w-xs overflow-y-scroll p-6 lg:block">
            <Sidebar />
          </div>
          <div className="flex-grow overflow-y-scroll p-6">{children}</div>
        </div>
      ) : (
        <div className="flex gap-4 p-6">
          <div className="flex-grow">{children}</div>
        </div>
      )}
    </div>
  )
}
