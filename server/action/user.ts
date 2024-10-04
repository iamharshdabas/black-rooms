"use server"

import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import { users } from "@/server/schema"

export async function createUserAction(clerkId: string) {
  return await db.insert(users).values({ clerk_id: clerkId }).execute()
}

export async function getUserbyClerkIdAction(clerkId: string) {
  return await db.select().from(users).where(eq(users.clerk_id, clerkId))
}
