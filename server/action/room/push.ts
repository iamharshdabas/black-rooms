"use server"

import { db } from "@/server/db"
import {
  RoomCourseFoldersInsert,
  RoomCourseVideosInsert,
  RoomCoursesInsert,
  RoomInsert,
  roomCourseFolders,
  roomCourseVideos,
  roomCourses,
  roomMembers,
  rooms,
} from "@/server/schema"

export async function pushRoom({ name, ownerId, subCategoryId }: RoomInsert) {
  return await db.insert(rooms).values({ name, ownerId, subCategoryId }).returning({ id: rooms.id })
}

export async function pushRoomMember({ roomId, userId }: { roomId: string; userId: string }) {
  await db.insert(roomMembers).values({ roomId, userId }).execute()
}

export async function pushRoomCourse({ roomId, name }: RoomCoursesInsert) {
  return await db.insert(roomCourses).values({ roomId, name }).returning({ id: roomCourses.id })
}

export async function pushRoomCourseFolder({ courseId, name, order }: RoomCourseFoldersInsert) {
  await db.insert(roomCourseFolders).values({ courseId, name, order }).execute()
}

export async function pushRoomCourseFolderVideo({
  folderId,
  name,
  url,
  order,
}: RoomCourseVideosInsert) {
  await db.insert(roomCourseVideos).values({ folderId, name, url, order }).execute()
}
