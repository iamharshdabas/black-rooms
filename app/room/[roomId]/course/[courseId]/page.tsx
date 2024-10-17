"use client"

import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
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
    <Accordion variant="bordered">
      {(data?.roomCourseFolders || []).map((folder) => (
        <AccordionItem key={folder.id} startContent={<FolderIcon />} title={folder.name}>
          <Listbox classNames={{ list: "gap-4" }}>
            {folder.roomCourseVideos.map((video) => (
              <ListboxItem
                key={video.id}
                classNames={{ title: subtitle(), base: "gap-4" }}
                startContent={<TvMinimalPlayIcon />}
              >
                {video.name}
              </ListboxItem>
            ))}
          </Listbox>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
