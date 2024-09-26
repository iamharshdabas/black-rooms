"use client"

import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useForm } from "react-hook-form"
import { Spacer } from "@nextui-org/spacer"
import { useCallback } from "react"

import { RoomCategory } from "@/components/form/room"
import FeatureCard from "@/components/ui/feature"
import { createRoomFeatures } from "@/config"
import { RoomSubcategory } from "@/server/schema"
import { Home2Icon } from "@/components/icon"

interface CreateRoomForm {
  roomName: string
  selected: RoomSubcategory
}

export default function Page() {
  const { register, handleSubmit, setValue, watch } = useForm<CreateRoomForm>({
    defaultValues: {
      roomName: "",
      selected: undefined,
    },
  })

  const selected = watch("selected")

  function onSubmit(data: CreateRoomForm) {
    console.log(data.roomName, data.selected)
  }

  const handleSetSelected = useCallback(
    (subcategory: RoomSubcategory) => setValue("selected", subcategory),
    [setValue],
  )

  return (
    <form className="flex w-full flex-col gap-16 lg:flex-row" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-center">
        <FeatureCard feature={createRoomFeatures} />
        <Spacer y={8} />
        <div className="w-full max-w-md space-y-2">
          <Input
            {...register("roomName", { required: true })}
            isRequired
            endContent={<Home2Icon />}
            label="Room name"
            labelPlacement="outside"
          />
          <p>
            Selected room category{" "}
            <span className="font-bold text-success">{selected?.name || "None"}</span>
          </p>
          <p className="lg:hidden">You can select room category from below.</p>
          <Button fullWidth color="primary" type="submit">
            Create
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-center lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <RoomCategory selected={selected} setSelected={handleSetSelected} />
      </div>
    </form>
  )
}
