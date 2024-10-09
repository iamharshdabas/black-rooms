"use client"

import { useAuth } from "@clerk/nextjs"
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete"
import { Button } from "@nextui-org/button"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import { cn } from "@nextui-org/theme"
import { HouseIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Key, ReactNode, useCallback, useEffect, useMemo, useState } from "react"

import { CreateRoomCourse } from "@/components/form/room"
import { LogoIcon } from "@/components/logo"
import { DisplayError, DisplayLoading, DoubleDivider, ThemeSwitch } from "@/components/ui"
import { site, subtitle, url } from "@/config"
import { useQueryRoomById } from "@/hooks/room/query"
import { useQueryUserByClerkId } from "@/hooks/user/query"

const isValidUUID = (uuid: string) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  return regex.test(uuid)
}

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const { userId: clerkId } = useAuth()

  const roomIdFromPath = useMemo(() => {
    const match = pathname.match(/room\/([^/]+)/)
    const rawRoomId = match?.[1] || null

    return isValidUUID(rawRoomId || "") ? rawRoomId : null
  }, [pathname])

  const [selectedRoom, setSelectedRoom] = useState<string | null>(roomIdFromPath)

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
  } = useQueryRoomById(roomIdFromPath ?? "")

  useEffect(() => {
    setSelectedRoom(roomIdFromPath)
  }, [roomIdFromPath])

  const handleSelectionChange = useCallback(
    (key: Key | null) => {
      if (key !== null) {
        const roomId = key as string

        setSelectedRoom(roomId)
        router.push(`/room/${roomId}`)
      }
    },
    [router],
  )

  const roomsAvailable = !(user?.roomMembers.length === 0)
  const coursesAvailable = !(room?.roomCourses.length === 0)
  const isLoading = isUserLoading || isRoomLoading
  const isError = isUserError || isRoomError
  const errorMessage = `${userError?.message ?? ""} ${roomError?.message ?? ""}`

  if (isLoading) return <DisplayLoading />
  if (isError) return <DisplayError error={errorMessage} />

  return (
    <div className="flex h-screen">
      <div className="flex max-w-xs flex-col overflow-y-scroll p-4">
        <div className="flex gap-2 pb-4">
          <LogoIcon width="3em" />
          <h2 className={subtitle()}>{site.name}</h2>
        </div>

        {!roomsAvailable ? (
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

        <div className={cn("flex gap-1 py-2", !roomsAvailable && "flex-col")}>
          <Button fullWidth variant="ghost" onPress={() => router.push(url.room.create)}>
            Create {!roomsAvailable && "your first room"}
          </Button>
          {!roomsAvailable && <DoubleDivider />}
          <Button fullWidth variant="ghost" onPress={() => router.push(url.room.explore)}>
            Join {!roomsAvailable && "your first room"}
          </Button>
        </div>

        <div className="flex-grow">
          {room &&
            (coursesAvailable ? (
              <>
                <div className="flex w-full items-center justify-end">
                  <h2 className={subtitle({ className: "flex-grow" })}>Courses</h2>
                  <CreateRoomCourse isIconOnly roomId={room.id} size="sm" variant="flat" />
                </div>
                <Listbox>
                  {room.roomCourses.map((course) => (
                    <ListboxItem key={course.id} href={`${roomIdFromPath}/${course.id}`}>
                      {course.name}
                    </ListboxItem>
                  ))}
                </Listbox>
              </>
            ) : (
              <CreateRoomCourse roomId={room.id} />
            ))}
        </div>

        <div>
          <ThemeSwitch fullWidth />
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll border-l border-divider p-4">{children}</div>
    </div>
  )
}
