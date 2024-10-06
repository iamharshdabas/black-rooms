"use client"

import { useAuth } from "@clerk/nextjs"
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete"
import { Divider } from "@nextui-org/divider"
import { usePathname, useRouter } from "next/navigation"
import { Key, ReactNode, useCallback, useEffect, useMemo, useState } from "react"

import { DisplayError, DisplayLoading, NoRoom } from "@/components/ui"
import { useQueryUserByClerkId } from "@/hooks/user/query"

type Props = {
  children: ReactNode
}

// TODO: get room if the user is a member of a room
export default function Layout({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const { userId: clerkId } = useAuth()

  // Extract room ID using a regular expression
  // this will also extract 'create' and 'explore'
  // due to 'room/create' and 'room/explore' paths
  const roomIdFromPath = pathname.match(/room\/([^/]+)/)?.[1] || null

  const [selectedRoom, setSelectedRoom] = useState<string | null>(roomIdFromPath)
  const { data: user, isLoading, isError, error } = useQueryUserByClerkId(clerkId!)

  useEffect(() => {
    setSelectedRoom(roomIdFromPath)
  }, [roomIdFromPath])

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
      user?.rooms?.map((room) => (
        <AutocompleteItem key={room.id} value={room.id}>
          {room.name}
        </AutocompleteItem>
      )) || [],
    [user],
  )

  if (isLoading) {
    return <DisplayLoading />
  }

  if (isError) {
    return <DisplayError error={error.message} />
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-xs p-4">
        {user?.rooms ? (
          <Autocomplete
            label="Select room"
            selectedKey={selectedRoom}
            onSelectionChange={handleSelectionChange}
          >
            {roomItems}
          </Autocomplete>
        ) : (
          <NoRoom compact />
        )}
      </div>
      <Divider orientation="vertical" />
      <div className="flex-grow p-4">{children}</div>
    </div>
  )
}
