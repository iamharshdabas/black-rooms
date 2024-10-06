"use client"

import { useAuth } from "@clerk/nextjs"
import { Snippet } from "@nextui-org/snippet"
import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation"

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

  if (isUserLoading || isRoomLoading) {
    return <DisplayLoading />
  }

  if (isUserError || isRoomError) {
    return <DisplayError error={userError?.message + " " + roomError?.message} />
  }

  if (room?.ownerId === user?.id) {
    return (
      <>
        <Button onPress={() => router.push(`/room/${params.id}/edit`)}>Edit</Button>
        <Snippet className="sm:hidden" size="sm" symbol="ID" variant="bordered">
          {room?.id}
        </Snippet>
        <Snippet className="hidden sm:inline-flex" symbol="ID" variant="bordered">
          {room?.id}
        </Snippet>
      </>
    )
  }

  return (
    <>
      <Snippet className="sm:hidden" size="sm" symbol="ID" variant="bordered">
        {room?.id}
      </Snippet>
      <Snippet className="hidden sm:inline-flex" symbol="ID" variant="bordered">
        {room?.id}
      </Snippet>
    </>
  )
}
