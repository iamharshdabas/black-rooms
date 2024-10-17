import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useGetUser } from "../user"

import { url } from "@/config"
import {
  pushRoom,
  pushRoomCourse,
  pushRoomCourseFolder,
  pushRoomCourseFolderVideo,
  pushRoomMember,
} from "@/server/action/room"
import {
  RoomCourseFolderVideosInsert,
  RoomCourseFoldersInsert,
  RoomCoursesInsert,
} from "@/server/schema"

export type CreateRoomData = {
  name: string
  subCategoryId: string
}

export function usePushRoom(clerkId: string) {
  const router = useRouter()
  const user = useGetUser(clerkId)

  return useMutation({
    mutationFn: async (data: CreateRoomData) => {
      if (!user.data?.id) {
        throw new Error("User ID is not available")
      }
      const room = await pushRoom({
        name: data.name,
        ownerId: user.data?.id,
        subCategoryId: data.subCategoryId,
      })

      await pushRoomMember({ roomId: room[0].id, userId: user.data.id })

      return room[0].id
    },
    onSuccess: (id: string) => {
      if (id) {
        router.push(url.room.room(id))
        toast.success("Room created")
      }
    },
    onError: (error) => toast.error(error.message),
  })
}

export function usePushRoomCourse() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCoursesInsert) => {
      const roomCourse = await pushRoomCourse(data)

      return {
        roomId: data.roomId,
        courseId: roomCourse[0].id,
      }
    },
    onSuccess: ({ roomId, courseId }: { roomId: string; courseId: string }) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", courseId] })
      router.push(url.room.course(roomId, courseId))
      toast.success("Course created")
    },
    onError: (error) => toast.error(error.message),
  })
}

export function usePushRoomCourseFolder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCourseFoldersInsert) => {
      await pushRoomCourseFolder(data)

      return data.courseId
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", id] })
      toast.success("Folder created")
    },
    onError: (error) => toast.error(error.message),
  })
}

export function usePushRoomCourseFolderVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCourseFolderVideosInsert & { courseId: string }) => {
      await pushRoomCourseFolderVideo(data)

      return data.courseId
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", id] })
      toast.success("Video created")
    },
    onError: (error) => toast.error(error.message),
  })
}
