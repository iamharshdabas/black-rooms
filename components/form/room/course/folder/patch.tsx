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
  const patchFolder = usePatchRoomCourseFolder()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCourseFolders>({ defaultValues: folder })

  function onSubmit(data: RoomCourseFolders) {
    patchFolder.mutate(data, {
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
                endContent={<FolderIcon />}
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
              <Button
                color="primary"
                isDisabled={patchFolder.isPending}
                isLoading={patchFolder.isPending}
                type="submit"
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
