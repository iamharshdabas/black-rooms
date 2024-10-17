import { Button } from "@nextui-org/button"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal"
import { TrashIcon } from "lucide-react"

import { useDeleteRoomCourseFolder } from "@/hooks/room"
import { RoomCourseFolders } from "@/server/schema"

type Props = {
  folder: RoomCourseFolders
}

export function DeleteRoomCourseFolder({ folder }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const deleteFolder = useDeleteRoomCourseFolder()

  function handleDeleteFolder() {
    deleteFolder.mutate(folder, { onSuccess: onClose })
  }

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
              isDisabled={deleteFolder.isPending}
              isLoading={deleteFolder.isPending}
              startContent={<TrashIcon />}
              onPress={handleDeleteFolder}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
