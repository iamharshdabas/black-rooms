import { Link } from "@nextui-org/link"
import { Spacer } from "@nextui-org/spacer"
import { button, cn } from "@nextui-org/theme"

import { DoubleDivider } from "./double-divider"

import { subtitle, url } from "@/config"

type Props = {
  compact?: boolean
}

export function NoRoom({ compact }: Props) {
  return (
    <>
      <h2 className={subtitle({ className: cn(compact && "lg:text-lg") })}>
        Looks like you don&apos;t have any room
      </h2>
      <Spacer y={2} />
      <Link className={button({ variant: "flat", fullWidth: true })} href={url.room.create}>
        Create your first room
      </Link>
      <DoubleDivider />
      <Link className={button({ variant: "flat", fullWidth: true })} href={url.room.explore}>
        Join your first room
      </Link>
    </>
  )
}
