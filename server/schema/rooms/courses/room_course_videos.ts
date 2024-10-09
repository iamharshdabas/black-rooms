import { relations } from "drizzle-orm"
import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

import { roomCourseFolders } from "./room_course_folders"

export const roomCourseVideos = pgTable("room_course_videos", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  folderId: uuid("folder_id")
    .references(() => roomCourseFolders.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  url: text("url").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const roomCourseVideosRelation = relations(roomCourseVideos, ({ one }) => ({
  roomCourseFolders: one(roomCourseFolders, {
    fields: [roomCourseVideos.folderId],
    references: [roomCourseFolders.id],
  }),
}))

export type RoomCourseVideos = typeof roomCourseVideos.$inferSelect
export type RoomCourseVideosInsert = typeof roomCourseVideos.$inferInsert
