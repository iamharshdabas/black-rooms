import { Card } from "@nextui-org/card"
import { ReactNode } from "react"

import { LogoIcon } from "@/components/icon"
import { bgGradient } from "@/config"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <LogoIcon />
      </div>
      <div className={bgGradient()} />
      <Card isBlurred className="w-full max-w-md border border-divider">
        {children}
      </Card>
    </div>
  )
}
