"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { title } from "@/config"
import { getRoomAction, updateRoomAction } from "@/server/action/room"
import { Room } from "@/server/schema"
import { RoomCategory } from "@/components/form/room"

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const { userId } = useAuth()
  const [room, setRoom] = useState<Room | undefined>()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<Room>()

  const subcategory = watch("sub_category_id")

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getRoomAction(params.id)

        if (Array.isArray(res)) {
          if (res.length === 0) throw new Error("Room not found")
          setRoom(res[0])
          reset(res[0])
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [params.id, reset])

  const handleSetSelected = useCallback(
    (subcategory: string) => setValue("sub_category_id", subcategory),
    [setValue],
  )

  async function onSubmit(data: Room) {
    try {
      await updateRoomAction(data)
    } catch (err) {
      console.error(err)
    }
  }

  if (room?.clerk_id !== userId) {
    return (
      <div className="text-center">
        <h1 className={title({ className: "text-danger" })}>You are not the owner of the room</h1>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-grow">
        {room?.thumbnail && <Image fill alt="Room Thumbnail" src={room.thumbnail} />}
      </div>
      <RoomCategory selected={subcategory} setSelected={handleSetSelected} />
      <div className="flex flex-grow flex-col gap-4">
        <Input
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          label="Name"
          {...register("name")}
        />
        <Input
          errorMessage={errors.thumbnail?.message}
          isInvalid={!!errors.thumbnail}
          label="Thumbnail"
          {...register("thumbnail")}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
