"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Image } from "@nextui-org/image"
import { Input } from "@nextui-org/input"
import { Spacer } from "@nextui-org/spacer"
import { useCallback } from "react"
import { useForm } from "react-hook-form"

import { RoomCategory } from "@/components/form/room"
import { DisplayError, DisplayLoading } from "@/components/ui"
import { title } from "@/config"
import { useQueryRoomByRoomId } from "@/hooks/room/query"
import { useQueryUserByClerkId } from "@/hooks/user/query"
import { updateRoomAction } from "@/server/action/room"
import { Room } from "@/server/schema"

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const { userId: clerkId } = useAuth()
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQueryUserByClerkId(clerkId!)
  const {
    data: room,
    isLoading: isRoomLoading,
    isError: isRoomError,
    error: roomError,
  } = useQueryRoomByRoomId(params.id)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Room>({ defaultValues: room })

  const subcategory = watch("subCategoryId")

  const handleSetSelected = useCallback(
    (subcategory: string) => setValue("subCategoryId", subcategory),
    [setValue],
  )

  // TODO: use mutation
  async function onSubmit(data: Room) {
    try {
      await updateRoomAction(data)
    } catch (err) {
      console.error(err)
    }
  }

  if (isUserLoading || isRoomLoading) {
    return <DisplayLoading />
  }

  if (isUserError || isRoomError) {
    return <DisplayError error={userError?.message + " " + roomError?.message} />
  }

  if (room?.ownerId !== user?.id) {
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
            src={room?.thumbnail || "https://via.placeholder.com/800x400"}
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
