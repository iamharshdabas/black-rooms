"use client"

import { title } from "@/config"
import { useGetRoomCourseVideo } from "@/hooks/room"

type Props = {
  params: {
    videoId: string
  }
}

export default function Page({ params }: Props) {
  const { data } = useGetRoomCourseVideo(params.videoId)

  return (
    <div>
      <h1 className={title()}>{data?.name}</h1>
    </div>
  )
}
