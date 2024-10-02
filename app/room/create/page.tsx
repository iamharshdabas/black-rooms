"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Spacer } from "@nextui-org/spacer"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { useForm } from "react-hook-form"

import { RoomCategory } from "@/components/form/room"
import { Home2Icon } from "@/components/icon"
import { FeatureCard } from "@/components/ui"
import { createRoomFeatures } from "@/config"
import { createRoomAction } from "@/server/action/room"

interface CreateRoomForm {
  roomName: string
  selected: string
}

export default function Page() {
  const { userId } = useAuth()
  const router = useRouter()
  const { register, handleSubmit, setValue, watch } = useForm<CreateRoomForm>({
    defaultValues: {
      roomName: "",
      selected: undefined,
    },
  })

  const selected = watch("selected")

  function onSubmit(data: CreateRoomForm) {
    async function create() {
      if (userId === null || userId === undefined) throw new Error("Auth is not loaded")
      const room = await createRoomAction({
        name: data.roomName,
        clerk_id: userId,
        sub_category_id: data.selected,
      })

      if (room) {
        router.push(`/room/${room[0].id}`)
      }
    }

    create()
  }

  const handleSetSelected = useCallback(
    (subcategory: string) => setValue("selected", subcategory),
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
