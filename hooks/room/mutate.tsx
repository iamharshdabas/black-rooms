import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { useQueryUserByClerkId } from "../user/query"

import { createRoomAction } from "@/server/action/room"

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

      return room[0].id
    },

    onSuccess: (id: string) => {
      if (id) {
        router.push(`/room/${id}`)
      }
    },
  })
}
