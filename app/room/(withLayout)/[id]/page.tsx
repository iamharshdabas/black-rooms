"use client"

import { useAuth } from "@clerk/nextjs"
import { Snippet } from "@nextui-org/snippet"
import { useEffect, useState } from "react"

import { getRoombyIdAction } from "@/server/action/room"
import { Room } from "@/server/schema"

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const [room, setRoom] = useState<Room | undefined>()
  const { userId: clerkId } = useAuth()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getRoombyIdAction(params.id)

        if (Array.isArray(res)) {
          if (res.length === 0) throw new Error("Room not found")
          setRoom(res[0])
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [params.id])

  if (room?.user_id === clerkId) {
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
