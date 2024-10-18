"use client"

import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Spinner } from "@nextui-org/spinner"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Editor } from "@/components/form/room"
import { url } from "@/config"
import { useGetRoomCourseVideo, usePatchRoomCourseFolderVideo } from "@/hooks/room"
import { useValidateOwnership } from "@/hooks/validate/ownership"
import { RoomCourseFolderVideos } from "@/server/schema"

type Props = {
  params: {
    roomId: string
    courseId: string
    videoId: string
  }
}

export default function Page({ params }: Props) {
  const router = useRouter()
  const video = useGetRoomCourseVideo(params.videoId)
  const owner = useValidateOwnership(params.roomId)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RoomCourseFolderVideos>({ defaultValues: video.data })
  const patchVideo = usePatchRoomCourseFolderVideo()

  const description = watch("description") || ""

  const onSubmit = (data: RoomCourseFolderVideos) => {
    patchVideo.mutate(data)
  }
  const handleSetDescription = useCallback(
    (description: string) => setValue("description", description),
    [setValue],
  )

  useEffect(() => {
    if (video.data) {
      reset(video.data)
    }
  }, [video.data, reset])

  if (video.isLoading || owner.isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!video.isLoading && video.isError) {
    toast.error(video.error?.message ?? "An error occurred")

    return null
  }

  if (!owner.isOwner && !owner.isLoading) {
    toast.error("You are not the owner of the room")
    router.push(url.room.page(params.roomId))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-4">
        <Input
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          label="Url"
          {...register("url")}
        />
        <Input
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          label="Name"
          {...register("name")}
        />

        <Editor content={description} onChange={handleSetDescription} />

        <div className="flex gap-4">
          <Button
            fullWidth
            onPress={() =>
              router.push(
                url.room.course.video.page(params.roomId, params.courseId, params.videoId),
              )
            }
          >
            Back
          </Button>
          <Button
            fullWidth
            color="primary"
            disabled={patchVideo.isPending}
            isLoading={patchVideo.isPending}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}
