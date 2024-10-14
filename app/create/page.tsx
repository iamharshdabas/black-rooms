"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Spacer } from "@nextui-org/spacer"
import { HouseIcon } from "lucide-react"
import { useCallback } from "react"
import { useForm } from "react-hook-form"

import { RoomCategory } from "@/components/form/room"
import { DisplayError, FeatureCard } from "@/components/ui"
import { createRoomFeatures } from "@/config"
import { CreateRoomData, usePushRoom } from "@/hooks/room"

export default function Page() {
  const { userId: clerkId } = useAuth()
  const { mutate, isPending, isError, error } = usePushRoom(clerkId!)
  const { register, handleSubmit, setValue, watch } = useForm<CreateRoomData>({
    defaultValues: {
      name: "",
      subCategoryId: undefined,
    },
  })

  const selected = watch("subCategoryId")

  const onSubmit = (data: CreateRoomData) => mutate(data)
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
            isRequired
            endContent={<HouseIcon />}
            label="Room name"
            labelPlacement="outside"
            {...register("name", { required: true })}
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
