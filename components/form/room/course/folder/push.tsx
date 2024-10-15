"use client"

import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useForm } from "react-hook-form"
import { FolderIcon } from "lucide-react"

import { usePushRoomCourseFolder } from "@/hooks/room"
import { RoomCourseFoldersInsert } from "@/server/schema"

type Props = {
  courseId: string
}

export function PushRoomCourseFolder({ courseId }: Props) {
  const { mutate, isPending } = usePushRoomCourseFolder()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCourseFoldersInsert>({ defaultValues: { courseId, order: 0 } })

  function onSubmit(data: RoomCourseFoldersInsert) {
    mutate(data, {
      onSuccess: () => reset(),
    })
  }

  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        endContent={<FolderIcon />}
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        label="Folder Name"
        {...register("name", { required: true })}
      />
      <Button disabled={isPending} isLoading={isPending} type="submit">
        Add Folder
      </Button>
    </form>
  )
}
