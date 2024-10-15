import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { deleteRoomCourseFolder, deleteRoomCourseFolderVideo } from "@/server/action/room"

export function useDeleteRoomCourseFolder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, courseId }: { id: string; courseId: string }) => {
      await deleteRoomCourseFolder(id)

      return courseId
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", id] })
      toast.success("Folder deleted")
    },
    onError: (error) => toast.error(error.message),
  })
}

export function useDeleteRoomCourseFolderVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, courseId }: { id: string; courseId: string }) => {
      await deleteRoomCourseFolderVideo(id)

      return courseId
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", id] })
      toast.success("Video deleted")
    },
    onError: (error) => toast.error(error.message),
  })
}
