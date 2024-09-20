import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

const VARCHAR_LENGTH = 255

export const userType = pgEnum("user_types", ["admin", "user"])

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  create_at: timestamp("create_at").defaultNow().notNull(),

  user_type: userType("user_type").default("user").notNull(),

  clerk_id: varchar("clerk_id", { length: VARCHAR_LENGTH }).notNull(),
})

export const rooms = pgTable("rooms", {
  id: uuid("id").primaryKey().notNull(),
  create_at: timestamp("create_at").defaultNow().notNull(),

  name: varchar("name", { length: VARCHAR_LENGTH }).notNull(),
  description: varchar("description", { length: VARCHAR_LENGTH }).notNull(),

  owner_id: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
  category_id: uuid("category_id")
    .references(() => room_categories.id)
    .notNull(),
})

export const room_categories = pgTable("room_categories", {
  id: uuid("id").primaryKey().notNull(),
  create_at: timestamp("create_at").defaultNow().notNull(),

  sub_category: varchar("sub_category", { length: VARCHAR_LENGTH }).notNull(),
  category: varchar("category", { length: VARCHAR_LENGTH }).notNull(),
})
