import { neon } from "@neondatabase/serverless"
import { loadEnvConfig } from "@next/env"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

loadEnvConfig(process.cwd())

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL missing")
}

const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql, { schema })
