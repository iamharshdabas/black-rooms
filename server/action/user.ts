"use server"

import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import { users } from "@/server/schema"

export async function createUserAction(clerkId: string) {
  return await db.insert(users).values({ clerkId: clerkId }).execute()
}

export async function getUserByClerkIdAction(clerkId: string) {
  return await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
    with: {
      roomMembers: {
        with: {
          rooms: true,
        },
      },
    },
  })
}
