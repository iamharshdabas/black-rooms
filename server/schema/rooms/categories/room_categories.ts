import { relations } from "drizzle-orm"
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"

import { roomSubCategories } from "./room_subcategories"

export const roomCategories = pgTable("room_categories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
})

export const roomCategoriesRelation = relations(roomCategories, ({ many }) => ({
  roomSubCategories: many(roomSubCategories),
}))

export type RoomCategory = typeof roomCategories.$inferSelect
export type RoomCategoryInsert = typeof roomCategories.$inferInsert
