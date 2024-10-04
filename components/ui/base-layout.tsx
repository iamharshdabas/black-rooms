import { ReactNode } from "react"

import { Navbar } from "./navbar"

type Props = {
  children: ReactNode
}

export function BaseLayout({ children }: Props) {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="relative flex h-screen flex-col">
        <Navbar />
        <main className="grow px-8 py-16">{children}</main>
      </div>
    </div>
  )
}
