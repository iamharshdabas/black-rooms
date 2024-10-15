"use server"

import { db } from "@/server/db"
import {
  RoomCourseFolderVideosInsert,
  RoomCourseFoldersInsert,
  RoomCoursesInsert,
  RoomInsert,
  RoomMemberInsert,
  roomCourseFolderVideos,
  roomCourseFolders,
  roomCourses,
  roomMembers,
  rooms,
} from "@/server/schema"

export async function pushRoom(Room: RoomInsert) {
  return await db.insert(rooms).values(Room).returning({ id: rooms.id })
}

export async function pushRoomMember(roomMember: RoomMemberInsert) {
  await db.insert(roomMembers).values(roomMember).execute()
}

export async function pushRoomCourse(roomCourse: RoomCoursesInsert) {
  return await db.insert(roomCourses).values(roomCourse).returning({ id: roomCourses.id })
}

export async function pushRoomCourseFolder(roomCourseFolder: RoomCourseFoldersInsert) {
  await db.insert(roomCourseFolders).values(roomCourseFolder).execute()
}

export async function pushRoomCourseFolderVideo(
  roomCourseFolderVideo: RoomCourseFolderVideosInsert,
) {
  await db.insert(roomCourseFolderVideos).values(roomCourseFolderVideo).execute()
}
