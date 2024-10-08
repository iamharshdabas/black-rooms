import {
  Gamepad2Icon,
  HandshakeIcon,
  HouseIcon,
  IndianRupeeIcon,
  LayoutDashboardIcon,
  MessageCircleIcon,
  TvMinimalPlayIcon,
  UsersRoundIcon,
  WrenchIcon,
} from "lucide-react"

export const price = 99

export const pricingFeatures: Feature = {
  title: "Simple pricing",
  subtitle: "1 plan with everything included.No hidden fees.",
  featureTitle: `${price}/month`,
  features: [
    {
      title: "One Room",
      icon: <HouseIcon />,
    },
    {
      title: "All Features",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Unlimited courses",
      icon: <TvMinimalPlayIcon />,
    },
    {
      title: "Unlimited Members",
      icon: <UsersRoundIcon />,
    },
    {
      title: "2.9% Transaction Fee",
      icon: <IndianRupeeIcon />,
    },
  ],
}

export const createRoomFeatures: Feature = {
  title: "Create room",
  subtitle: `Free for the first 30 days. Then, ${price} per month.`,
  features: [
    {
      title: "Highly engaging",
      icon: <HandshakeIcon />,
    },
    {
      title: "Easy to setup",
      icon: <WrenchIcon />,
    },
    {
      title: "Group chat and posts",
      icon: <MessageCircleIcon />,
    },
    {
      title: "Create teams within Room",
      icon: <UsersRoundIcon />,
    },
    {
      title: "Gamification",
      icon: <Gamepad2Icon />,
    },
    {
      title: "Host unlimited courses",
      icon: <TvMinimalPlayIcon />,
    },
  ],
}

export type Feature = {
  title: string
  subtitle: string
  featureTitle?: string
  features: {
    title: string
    icon: JSX.Element
  }[]
}
