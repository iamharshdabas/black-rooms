import { useQuery } from "@tanstack/react-query"

import {
  getRoomByIdAction,
  getRoomCourseByIdAction,
  getRoomSubCategoriesAction,
} from "@/server/action/room"

export function useQueryRoomById(id: string) {
  return useQuery({
    queryKey: ["room", id],
    queryFn: async () => await getRoomByIdAction(id),
    enabled: !!id,
  })
}

export function useQueryRoomSubCategories() {
  return useQuery({
    queryKey: ["roomSubCategories"],
    queryFn: async () => await getRoomSubCategoriesAction(),
  })
}

export function useQueryRoomCourseById(id: string) {
  return useQuery({
    queryKey: ["roomCourse", id],
    queryFn: async () => await getRoomCourseByIdAction(id),
    enabled: !!id,
  })
}
