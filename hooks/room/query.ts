import { useQuery } from "@tanstack/react-query"

import { getRoomByRoomIdAction, getRoomSubCategoriesAction } from "@/server/action/room"

export function useQueryRoomByRoomId(id: string) {
  return useQuery({
    queryKey: ["room", id],
    queryFn: async () => await getRoomByRoomIdAction(id),
  })
}

export function useQueryRoomSubCategories() {
  return useQuery({
    queryKey: ["roomSubCategories"],
    queryFn: async () => await getRoomSubCategoriesAction(),
  })
}
