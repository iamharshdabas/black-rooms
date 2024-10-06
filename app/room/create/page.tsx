"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Spacer } from "@nextui-org/spacer"
import { useCallback } from "react"
import { useForm } from "react-hook-form"

import { RoomCategory } from "@/components/form/room"
import { Home2Icon } from "@/components/icon"
import { DisplayError, FeatureCard } from "@/components/ui"
import { createRoomFeatures } from "@/config"
import { CreateRoom, useMutationCreateRoom } from "@/hooks/room/mutate"

export default function Page() {
  const { userId: clerkId } = useAuth()
  const { register, handleSubmit, setValue, watch } = useForm<CreateRoom>({
    defaultValues: {
      name: "",
      subCategoryId: undefined,
    },
  })

  const selected = watch("subCategoryId")
  const { mutate, isPending, isError, error } = useMutationCreateRoom(clerkId!)

  const onSubmit = (data: CreateRoom) => {
    mutate({
      name: data.name,
      subCategoryId: data.subCategoryId,
    })
  }

  const handleSetSelected = useCallback(
    (subcategory: string) => setValue("subCategoryId", subcategory),
    [setValue],
  )

  return (
    <form
      className="flex w-full flex-col gap-16 pt-24 xl:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col items-center">
        <FeatureCard feature={createRoomFeatures} />
        <Spacer y={8} />
        <div className="w-full max-w-md space-y-2">
          <Input
            {...register("name", { required: true })}
            isRequired
            endContent={<Home2Icon />}
            label="Room name"
            labelPlacement="outside"
          />
          <p className="lg:hidden">You can select room category from below.</p>
          {isError && <DisplayError error={error.message} />}
          <Button
            fullWidth
            color="primary"
            disabled={isPending}
            isLoading={isPending}
            type="submit"
          >
            Create
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-center xl:max-w-xl 2xl:max-w-2xl">
        <RoomCategory selected={selected} setSelected={handleSetSelected} />
      </div>
    </form>
  )
}
