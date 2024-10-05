import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

import { rooms, users } from "./index"

export const roomMembers = pgTable(
  "room_members",
  {
    roomId: uuid("room_id")
      .references(() => rooms.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.roomId],
    }),
  }),
)

export const roomMembersRelation = relations(roomMembers, ({ one }) => ({
  rooms: one(rooms, {
    fields: [roomMembers.roomId],
    references: [rooms.id],
  }),
  users: one(users, {
    fields: [roomMembers.userId],
    references: [users.id],
  }),
}))

export type RoomMember = typeof roomMembers.$inferSelect
export type RoomMemberInsert = typeof roomMembers.$inferInsert
