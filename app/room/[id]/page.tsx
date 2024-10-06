"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Snippet } from "@nextui-org/snippet"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

import { DisplayError, DisplayLoading } from "@/components/ui"
import { useQueryRoomByRoomId } from "@/hooks/room/query"
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
  } = useQueryRoomByRoomId(params.id)

  const isLoading = isUserLoading || isRoomLoading
  const isError = isUserError || isRoomError
  const errorMessage = userError?.message + " " + roomError?.message
  const isOwner = useMemo(() => room?.ownerId === user?.id, [room?.ownerId, user?.id])

  if (isLoading) return <DisplayLoading />
  if (isError) return <DisplayError error={errorMessage} />

  return (
    <>
      {isOwner && <Button onPress={() => router.push(`/room/${params.id}/edit`)}>Edit</Button>}
      <Snippet className="sm:hidden" size="sm" symbol="ID" variant="bordered">
        {room?.id}
      </Snippet>
      <Snippet className="hidden sm:inline-flex" symbol="ID" variant="bordered">
        {room?.id}
      </Snippet>
    </>
  )
}
