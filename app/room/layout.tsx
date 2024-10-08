"use client"

import { useAuth } from "@clerk/nextjs"
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete"
import { Button } from "@nextui-org/button"
import { cn } from "@nextui-org/theme"
import { HouseIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Key, ReactNode, useCallback, useEffect, useMemo, useState } from "react"

import { LogoIcon } from "@/components/logo"
import { DisplayError, DisplayLoading, DoubleDivider, ThemeSwitch } from "@/components/ui"
import { site, subtitle, url } from "@/config"
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
    <div className="flex h-screen">
      <div className="flex max-w-xs flex-col overflow-y-scroll p-4">
        <div className="flex gap-2 pb-4">
          <LogoIcon width="3em" />
          <h2 className={subtitle()}>{site.name}</h2>
        </div>
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
              startContent={<HouseIcon />}
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
          <Button fullWidth variant="ghost" onPress={() => router.push(url.room.create)}>
            Create {noRooms && "your first room"}
          </Button>
          {noRooms && <DoubleDivider />}
          <Button fullWidth variant="ghost" onPress={() => router.push(url.room.explore)}>
            Join {noRooms && "your first room"}
          </Button>
        </div>
        <div className="flex-grow" />
        <div>
          <ThemeSwitch fullWidth />
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll border-l border-divider p-4">{children}</div>
    </div>
  )
}
