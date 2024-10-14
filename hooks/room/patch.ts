import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Room } from "@/server/schema"
import { patchRoom } from "@/server/action/room"

export const usePatchRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Room) => {
      await patchRoom(data)

      return data.id
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["room", id] })
    },
  })
}
