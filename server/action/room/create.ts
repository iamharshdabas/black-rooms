"use server"

import { db } from "@/server/db"
import { InsertRoom, rooms } from "@/server/schema"

export async function createRoomAction({ name, clerk_id, sub_category_id }: InsertRoom) {
  return await db.insert(rooms).values({ name, clerk_id, sub_category_id }).returning()
}
