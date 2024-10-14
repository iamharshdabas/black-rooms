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

import { useDeleteRoomCourseFolderVideo } from "@/hooks/room"
import { DisplayError } from "@/components/ui"
import { RoomCourseFolderVideos } from "@/server/schema"

type Props = {
  video: RoomCourseFolderVideos
  courseId: string
}

export function DeleteRoomCourseFolderVideo({ video, courseId }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { mutate, isPending, isError, error } = useDeleteRoomCourseFolderVideo()

  function deleteVideo() {
    mutate({ id: video.id, courseId })
  }

  if (isError) return <DisplayError error={error.message} />

  return (
    <>
      <Button isIconOnly color="danger" variant="light" onPress={onOpen}>
        <TrashIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Delete {video.name}</ModalHeader>
          <ModalBody>
            <h2 className="flex items-center gap-2">
              This action is irreversible. Are you sure you want to delete this video?
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
              onPress={deleteVideo}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
