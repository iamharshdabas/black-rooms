import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal"
import { FolderIcon, PencilIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { usePatchRoomCourseFolder } from "@/hooks/room"
import { RoomCourseFolders } from "@/server/schema"

type Props = {
  folder: RoomCourseFolders
}

export function PatchRoomCourseFolder({ folder }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { mutate, isPending } = usePatchRoomCourseFolder()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCourseFolders>({ defaultValues: folder })

  function onSubmit(data: RoomCourseFolders) {
    mutate(data, {
      onSuccess: () => {
        reset()
        onClose()
      },
    })
  }

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
                startContent={<FolderIcon />}
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
