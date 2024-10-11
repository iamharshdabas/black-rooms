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
    <div className="relative flex flex-col">
      <Navbar isRoomRoute={isRoomRoute} />
      <div className="flex gap-4 p-6">
        {isRoomRoute ? (
          <>
            <div className="hidden max-w-xs border-r-divider lg:block">
              <Sidebar />
            </div>
            <div className="flex-grow overflow-y-scroll">{children}</div>
          </>
        ) : (
          <div className="flex-grow">{children}</div>
        )}
      </div>
    </div>
  )
}
