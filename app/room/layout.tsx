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

export default function Layout({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const { userId: clerkId } = useAuth()
  const roomIdFromPath = useMemo(() => pathname.match(/room\/([^/]+)/)?.[1] || null, [pathname])
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

  if (isLoading) return <DisplayLoading />
  if (isError) return <DisplayError error={error.message} />

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-xs p-4">
        {user?.roomMembers ? (
          <Autocomplete
            label="Select room"
            selectedKey={selectedRoom}
            onSelectionChange={handleSelectionChange}
          >
            {user.roomMembers.map(({ rooms }) => (
              <AutocompleteItem key={rooms.id} value={rooms.id}>
                {rooms.name}
              </AutocompleteItem>
            ))}
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
