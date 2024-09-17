import { Card } from "@nextui-org/card"
import { ReactNode } from "react"

import { LogoIcon } from "@/components/icon/logo"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <LogoIcon />
      </div>
      <div className="absolute top-0 h-1/2 w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-divider to-background to-[60%]" />
      <Card isBlurred className="w-full max-w-md">
        {children}
      </Card>
    </div>
  )
}
