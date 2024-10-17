import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"

import { useGetUser } from "../user"
import { useGetRoom } from "../room"

export function useValidateOwnership(roomId: string) {
  const { userId: clerkId } = useAuth()

  const user = useGetUser(clerkId!)

  const room = useGetRoom(roomId)

  if (!user.isLoading && user.isError) {
    toast.error(user.error?.message ?? "User not found")

    return { isOwner: false, isLoading: false }
  }

  if (!room.isLoading && room.isError) {
    toast.error(room.error?.message ?? "Room not found")

    return { isOwner: false, isLoading: false }
  }

  if (user.isLoading || room.isLoading) {
    return { isOwner: undefined, isLoading: true }
  }

  if (user.data?.id === undefined || room.data?.ownerId === undefined) {
    return { isOwner: undefined, isLoading: true }
  }

  return { isOwner: room.data.ownerId === user.data.id, isLoading: false }
}
