"use client"

import { Chip } from "@nextui-org/chip"
import { Image } from "@nextui-org/image"
import { Snippet } from "@nextui-org/snippet"
import { Link } from "@nextui-org/link"
import { button } from "@nextui-org/theme"
import { Spinner } from "@nextui-org/spinner"
import { toast } from "sonner"

import { Editor } from "@/components/form/room"
import { title, url } from "@/config"
import { useGetRoom } from "@/hooks/room"
import { useValidateOwnership } from "@/hooks/validate/ownership"

type Props = {
  params: {
    roomId: string
  }
}

export default function Page({ params }: Props) {
  const room = useGetRoom(params.roomId)
  const isOwner = useValidateOwnership(params.roomId)

  if (room.isLoading) {
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

  return (
    <div className="flex flex-col gap-4">
      {room.data?.thumbnail && (
        <div className="flex justify-center">
          <Image isZoomed src={room.data?.thumbnail} width={1024} />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {isOwner && (
          <Link className={button({ color: "primary" })} href={url.room.edit(params.roomId)}>
            Edit
          </Link>
        )}
        <Snippet className="sm:hidden" size="sm" symbol="ID" variant="bordered">
          {room.data?.id}
        </Snippet>
        <Snippet className="hidden sm:inline-flex" symbol="ID" variant="bordered">
          {room.data?.id}
        </Snippet>
        <Chip className="py-6" radius="md" size="lg" variant="bordered">
          <span className="font-medium uppercase">{room.data?.roomSubCategories.name}</span>
          <span className="pl-2 font-light">{room.data?.roomSubCategories.description}</span>
        </Chip>
      </div>

      <h1 className={title()}>{room.data?.name}</h1>
      {room.data?.description && <Editor content={room.data?.description} />}
    </div>
  )
}
