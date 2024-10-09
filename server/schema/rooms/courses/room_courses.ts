import { relations } from "drizzle-orm"
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"

import { rooms } from "../rooms"

import { roomCourseFolders } from "./room_course_folders"

export const roomCourses = pgTable("room_courses", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  roomId: uuid("room_id")
    .references(() => rooms.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
})

export const roomCoursesRelation = relations(roomCourses, ({ one, many }) => ({
  rooms: one(rooms, {
    fields: [roomCourses.roomId],
    references: [rooms.id],
  }),
  roomCourseFolders: many(roomCourseFolders),
}))

export type RoomCourses = typeof roomCourses.$inferSelect
export type RoomCoursesInsert = typeof roomCourses.$inferInsert
