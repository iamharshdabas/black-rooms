"use client"

import { Button } from "@nextui-org/button"
import { Spacer } from "@nextui-org/spacer"
import { FolderIcon, PencilIcon, TvMinimalPlayIcon } from "lucide-react"

import {
  DeleteRoomCourseFolder,
  DeleteRoomCourseFolderVideo,
  PatchRoomCourseFolder,
  PushRoomCourseFolder,
  PushRoomCourseFolderVideo,
} from "@/components/form/room/course"
import { subtitle } from "@/config"
import { useGetRoomCourse } from "@/hooks/room"

type Props = {
  params: { courseId: string }
}

export default function Page({ params }: Props) {
  const { data } = useGetRoomCourse(params.courseId)

  return (
    <div>
      <PushRoomCourseFolder courseId={params.courseId} />
      <Spacer y={4} />
      <div className="flex flex-col gap-4">
        {data?.roomCourseFolders.map((folder) => (
          <div key={folder.id}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-grow items-center gap-2 rounded-2xl bg-content1 px-4 py-2">
                <FolderIcon />
                <Spacer x={1} />
                <h2 className={subtitle({ className: "flex-grow" })}>{folder.name}</h2>
                <PatchRoomCourseFolder folder={folder} />
                <DeleteRoomCourseFolder folder={folder} />
              </div>
              <PushRoomCourseFolderVideo folder={folder} />
            </div>
            {folder.roomCourseVideos.map((video) => (
              <div
                key={video.id}
                className="flex flex-grow items-center gap-2 rounded-2xl px-4 py-2"
              >
                <TvMinimalPlayIcon />
                <Spacer x={1} />
                <h2 className={subtitle({ className: "flex-grow" })}>{video.name}</h2>
                <Button isIconOnly color="primary" variant="light">
                  <PencilIcon />
                </Button>
                <DeleteRoomCourseFolderVideo courseId={folder.courseId} video={video} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
