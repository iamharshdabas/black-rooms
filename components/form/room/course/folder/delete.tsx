import { Button } from "@nextui-org/button"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal"
import { TrashIcon } from "lucide-react"

import { useDeleteRoomCourseFolder } from "@/hooks/room"
import { DisplayError } from "@/components/ui"
import { RoomCourseFolders } from "@/server/schema"

type Props = {
  folder: RoomCourseFolders
  courseId: string
}

export function DeleteRoomCourseFolder({ folder, courseId }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { mutate, isPending, isError, error } = useDeleteRoomCourseFolder()

  function deleteFolder() {
    mutate({ id: folder.id, courseId })
  }

  if (isError) return <DisplayError error={error.message} />

  return (
    <>
      <Button isIconOnly color="danger" variant="light" onPress={onOpen}>
        <TrashIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Delete {folder.name}</ModalHeader>
          <ModalBody>
            <h2 className="flex items-center gap-2">
              This action is irreversible. Are you sure you want to delete this folder?
            </h2>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Close
            </Button>
            <Button
              color="danger"
              isDisabled={isPending}
              isLoading={isPending}
              startContent={<TrashIcon />}
              onPress={deleteFolder}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
