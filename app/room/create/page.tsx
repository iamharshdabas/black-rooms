"use client"

import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useState } from "react"
import { Spacer } from "@nextui-org/spacer"

import { RoomCategory } from "@/components/form/room"
import FeatureCard from "@/components/ui/feature"
import { createRoomFeatures } from "@/config"
import { RoomSubcategory } from "@/server/schema"

// PERF: i dont know why react hook form isn't working in this one.
export default function Page() {
  const [selected, setSelected] = useState<RoomSubcategory>()

  return (
    <div className="flex w-full flex-col gap-16 lg:flex-row">
      <div className="flex w-full flex-col items-center">
        <FeatureCard transparent feature={createRoomFeatures} />
        <Spacer y={16} />
        <div className="w-full max-w-md space-y-2">
          <Input />
          <p>
            Selected room category <span className="font-bold text-success">{selected?.name}</span>
          </p>
          <p className="lg:hidden">You can select room category from below.</p>
          <Button fullWidth color="primary">
            Create
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-center lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <RoomCategory selected={selected} setSelected={setSelected} />
      </div>
    </div>
  )
}
