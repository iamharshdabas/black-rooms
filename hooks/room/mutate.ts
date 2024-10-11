import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { useQueryUserByClerkId } from "../user/query"

import { url } from "@/config"
import {
  createRoomAction,
  createRoomCourseAction,
  createRoomCourseFolderAction,
  createRoomCourseFolderVideoAction,
  createRoomMemberAction,
  updateRoomAction,
} from "@/server/action/room"
import {
  Room,
  RoomCourseFoldersInsert,
  RoomCourseVideosInsert,
  RoomCoursesInsert,
} from "@/server/schema"

export type CreateRoomData = {
  name: string
  subCategoryId: string
}

export type RoomCourseData = {
  roomId: string
  courseId: string
}

export const useMutationCreateRoom = (clerkId: string) => {
  const router = useRouter()
  const { data: user } = useQueryUserByClerkId(clerkId)

  return useMutation({
    mutationFn: async (data: CreateRoomData) => {
      if (!user?.id) {
        throw new Error("User ID is not available")
      }
      const room = await createRoomAction({
        name: data.name,
        ownerId: user?.id,
        subCategoryId: data.subCategoryId,
      })

      await createRoomMemberAction({ roomId: room[0].id, userId: user.id })

      return room[0].id
    },

    onSuccess: (id: string) => {
      if (id) {
        router.push(url.room.room(id))
      }
    },
  })
}

export const useMutationUpdateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Room) => {
      await updateRoomAction(data)

      return data.id
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["room", id] })
    },
  })
}

export const useMutationCreateRoomCourse = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCoursesInsert) => {
      const roomCourse = await createRoomCourseAction(data)

      return {
        roomId: data.roomId,
        courseId: roomCourse[0].id,
      }
    },
    onSuccess: ({ roomId, courseId }: RoomCourseData) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", courseId] })
      if (roomId && courseId) {
        router.push(url.room.course(roomId, courseId))
      }
    },
  })
}

export const useMutationCreateRoomCourseFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCourseFoldersInsert) => {
      await createRoomCourseFolderAction(data)

      return data.courseId
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", id] })
    },
  })
}

export const useMutationCreateRoomCourseFolderVideo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoomCourseVideosInsert & { courseId: string }) => {
      await createRoomCourseFolderVideoAction(data)

      return data.courseId
    },
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ["roomCourse", id] })
    },
  })
}
