"use server"

import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import { users } from "@/server/schema"

export async function createUser(clerkId: string) {
  return await db.insert(users).values({ clerkId: clerkId }).execute()
}

export async function getUserByClerkId(clerkId: string) {
  return await db.select().from(users).where(eq(users.clerkId, clerkId))
}
