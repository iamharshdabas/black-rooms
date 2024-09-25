import {
  ChatSquareIcon,
  DollarIcon,
  GamepadIcon,
  HandHeartIcon,
  Home2Icon,
  SettingsIcon,
  UsersGroupIcon,
  UsersGroupIcon2,
  VideoLibraryIcon,
  Widget5Icon,
} from "@/components/icon"

export const price = 99

export const pricingFeatures: Feature = {
  title: "Simple pricing",
  subtitle: "1 plan with everything included.No hidden fees.",
  featureTitle: `${price}/month`,
  features: [
    {
      title: "One Room",
      icon: <Home2Icon />,
    },
    {
      title: "All Features",
      icon: <Widget5Icon />,
    },
    {
      title: "Unlimited courses",
      icon: <VideoLibraryIcon />,
    },
    {
      title: "Unlimited Members",
      icon: <UsersGroupIcon />,
    },
    {
      title: "2.9% Transaction Fee",
      icon: <DollarIcon />,
    },
  ],
}

export const createRoomFeatures: Feature = {
  title: "Create room",
  subtitle: `Free for the first 30 days. Then, ${price} per month.`,
  features: [
    {
      title: "Highly engaging",
      icon: <HandHeartIcon />,
    },
    {
      title: "Easy to setup",
      icon: <SettingsIcon />,
    },
    {
      title: "Group chat and posts",
      icon: <ChatSquareIcon />,
    },
    {
      title: "Create teams within Room",
      icon: <UsersGroupIcon2 />,
    },
    {
      title: "Gamification",
      icon: <GamepadIcon />,
    },
    {
      title: "Host unlimited courses",
      icon: <VideoLibraryIcon />,
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
