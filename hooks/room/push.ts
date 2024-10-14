import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

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
  RoomCourseFoldersInsert,
  RoomCourseFolderVideosInsert,
  RoomCoursesInsert,
} from "@/server/schema"

export type CreateRoomData = {
  name: string
  subCategoryId: string
}

export const usePushRoom = (clerkId: string) => {
  const router = useRouter()
  const { data: user } = useGetUser(clerkId)

  return useMutation({
    mutationFn: async (data: CreateRoomData) => {
      if (!user?.id) {
        throw new Error("User ID is not available")
      }
      const room = await pushRoom({
        name: data.name,
        ownerId: user?.id,
        subCategoryId: data.subCategoryId,
      })

      await pushRoomMember({ roomId: room[0].id, userId: user.id })

      return room[0].id
    },

    onSuccess: (id: string) => {
      if (id) {
        router.push(url.room.room(id))
      }
    },
  })
}

export const usePushRoomCourse = () => {
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
      if (roomId && courseId) {
        router.push(url.room.course(roomId, courseId))
      }
    },
  })
}

export const usePushRoomCourseFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCourseFoldersInsert) => {
      await pushRoomCourseFolder(data)

      return data.courseId
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", id] })
    },
  })
}

export const usePushRoomCourseFolderVideo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCourseFolderVideosInsert & { courseId: string }) => {
      await pushRoomCourseFolderVideo(data)

      return data.courseId
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", id] })
    },
  })
}
