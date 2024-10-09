"use server"

import { eq } from "drizzle-orm"

import { db } from "@/server/db"
import { roomCourses, roomSubCategories, rooms } from "@/server/schema"

export async function getRoomSubCategoriesAction() {
  return await db.query.roomSubCategories.findMany({
    orderBy: roomSubCategories.name,
    with: { roomCategories: true },
  })
}

export async function getRoomByIdAction(id: string) {
  return await db.query.rooms.findFirst({
    where: eq(rooms.id, id),
    with: {
      users: true,
      roomSubCategories: true,
      roomCourses: true,
    },
  })
}

export async function getRoomCourseByIdAction(id: string) {
  return await db.query.roomCourses.findFirst({
    orderBy: roomCourses.name,
    where: eq(roomCourses.id, id),
    with: {
      roomCourseFolders: {
        with: {
          roomCourseVideos: true,
        },
      },
    },
  })
}
