import { toast } from "sonner"

import { useGetRoom, useGetRoomCourse } from "../room"

export function useValidateUrl(roomId: string, courseId: string, videoId?: string) {
  const room = useGetRoom(roomId)
  const course = useGetRoomCourse(courseId)

  if (!room.isLoading && room.isError) {
    toast.error(room.error?.message ?? "Room not found")

    return null
  }

  if (!course.isLoading && course.isError) {
    toast.error(course.error?.message ?? "Course not found")

    return null
  }

  if (!room.isLoading && !course.isLoading && room.data?.id !== course.data?.roomId) {
    toast.error("This course is not in this room")

    return null
  }

  const videoExistsInCourse = course.data?.roomCourseFolders.some((folder) =>
    folder.roomCourseVideos.some((video) => video.id === videoId),
  )

  if (videoId && !videoExistsInCourse) {
    toast.error("This video is not in this course")

    return null
  }
}
