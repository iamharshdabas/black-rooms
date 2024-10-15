"use server"

import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import { Room, RoomCourseFolders, roomCourseFolders, rooms } from "@/server/schema"

export async function patchRoom({ id, name, description, thumbnail, subCategoryId }: Room) {
  await db
    .update(rooms)
    .set({ name, description, thumbnail, subCategoryId })
    .where(eq(rooms.id, id))
    .execute()
}

export async function patchRoomCourseFolder(folder: RoomCourseFolders) {
  await db
    .update(roomCourseFolders)
    .set(folder)
    .where(eq(roomCourseFolders.id, folder.id))
    .execute()
}
