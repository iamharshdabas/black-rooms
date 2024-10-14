import { relations } from "drizzle-orm"
import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

import { roomCourseFolders } from "./room_course_folders"

export const roomCourseFolderVideos = pgTable("room_course_videos", {
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

export const roomCourseVideosRelation = relations(roomCourseFolderVideos, ({ one }) => ({
  roomCourseFolders: one(roomCourseFolders, {
    fields: [roomCourseFolderVideos.folderId],
    references: [roomCourseFolders.id],
  }),
}))

export type RoomCourseFolderVideos = typeof roomCourseFolderVideos.$inferSelect
export type RoomCourseFolderVideosInsert = typeof roomCourseFolderVideos.$inferInsert
