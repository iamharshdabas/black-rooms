import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Room, RoomCourseFolders } from "@/server/schema"
import { patchRoom, patchRoomCourseFolder } from "@/server/action/room"

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

export const usePatchRoomCourseFolder = () => {
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
