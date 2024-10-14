import { useQuery } from "@tanstack/react-query"

import { getRoom, getRoomCourse, getRoomSubCategories } from "@/server/action/room"

export function useGetRoom(id: string) {
  return useQuery({
    queryKey: ["room", id],
    queryFn: async () => await getRoom(id),
    enabled: !!id,
  })
}

export function useGetRoomSubCategories() {
  return useQuery({
    queryKey: ["roomSubCategories"],
    queryFn: async () => await getRoomSubCategories(),
  })
}

export function useGetRoomCourse(id: string) {
  return useQuery({
    queryKey: ["roomCourse", id],
    queryFn: async () => await getRoomCourse(id),
    enabled: !!id,
  })
}
