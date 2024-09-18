import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  user_id: text("user_id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  createTs: timestamp("create_ts").defaultNow().notNull(),
  clerk_id: text("clerk_id").notNull(),
})
