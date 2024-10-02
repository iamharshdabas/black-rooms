"use server"

import { db } from "@/server/db"
import { users } from "@/server/schema"

export async function createUserAction(userId: string) {
  return await db.insert(users).values({ clerk_id: userId }).execute()
}
