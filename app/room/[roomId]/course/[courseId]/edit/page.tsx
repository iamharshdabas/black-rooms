"use client"

import { Link } from "@nextui-org/link"
import { Spacer } from "@nextui-org/spacer"
import { Spinner } from "@nextui-org/spinner"
import { button } from "@nextui-org/theme"
import { FolderIcon, PencilIcon, TvMinimalPlayIcon } from "lucide-react"
import { toast } from "sonner"

import {
  DeleteRoomCourseFolder,
  DeleteRoomCourseFolderVideo,
  PatchRoomCourseFolder,
  PushRoomCourseFolder,
  PushRoomCourseFolderVideo,
} from "@/components/form/room/course"
import { subtitle, url } from "@/config"
import { useGetRoomCourse } from "@/hooks/room"

type Props = {
  params: {
    roomId: string
    courseId: string
  }
}

export default function Page({ params }: Props) {
  const course = useGetRoomCourse(params.courseId)

  if (course.isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!course.isLoading && course.isError) {
    toast.error(course.error?.message ?? "An error occurred")

    return null
  }

  return (
    <div>
      <PushRoomCourseFolder courseId={params.courseId} />
      <Spacer y={4} />
      <div className="flex flex-col gap-4">
        {course.data?.roomCourseFolders.map((folder) => (
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
                <Link
                  className={button({ isIconOnly: true, color: "primary", variant: "light" })}
                  href={url.room.course.video.edit(params.roomId, params.courseId, video.id)}
                >
                  <PencilIcon />
                </Link>
                <DeleteRoomCourseFolderVideo courseId={folder.courseId} video={video} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
