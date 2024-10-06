"use client"

import { useAuth } from "@clerk/nextjs"
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete"
import { cn } from "@nextui-org/theme"
import { usePathname, useRouter } from "next/navigation"
import { Key, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "@nextui-org/button"

import { AddIcon, Home2Icon, Login3Icon } from "@/components/icon"
import { DisplayError, DisplayLoading, DoubleDivider } from "@/components/ui"
import { subtitle, url } from "@/config"
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

  const noRooms = user?.roomMembers.length === 0

  if (isLoading) return <DisplayLoading />
  if (isError) return <DisplayError error={error.message} />

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-xs p-4">
        {noRooms ? (
          <h2 className={subtitle({ className: "lg:text-lg" })}>
            Looks like you don&apos;t have any room
          </h2>
        ) : (
          user && (
            <Autocomplete
              label="Select room"
              labelPlacement="outside"
              selectedKey={selectedRoom}
              size="lg"
              startContent={<Home2Icon />}
              variant="bordered"
              onSelectionChange={handleSelectionChange}
            >
              {user.roomMembers.map(({ rooms }) => (
                <AutocompleteItem key={rooms.id} value={rooms.id}>
                  {rooms.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          )
        )}
        <div className={cn("flex gap-1 py-2", noRooms && "flex-col")}>
          <Button
            fullWidth
            startContent={<AddIcon />}
            variant="ghost"
            onPress={() => router.push(url.room.create)}
          >
            Create {noRooms && "your first room"}
          </Button>
          {noRooms && <DoubleDivider />}
          <Button
            fullWidth
            startContent={<Login3Icon />}
            variant="ghost"
            onPress={() => router.push(url.room.explore)}
          >
            Join {noRooms && "your first room"}
          </Button>
        </div>
      </div>
      <div className="flex-grow border-l border-divider p-4">{children}</div>
    </div>
  )
}
