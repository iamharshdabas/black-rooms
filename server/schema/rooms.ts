import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

import { roomMembers, roomSubCategories, users } from "./index"

export const rooms = pgTable("rooms", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  ownerId: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
  subCategoryId: uuid("sub_category_id")
    .references(() => roomSubCategories.id)
    .notNull(),
  thumbnail: text("thumbnail"),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("create_at").defaultNow().notNull(),
})

export const roomsRelation = relations(rooms, ({ one, many }) => ({
  roomMembers: many(roomMembers),
  users: one(users, {
    fields: [rooms.ownerId],
    references: [users.id],
  }),
  roomSubCategories: one(roomSubCategories, {
    fields: [rooms.subCategoryId],
    references: [roomSubCategories.id],
  }),
}))

export type Room = typeof rooms.$inferSelect
export type RoomInsert = typeof rooms.$inferInsert
