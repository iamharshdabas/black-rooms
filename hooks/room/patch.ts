import { useMutation, useQueryClient } from "@tanstack/react-query"

import { patchRoom, patchRoomCourseFolder } from "@/server/action/room"
import { Room, RoomCourseFolders } from "@/server/schema"

export function usePatchRoom() {
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

export function usePatchRoomCourseFolder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCourseFolders) => {
      await patchRoomCourseFolder(data)

      return data.courseId
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", id] })
    },
  })
}
