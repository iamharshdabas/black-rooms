"use client"

import { Spinner } from "@nextui-org/spinner"
import { toast } from "sonner"

import { title } from "@/config"
import { useGetRoomCourseVideo } from "@/hooks/room"

type Props = {
  params: {
    videoId: string
  }
}

export default function Page({ params }: Props) {
  const video = useGetRoomCourseVideo(params.videoId)

  if (video.isLoading) {
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

  return (
    <div>
      <h1 className={title()}>{video.data?.name}</h1>
    </div>
  )
}
