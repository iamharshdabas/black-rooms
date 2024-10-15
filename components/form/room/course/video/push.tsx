"use client"

import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useForm } from "react-hook-form"

import { DisplayError } from "@/components/ui"
import { usePushRoomCourseFolderVideo } from "@/hooks/room"
import { RoomCourseFolderVideosInsert, RoomCourseFolders } from "@/server/schema"
import { processUrl } from "@/utils/url"

type Props = {
  folder: RoomCourseFolders
}

export function PushRoomCourseFolderVideo({ folder }: Props) {
  const { mutate, isPending, isError, error } = usePushRoomCourseFolderVideo()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCourseFolderVideosInsert>({ defaultValues: { folderId: folder.id, order: 0 } })

  function onSubmit(data: RoomCourseFolderVideosInsert) {
    const url = processUrl(data.url)
    const courseId = folder.courseId

    if (url) {
      mutate(
        { ...data, courseId, url },
        {
          onSuccess: () => reset(),
        },
      )
    }
  }

  if (isError) return <DisplayError error={error.message} />

  return (
    <form className="flex w-full items-center gap-4 lg:w-fit" onSubmit={handleSubmit(onSubmit)}>
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
      <Button className="lg:min-w-fit" disabled={isError} isLoading={isPending} type="submit">
        Add Video
      </Button>
    </form>
  )
}
