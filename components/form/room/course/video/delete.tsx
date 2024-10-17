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

import { useDeleteRoomCourseFolderVideo } from "@/hooks/room"
import { RoomCourseFolderVideos } from "@/server/schema"

type Props = {
  video: RoomCourseFolderVideos
  courseId: string
}

export function DeleteRoomCourseFolderVideo({ video, courseId }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const deleteVideo = useDeleteRoomCourseFolderVideo()

  function handleDeleteVideo() {
    deleteVideo.mutate({ ...video, courseId }, { onSuccess: onClose })
  }

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
              isDisabled={deleteVideo.isPending}
              isLoading={deleteVideo.isPending}
              startContent={<TrashIcon />}
              onPress={handleDeleteVideo}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
