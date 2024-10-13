"use client"

import { Button, ButtonProps } from "@nextui-org/button"
import { useForm } from "react-hook-form"
import { Input } from "@nextui-org/input"

import { useMutationCreateRoomCourseFolder } from "@/hooks/room/mutate"
import { RoomCourseFoldersInsert } from "@/server/schema"
import { DisplayError } from "@/components/ui"

type Props = {
  courseId: string
}

export function AddRoomCourseFolder({ courseId, ...props }: Props & ButtonProps) {
  const { mutate, isPending, isError, error } = useMutationCreateRoomCourseFolder()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCourseFoldersInsert>({ defaultValues: { courseId, order: 0 } })

  function onSubmit(data: RoomCourseFoldersInsert) {
    mutate(data)
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
      <Button disabled={isError} isLoading={isPending} type="submit" {...props}>
        Add Folder
      </Button>
    </form>
  )
}
