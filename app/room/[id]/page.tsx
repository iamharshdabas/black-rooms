"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/chip"
import { Image } from "@nextui-org/image"
import { Snippet } from "@nextui-org/snippet"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

import { Editor } from "@/components/form/room"
import { DisplayError, DisplayLoading } from "@/components/ui"
import { title } from "@/config"
import { useQueryRoomById } from "@/hooks/room/query"
import { useQueryUserByClerkId } from "@/hooks/user/query"

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const router = useRouter()
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
  } = useQueryRoomById(params.id)

  const isLoading = isUserLoading || isRoomLoading
  const isError = isUserError || isRoomError
  const errorMessage = `${userError?.message ?? ""} ${roomError?.message ?? ""}`
  const isOwner = useMemo(() => room?.ownerId === user?.id, [room?.ownerId, user?.id])

  if (isLoading) return <DisplayLoading />
  if (isError) return <DisplayError error={errorMessage} />

  return (
    <div className="flex flex-col gap-4">
      {room?.thumbnail && (
        <div className="flex justify-center">
          <Image isZoomed src={room?.thumbnail} width={1024} />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {isOwner && (
          <Button color="primary" onPress={() => router.push(`/room/${params.id}/edit`)}>
            Edit
          </Button>
        )}
        <Snippet className="sm:hidden" size="sm" symbol="ID" variant="bordered">
          {room?.id}
        </Snippet>
        <Snippet className="hidden sm:inline-flex" symbol="ID" variant="bordered">
          {room?.id}
        </Snippet>
        <Chip className="py-6" radius="md" size="lg" variant="bordered">
          <span className="font-medium uppercase">{room?.roomSubCategories.name}</span>
          <span className="pl-2 font-light">{room?.roomSubCategories.description}</span>
        </Chip>
      </div>

      <h1 className={title()}>{room?.name}</h1>
      {room?.description && <Editor content={room?.description} />}
    </div>
  )
}
