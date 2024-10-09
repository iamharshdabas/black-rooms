import { relations } from "drizzle-orm"
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

import { roomMembers } from "../rooms/members/room_members"
import { rooms } from "../rooms/rooms"

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
})

export const usersRelation = relations(users, ({ many }) => ({
  rooms: many(rooms),
  roomMembers: many(roomMembers),
}))

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
