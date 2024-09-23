"use server"

import { db } from "@/server/db"

export async function getRoomCategories() {
  return await db.query.room_subcategories.findMany({
    with: {
      category: true,
    },
  })
}
