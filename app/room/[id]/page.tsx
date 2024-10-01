"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Snippet } from "@nextui-org/snippet"

import { getRoomAction } from "@/server/action/room"
import { Room } from "@/server/schema"

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const [room, setRoom] = useState<Room | undefined>()
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getRoomAction(params.id)

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

  console.log(JSON.stringify(room, null, 2))

  if (room?.clerk_id === userId) {
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
