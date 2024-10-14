"use client"

import { Spacer } from "@nextui-org/spacer"
import { FolderIcon, PencilIcon, TrashIcon } from "lucide-react"
import { Button } from "@nextui-org/button"

import { AddRoomCourseFolder } from "@/components/form/room/course"
import { useQueryRoomCourseById } from "@/hooks/room/query"
import { subtitle } from "@/config"

type Props = {
  params: { courseId: string }
}

export default function Page({ params }: Props) {
  const { data } = useQueryRoomCourseById(params.courseId)

  return (
    <div>
      <AddRoomCourseFolder courseId={params.courseId} />
      <Spacer y={4} />
      <div>
        {data?.roomCourseFolders.map((folder) => (
          <div key={folder.id} className="flex items-center gap-4">
            <div className="flex flex-grow items-center gap-2 rounded-2xl bg-content1 px-4 py-2">
              <FolderIcon />
              <Spacer x={1} />
              <h2 className={subtitle({ className: "flex-grow" })}>{folder.name}</h2>
              <Button isIconOnly color="primary" variant="light">
                <PencilIcon />
              </Button>
              <Button isIconOnly color="danger" variant="light">
                <TrashIcon />
              </Button>
            </div>
            <Button>Add Video</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
