import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  user_id: text("user_id").primaryKey().notNull(),
  createTs: timestamp("create_ts").defaultNow().notNull(),
})
