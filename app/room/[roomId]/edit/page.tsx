"use client"

import { Button } from "@nextui-org/button"
import { Image } from "@nextui-org/image"
import { Input } from "@nextui-org/input"
import { Spacer } from "@nextui-org/spacer"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Spinner } from "@nextui-org/spinner"

import { Editor, RoomCategory } from "@/components/form/room"
import { url } from "@/config"
import { useGetRoom, usePatchRoom } from "@/hooks/room"
import { Room } from "@/server/schema"
import { processUrl } from "@/utils/url"
import { useValidateOwnership } from "@/hooks/validate/ownership"

type Props = {
  params: {
    roomId: string
  }
}

export default function Page({ params }: Props) {
  const router = useRouter()
  const room = useGetRoom(params.roomId)
  const owner = useValidateOwnership(params.roomId)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Room>({ defaultValues: room.data })
  const patchRoom = usePatchRoom()

  const subcategory = watch("subCategoryId")
  const description = watch("description") || ""

  const onSubmit = (data: Room) => {
    if (data.thumbnail) data.thumbnail = processUrl(data.thumbnail) || null
    patchRoom.mutate(data)
  }
  const handleSetSelected = useCallback(
    (subcategory: string) => setValue("subCategoryId", subcategory),
    [setValue],
  )
  const handleSetDescription = useCallback(
    (description: string) => setValue("description", description),
    [setValue],
  )

  useEffect(() => {
    if (room.data) {
      reset(room.data)
    }
  }, [room.data, reset])

  if (room.isLoading || owner.isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!room.isLoading && room.isError) {
    toast.error(room.error?.message ?? "An error occurred")

    return null
  }

  if (!owner.isOwner && !owner.isLoading) {
    toast.error("You are not the owner of the room")
    router.push(url.room.room(params.roomId))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-around gap-4">
        <div className="flex flex-col items-center gap-4">
          <Image
            isZoomed
            alt="Room Thumbnail"
            src={room.data?.thumbnail || "https://via.placeholder.com/800x400"}
            width={1024}
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
          <Editor content={description} onChange={handleSetDescription} />
        </div>
        <div className="w-full max-w-sm">
          <RoomCategory selected={subcategory} setSelected={handleSetSelected} />
          <Spacer y={4} />
          <Button
            fullWidth
            color="primary"
            disabled={patchRoom.isPending}
            isLoading={patchRoom.isPending}
            type="submit"
          >
            Submit
          </Button>
          <Spacer y={2} />
          <Button fullWidth onPress={() => router.push(url.room.room(params.roomId))}>
            Back
          </Button>
        </div>
      </div>
    </form>
  )
}
