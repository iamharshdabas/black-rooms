"use client"

import { useAuth } from "@clerk/nextjs"
import { Snippet } from "@nextui-org/snippet"
import { useEffect, useState } from "react"

import { getRoomByRoomId } from "@/server/action/room"
import { getUserByClerkId } from "@/server/action/user"
import { Room, User } from "@/server/schema"

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const [room, setRoom] = useState<Room | undefined>()
  const [user, setUser] = useState<User>()
  const { userId: clerkId } = useAuth()

  useEffect(() => {
    async function fetchData() {
      try {
        const room = await getRoomByRoomId(params.id)

        if (clerkId) {
          const user = await getUserByClerkId(clerkId)

          setUser(user[0])
        }

        if (Array.isArray(room)) {
          if (room.length === 0) throw new Error("Room not found")
          setRoom(room[0])
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [params.id])

  if (room?.ownerId === user?.id) {
    return (
      <>
        <div>Owner</div>
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
