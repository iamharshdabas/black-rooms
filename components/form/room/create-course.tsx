import { Button, ButtonProps } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { usePushRoomCourse } from "@/hooks/room"
import { RoomCoursesInsert } from "@/server/schema"

type Props = {
  roomId: string
}

export function CreateRoomCourse({ roomId, ...props }: Props & ButtonProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { mutate, isPending } = usePushRoomCourse()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCoursesInsert>({
    defaultValues: { roomId },
  })

  const onSubmit = (data: RoomCoursesInsert) => {
    mutate(data)
  }

  return (
    <>
      <Button fullWidth variant="ghost" onPress={onOpen} {...props}>
        {props.isIconOnly ? <PlusIcon /> : "Create Course"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Create Course</ModalHeader>
            <ModalBody>
              <Input
                errorMessage={errors?.name?.message?.toString()}
                isInvalid={!!errors.name}
                label="Course name"
                {...register("name")}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" isDisabled={isPending} isLoading={isPending} type="submit">
                Action
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
