"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { title } from "@/config"
import { getRoomAction, updateRoomAction } from "@/server/action/room"
import { Room } from "@/server/schema"

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
    reset,
    formState: { errors },
  } = useForm<Room>()

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
    <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
      {room?.thumbnail && (
        <Image alt="Room Thumbnail" height={300} src={room.thumbnail} width={500} />
      )}
      <div className="flex flex-grow flex-col gap-4">
        <Input
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          label="Name"
          {...register("name")}
        />
        <Input
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          label="Description"
          {...register("description")}
        />
        <Input
          errorMessage={errors.thumbnail?.message}
          isInvalid={!!errors.thumbnail}
          label="Thumbnail"
          {...register("thumbnail")}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
