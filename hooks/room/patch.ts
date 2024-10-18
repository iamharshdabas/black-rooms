import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { patchRoom, patchRoomCourseFolder, patchRoomCourseFolderVideo } from "@/server/action/room"
import { Room, RoomCourseFolderVideos, RoomCourseFolders } from "@/server/schema"

export function usePatchRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Room) => {
      await patchRoom(data)

      return data.id
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["room", id] })
      toast.success("Room updated")
    },
    onError: (error) => {
      toast.error(error.message)
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
      toast.success("Folder updated")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export function usePatchRoomCourseFolderVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCourseFolderVideos) => {
      await patchRoomCourseFolderVideo(data)

      return data.id
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourseVideo", id] })
      toast.success("Video updated")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
