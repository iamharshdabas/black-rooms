"use client"

import { useState } from "react"

import { RoomCategory } from "@/components/form/room"

// PERF: i dont know why react hook form isn't working in this one.
// TODO: react query

export default function Page() {
  const [selected, setSelected] = useState("")

  return (
    <div className="flex flex-col items-center gap-4">
      <RoomCategory selected={selected} setSelected={setSelected} />
    </div>
  )
}
