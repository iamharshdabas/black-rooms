"use server"

import { eq } from "drizzle-orm"

import { Room, RoomInsert, roomCategories, roomSubCategories, rooms } from "../schema"

import { db } from "@/server/db"

export async function createRoom({ name, ownerId, subCategoryId }: RoomInsert) {
  return await db.insert(rooms).values({ name, ownerId, subCategoryId }).returning()
}

export async function updateRoomAction({ id, name, description, thumbnail, subCategoryId }: Room) {
  await db
    .update(rooms)
    .set({ name, description, thumbnail, subCategoryId })
    .where(eq(rooms.id, id))
    .execute()
}

export async function getRoomCategories() {
  return await db.select().from(roomCategories).orderBy(roomCategories.name)
}

export async function getRoomSubCategories() {
  return await db.select().from(roomSubCategories).orderBy(roomSubCategories.name)
}

export async function getRoomByRoomId(id: string) {
  return await db.select().from(rooms).where(eq(rooms.id, id))
}

export async function getRoomByOwnerId(userId: string) {
  return await db.select().from(rooms).where(eq(rooms.ownerId, userId))
}
