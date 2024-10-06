import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

import { rooms } from "./rooms"
import { roomMembers } from "./room-members"

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
