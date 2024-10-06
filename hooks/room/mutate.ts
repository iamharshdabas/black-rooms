import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { useQueryUserByClerkId } from "../user/query"

import { createRoomAction, createRoomMemberAction, updateRoomAction } from "@/server/action/room"
import { Room } from "@/server/schema"

export type CreateRoom = {
  name: string
  subCategoryId: string
}

export const useMutationCreateRoom = (clerkId: string) => {
  const router = useRouter()
  const { data: user } = useQueryUserByClerkId(clerkId)

  return useMutation({
    mutationFn: async (data: CreateRoom) => {
      if (!user?.id) {
        throw new Error("User ID is not available")
      }
      const room = await createRoomAction({
        name: data.name,
        ownerId: user?.id,
        subCategoryId: data.subCategoryId,
      })

      await createRoomMemberAction({ roomId: room[0].id, userId: user.id })

      return room[0].id
    },

    onSuccess: (id: string) => {
      if (id) {
        router.push(`/room/${id}`)
      }
    },
  })
}

export const useMutationUpdateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Room) => {
      await updateRoomAction(data)

      return data.id
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["room", id] })
    },
  })
}
