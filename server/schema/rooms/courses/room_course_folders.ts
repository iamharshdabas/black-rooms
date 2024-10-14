import { relations } from "drizzle-orm"
import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

import { roomCourseFolderVideos } from "./room_course_videos"
import { roomCourses } from "./room_courses"

export const roomCourseFolders = pgTable("room_course_folders", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => roomCourses.id),
  name: varchar("name", { length: 255 }).notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const roomCourseFoldersRelation = relations(roomCourseFolders, ({ one, many }) => ({
  roomCourses: one(roomCourses, {
    fields: [roomCourseFolders.courseId],
    references: [roomCourses.id],
  }),
  roomCourseVideos: many(roomCourseFolderVideos),
}))

export type RoomCourseFolders = typeof roomCourseFolders.$inferSelect
export type RoomCourseFoldersInsert = typeof roomCourseFolders.$inferInsert
