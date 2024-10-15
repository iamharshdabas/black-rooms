"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Image } from "@nextui-org/image"
import { Input } from "@nextui-org/input"
import { Spacer } from "@nextui-org/spacer"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"

import { Editor, RoomCategory } from "@/components/form/room"
import { title, url } from "@/config"
import { useGetRoom, usePatchRoom } from "@/hooks/room"
import { useGetUser } from "@/hooks/user"
import { Room } from "@/server/schema"
import { processUrl } from "@/utils/url"

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const router = useRouter()
  const { userId: clerkId } = useAuth()
  const { data: user } = useGetUser(clerkId!)
  const { data: room } = useGetRoom(params.id)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Room>({ defaultValues: room })
  const { mutate, isPending } = usePatchRoom()

  const subcategory = watch("subCategoryId")
  const description = watch("description") || ""
  const isOwner = useMemo(() => room?.ownerId === user?.id, [room?.ownerId, user?.id])

  const onSubmit = (data: Room) => {
    if (data.thumbnail) data.thumbnail = processUrl(data.thumbnail) || null
    mutate(data)
  }
  const handleSetSelected = useCallback(
    (subcategory: string) => setValue("subCategoryId", subcategory),
    [setValue],
  )
  const handleSetDescription = useCallback(
    (description: string) => setValue("description", description),
    [setValue],
  )

  if (!isOwner) {
    return (
      <div className="text-center">
        <h1 className={title({ className: "text-danger" })}>You are not the owner of the room</h1>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-around gap-4">
        <div className="flex flex-col items-center gap-4">
          <Image
            isZoomed
            alt="Room Thumbnail"
            src={room?.thumbnail || "https://via.placeholder.com/800x400"}
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
            disabled={isPending}
            isLoading={isPending}
            type="submit"
          >
            Submit
          </Button>
          <Spacer y={2} />
          <Button fullWidth onPress={() => router.push(url.room.room(params.id))}>
            Back
          </Button>
        </div>
      </div>
    </form>
  )
}
