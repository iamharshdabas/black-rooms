"use client"

import { Button } from "@nextui-org/button"
import { useEffect } from "react"

import { title } from "@/config/primitives"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    /* eslint-disable no-console */
    console.error(error)
  }, [error])

  return (
    <div>
      <h1 className={title()}>Something went wrong!</h1>
      <Button variant="bordered" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
