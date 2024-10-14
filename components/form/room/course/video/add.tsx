"use client"

import { Button, ButtonProps } from "@nextui-org/button"
import { useForm } from "react-hook-form"
import { Input } from "@nextui-org/input"

import { useMutationCreateRoomCourseFolderVideo } from "@/hooks/room/mutate"
import { RoomCourseVideosInsert } from "@/server/schema"
import { DisplayError } from "@/components/ui"

type Props = {
  courseId: string
  folderId: string
}

export function AddRoomCourseVideo({ courseId, folderId, ...props }: Props & ButtonProps) {
  const { mutate, isPending, isError, error } = useMutationCreateRoomCourseFolderVideo()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCourseVideosInsert>({ defaultValues: { folderId, order: 0 } })

  function onSubmit(data: RoomCourseVideosInsert) {
    mutate({ courseId, ...data })
  }

  if (isError) return <DisplayError error={error.message} />

  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        label="Video Name"
        {...register("name", { required: true })}
      />
      <Input
        errorMessage={errors.url?.message}
        isInvalid={!!errors.url}
        label="Video Url"
        {...register("url", { required: true })}
      />
      <Button disabled={isError} isLoading={isPending} type="submit" {...props}>
        Add Video
      </Button>
    </form>
  )
}
