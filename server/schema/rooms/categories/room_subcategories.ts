import { relations } from "drizzle-orm"
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"

import { rooms } from "../rooms"

import { roomCategories } from "./room_categories"

export const roomSubCategories = pgTable("room_subcategories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  categoryId: uuid("category_id")
    .references(() => roomCategories.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
})

export const roomSubCategoriesRelation = relations(roomSubCategories, ({ one, many }) => ({
  rooms: many(rooms),
  roomCategories: one(roomCategories, {
    fields: [roomSubCategories.categoryId],
    references: [roomCategories.id],
  }),
}))

export type RoomSubCategory = typeof roomSubCategories.$inferSelect
export type RoomSubCategoryInsert = typeof roomSubCategories.$inferInsert
