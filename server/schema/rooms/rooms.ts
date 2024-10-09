import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

import { users } from "../users/users"

import { roomSubCategories } from "./categories/room_subcategories"
import { roomCourses } from "./courses/room_courses"
import { roomMembers } from "./members/room_members"

export const rooms = pgTable("rooms", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  ownerId: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
  subCategoryId: uuid("subcategory_id")
    .references(() => roomSubCategories.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  createdAt: timestamp("create_at").defaultNow().notNull(),
})

export const roomsRelation = relations(rooms, ({ one, many }) => ({
  roomMembers: many(roomMembers),
  roomCourses: many(roomCourses),
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
