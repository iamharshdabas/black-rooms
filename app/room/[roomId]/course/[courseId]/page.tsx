"use client"

import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import { FolderIcon, TvMinimalPlayIcon } from "lucide-react"
import { Link } from "@nextui-org/link"
import { button } from "@nextui-org/theme"
import { toast } from "sonner"
import { Spinner } from "@nextui-org/spinner"

import { subtitle, url } from "@/config"
import { useGetRoomCourse } from "@/hooks/room"
import { useValidateUrl } from "@/hooks/validate/url"
import { useValidateOwnership } from "@/hooks/validate/ownership"

type Props = {
  params: {
    roomId: string
    courseId: string
  }
}

export default function Page({ params }: Props) {
  const course = useGetRoomCourse(params.courseId)
  const isOwner = useValidateOwnership(params.roomId)

  useValidateUrl(params.roomId, params.courseId)

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
    <div className="flex flex-col gap-4">
      {isOwner && (
        <div>
          <Link className={button({ color: "primary" })} href={url.room.edit(params.roomId)}>
            Edit
          </Link>
        </div>
      )}
      {course.data ? (
        <Accordion variant="bordered">
          {(course.data?.roomCourseFolders).map((folder) => (
            <AccordionItem key={folder.id} startContent={<FolderIcon />} title={folder.name}>
              <Listbox classNames={{ list: "gap-4" }}>
                {folder.roomCourseVideos.map((video) => {
                  return (
                    <ListboxItem
                      key={video.id}
                      classNames={{ title: subtitle(), base: "gap-4" }}
                      href={url.room.video(params.roomId, params.courseId, video.id)}
                      startContent={<TvMinimalPlayIcon />}
                    >
                      {video.name}
                    </ListboxItem>
                  )
                })}
              </Listbox>
            </AccordionItem>
          ))}
        </Accordion>
      ) : null}
    </div>
  )
}
