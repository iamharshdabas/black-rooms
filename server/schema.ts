import { relations } from "drizzle-orm"
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

const VARCHAR_LENGTH = 255

export const userType = pgEnum("user_types", ["admin", "user"])

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  create_at: timestamp("create_at").defaultNow().notNull(),
  user_type: userType("user_type").default("user").notNull(),
  clerk_id: varchar("clerk_id", { length: VARCHAR_LENGTH }).notNull(),
})

export const room_categories = pgTable("room_categories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  create_at: timestamp("create_at").defaultNow().notNull(),
  name: varchar("name", { length: VARCHAR_LENGTH }).notNull(),
})

export const room_categoriesRelations = relations(room_categories, ({ many }) => ({
  subcategories: many(room_subcategories),
}))

export const room_subcategories = pgTable("room_subcategories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  create_at: timestamp("create_at").defaultNow().notNull(),
  name: varchar("name", { length: VARCHAR_LENGTH }).notNull(),
  description: varchar("description", { length: VARCHAR_LENGTH }).notNull(),
  category_id: uuid("category_id")
    .references(() => room_categories.id)
    .notNull(),
})

export const room_subcategoriesRelations = relations(room_subcategories, ({ one }) => ({
  category: one(room_categories, {
    fields: [room_subcategories.category_id],
    references: [room_categories.id],
  }),
}))

export const rooms = pgTable("rooms", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  create_at: timestamp("create_at").defaultNow().notNull(),
  name: varchar("name", { length: VARCHAR_LENGTH }).notNull(),
  description: varchar("description", { length: VARCHAR_LENGTH }).notNull(),
  owner_id: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
  sub_category_id: uuid("sub_category_id")
    .references(() => room_subcategories.id)
    .notNull(),
})

export type User = typeof users.$inferSelect
export type RoomSubcategory = typeof room_subcategories.$inferSelect
export type RoomCategory = typeof room_categories.$inferSelect
export type Room = typeof rooms.$inferSelect

export type InsertUser = typeof users.$inferInsert
export type InsertRoomSubcategory = typeof room_subcategories.$inferInsert
export type InsertRoomCategory = typeof room_categories.$inferInsert
export type InsertRoom = typeof rooms.$inferInsert
