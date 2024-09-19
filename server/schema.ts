import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  create_at: timestamp("create_at").defaultNow().notNull(),
  clerk_id: text("clerk_id").notNull(),
})
