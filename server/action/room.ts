"use server"

import { eq } from "drizzle-orm"

import { Room, RoomInsert, roomSubCategories, rooms } from "../schema"

import { db } from "@/server/db"

export async function createRoomAction({ name, ownerId, subCategoryId }: RoomInsert) {
  return await db.insert(rooms).values({ name, ownerId, subCategoryId }).returning({ id: rooms.id })
}

export async function updateRoomAction({ id, name, description, thumbnail, subCategoryId }: Room) {
  await db
    .update(rooms)
    .set({ name, description, thumbnail, subCategoryId })
    .where(eq(rooms.id, id))
    .execute()
}

export async function getRoomSubCategoriesAction() {
  return await db.query.roomSubCategories.findMany({
    orderBy: roomSubCategories.name,
    with: { roomCategories: true },
  })
}

export async function getRoomByRoomIdAction(id: string) {
  return await db.query.rooms.findFirst({
    where: eq(rooms.id, id),
    with: {
      users: true,
      roomSubCategories: true,
    },
  })
}
