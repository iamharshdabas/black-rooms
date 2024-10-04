"use server"

import { eq } from "drizzle-orm"

import { getUserbyClerkIdAction } from "./user"

import { db } from "@/server/db"
import { InsertRoom, Room, room_categories, room_subcategories, rooms } from "@/server/schema"

export async function getRoomCategoriesAction() {
  return await db.select().from(room_categories).orderBy(room_categories.name)
}

export async function getRoomSubCategoriesAction() {
  return await db.select().from(room_subcategories).orderBy(room_subcategories.name)
}

export async function getRoombyIdAction(id: string) {
  return await db.select().from(rooms).where(eq(rooms.id, id))
}

export async function getRoombyUserIdAction(userId: string) {
  return await db.select().from(rooms).where(eq(rooms.user_id, userId))
}

export async function getRoombyClerkIdAction(clerkId: string) {
  const user = await getUserbyClerkIdAction(clerkId)

  return await db.select().from(rooms).where(eq(rooms.user_id, user[0].id))
}

export async function createRoomAction({ name, user_id, sub_category_id }: InsertRoom) {
  return await db.insert(rooms).values({ name, user_id, sub_category_id }).returning()
}

export async function updateRoomAction({
  id,
  name,
  description,
  thumbnail,
  sub_category_id,
}: Room) {
  await db
    .update(rooms)
    .set({
      name,
      description,
      thumbnail,
      sub_category_id,
    })
    .where(eq(rooms.id, id))
    .execute()
}
