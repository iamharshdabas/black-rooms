"use client"

import { AddRoomCourseFolder } from "@/components/form/room/course"
import { useQueryRoomCourseById } from "@/hooks/room/query"

type Props = {
  params: { courseId: string }
}

export default function Page({ params }: Props) {
  const { data } = useQueryRoomCourseById(params.courseId)

  return (
    <div>
      <AddRoomCourseFolder courseId={params.courseId} />
      <div>
        {data?.roomCourseFolders.map((folder) => (
          <div key={folder.id}>
            <h3>{folder.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
