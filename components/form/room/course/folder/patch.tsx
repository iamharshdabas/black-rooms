import { Button } from "@nextui-org/button"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal"
import { PencilIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Input } from "@nextui-org/input"

import { DisplayError } from "@/components/ui"
import { RoomCourseFolders } from "@/server/schema"
import { usePatchRoomCourseFolder } from "@/hooks/room"

type Props = {
  folder: RoomCourseFolders
}

export function PatchRoomCourseFolder({ folder }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { mutate, isPending, isError, error } = usePatchRoomCourseFolder()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCourseFolders>({ defaultValues: folder })

  function onSubmit(data: RoomCourseFolders) {
    mutate(data, { onSuccess: onClose })
  }

  if (isError) return <DisplayError error={error.message} />

  return (
    <>
      <Button isIconOnly color="primary" variant="light" onPress={onOpen}>
        <PencilIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit {folder.name}</ModalHeader>
            <ModalBody>
              <Input
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                label="Folder Name"
                {...register("name")}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" isDisabled={isPending} isLoading={isPending} type="submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
