"use client"

import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useForm } from "react-hook-form"

import { DisplayError } from "@/components/ui"
import { usePushRoomCourseFolder } from "@/hooks/room"
import { RoomCourseFoldersInsert } from "@/server/schema"

type Props = {
  courseId: string
}

export function PushRoomCourseFolder({ courseId }: Props) {
  const { mutate, isPending, isError, error } = usePushRoomCourseFolder()
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

  if (isError) return <DisplayError error={error.message} />

  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        label="Folder Name"
        {...register("name", { required: true })}
      />
      <Button disabled={isError} isLoading={isPending} type="submit">
        Add Folder
      </Button>
    </form>
  )
}
