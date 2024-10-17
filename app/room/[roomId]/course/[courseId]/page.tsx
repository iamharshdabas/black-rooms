"use client"

import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import { FolderIcon, TvMinimalPlayIcon } from "lucide-react"
import { toast } from "sonner"
import { Spinner } from "@nextui-org/spinner"

import { subtitle, url } from "@/config"
import { useGetRoomCourse } from "@/hooks/room"

type Props = {
  params: {
    courseId: string
  }
}

export default function Page({ params }: Props) {
  const { data, isError, error } = useGetRoomCourse(params.courseId)

  if (isError) toast.error(error.message)
  if (!data) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <Accordion variant="bordered">
      {(data?.roomCourseFolders).map((folder) => (
        <AccordionItem key={folder.id} startContent={<FolderIcon />} title={folder.name}>
          <Listbox classNames={{ list: "gap-4" }}>
            {folder.roomCourseVideos.map((video) => {
              return (
                <ListboxItem
                  key={video.id}
                  classNames={{ title: subtitle(), base: "gap-4" }}
                  href={url.room.video(data.roomId, data.id, video.id)}
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
  )
}
