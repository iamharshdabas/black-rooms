"use server"

import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import { InsertRoom, rooms } from "@/server/schema"

export async function createRoomAction({ name, clerk_id, sub_category_id }: InsertRoom) {
  return await db.insert(rooms).values({ name, clerk_id, sub_category_id }).returning()
}

export async function updateRoomAction({ id, name, description, thumbnail }: InsertRoom) {
  if (!id) {
    throw new Error("Room ID is required for updating a room.")
  }

  await db.update(rooms).set({ name, description, thumbnail }).where(eq(rooms.id, id)).execute()
}
