"use server"

import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import { InsertRoom, Room, room_categories, room_subcategories, rooms } from "@/server/schema"

export async function getRoomCategoriesAction() {
  return await db.select().from(room_categories).orderBy(room_categories.name)
}

export async function getRoomSubCategoriesAction() {
  return await db.select().from(room_subcategories).orderBy(room_subcategories.name)
}

export async function getRoomAction(id: string) {
  return await db.select().from(rooms).where(eq(rooms.id, id))
}

export async function createRoomAction({ name, clerk_id, sub_category_id }: InsertRoom) {
  return await db.insert(rooms).values({ name, clerk_id, sub_category_id }).returning()
}

export async function updateRoomAction({ id, name, description, thumbnail }: Room) {
  return await db
    .update(rooms)
    .set({ name, description, thumbnail })
    .where(eq(rooms.id, id))
    .execute()
}
