"use server"

import { asc } from "drizzle-orm"

import { db } from "@/server/db"
import { room_categories, room_subcategories } from "@/server/schema"

export async function getRoomCategoriesAction() {
  return await db.query.room_categories.findMany({ orderBy: [asc(room_categories.name)] })
}

export async function getRoomSubCategoriesAction() {
  return await db.query.room_subcategories.findMany({ orderBy: [asc(room_subcategories.name)] })
}
