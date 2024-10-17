"use client"

import { Spacer } from "@nextui-org/spacer"
import { FolderIcon, TvMinimalPlayIcon } from "lucide-react"

import { subtitle } from "@/config"
import { useGetRoomCourse } from "@/hooks/room"

type Props = {
  params: {
    courseId: string
  }
}

export default function Page({ params }: Props) {
  const { data } = useGetRoomCourse(params.courseId)

  return (
    <div className="flex flex-col gap-4">
      {data?.roomCourseFolders.map((folder) => (
        <div key={folder.id} className="flex flex-col gap-4">
          <div className="flex flex-grow items-center gap-2 rounded-2xl bg-content1 p-4">
            <FolderIcon />
            <Spacer x={1} />
            <h2 className={subtitle({ className: "flex-grow" })}>{folder.name}</h2>
          </div>
          {folder.roomCourseVideos.map((video) => (
            <div key={video.id} className="flex flex-grow items-center gap-2 rounded-2xl p-4">
              <TvMinimalPlayIcon />
              <Spacer x={1} />
              <h2 className={subtitle({ className: "flex-grow" })}>{video.name}</h2>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
