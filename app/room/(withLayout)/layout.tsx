"use client"

import { useAuth } from "@clerk/nextjs"
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete"
import { useParams, useRouter } from "next/navigation"
import { Key, ReactNode, useCallback, useEffect, useMemo, useState } from "react"

import { NoRoom } from "@/components/ui"
import { getRoombyClerkIdAction } from "@/server/action/room"
import { Room } from "@/server/schema"

type Props = {
  children: ReactNode
}

// TODO: get room if the user is a member of a room
export default function Layout({ children }: Props) {
  const params = useParams()
  const router = useRouter()
  const { userId } = useAuth()
  const [rooms, setRooms] = useState<Room[]>()
  const [selectedRoom, setSelectedRoom] = useState<string | null>(
    Array.isArray(params.id) ? params.id[0] : params.id,
  )

  useEffect(() => {
    async function getRoom() {
      if (userId) {
        try {
          const res = await getRoombyClerkIdAction(userId)

          setRooms(res)
        } catch (error) {
          console.error("Failed to fetch rooms:", error)
        }
      }
    }

    getRoom()
  }, [userId])

  const handleSelectionChange = useCallback(
    (key: Key | null) => {
      if (key !== null) {
        setSelectedRoom(key as string)
        router.push(`/room/${key}`)
      }
    },
    [router],
  )

  const roomItems = useMemo(
    () =>
      rooms?.map((room) => (
        <AutocompleteItem key={room.id} value={room.id}>
          {room.name}
        </AutocompleteItem>
      )) || [],
    [rooms],
  )

  return (
    <div className="flex h-screen">
      <div className="w-full max-w-xs p-4">
        {rooms?.length !== 0 && rooms ? (
          <Autocomplete selectedKey={selectedRoom} onSelectionChange={handleSelectionChange}>
            {roomItems}
          </Autocomplete>
        ) : (
          <NoRoom compact />
        )}
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  )
}
