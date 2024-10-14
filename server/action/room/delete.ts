"use server"

import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import { roomCourseFolders, roomCourseFolderVideos } from "@/server/schema"

export async function deleteRoomCourseFolder(id: string) {
  await db.delete(roomCourseFolders).where(eq(roomCourseFolders.id, id))
}

export async function deleteRoomCourseFolderVideo(id: string) {
  await db.delete(roomCourseFolderVideos).where(eq(roomCourseFolderVideos.id, id))
}
