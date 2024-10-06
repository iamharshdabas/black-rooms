import { Spinner } from "@nextui-org/spinner"

import { subtitle } from "@/config"

export function DisplayLoading() {
  return (
    <div className="flex size-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

type ErrorProps = {
  error: string
}

export function DisplayError({ error }: ErrorProps) {
  return <h2 className={subtitle({ className: "text-danger" })}>{error}</h2>
}
