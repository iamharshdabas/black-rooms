"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Image } from "@nextui-org/image"
import { Input } from "@nextui-org/input"
import { Spacer } from "@nextui-org/spacer"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { RoomCategory } from "@/components/form/room"
import { title } from "@/config"
import { getRoombyIdAction, updateRoomAction } from "@/server/action/room"
import { Room } from "@/server/schema"

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const { userId: clerkId } = useAuth()
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
        const res = await getRoombyIdAction(params.id)

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

  if (room?.user_id !== clerkId) {
    return (
      <div className="text-center">
        <h1 className={title({ className: "text-danger" })}>You are not the owner of the room</h1>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4">
        <div className="flex flex-grow flex-col items-center gap-4">
          <Image
            alt="Room Thumbnail"
            src={room?.thumbnail || "https://via.placeholder.com/1000x500"}
          />
          <Input
            errorMessage={errors.thumbnail?.message}
            isInvalid={!!errors.thumbnail}
            label="Thumbnail"
            {...register("thumbnail")}
          />
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
        </div>
        <div>
          <RoomCategory selected={subcategory} setSelected={handleSetSelected} />
          <Spacer y={4} />
          <Button fullWidth color="primary" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}
