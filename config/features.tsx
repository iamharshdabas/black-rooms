import { CourseIcon, FeatureIcon, MoneyIcon, RoomIcon, UsersIcon } from "@/components/icon"
import { ChatIcon } from "@/components/icon/chat"
import { GameIcon } from "@/components/icon/game"
import { HandHeartIcon } from "@/components/icon/hand-heart"
import { SettingsIcon } from "@/components/icon/settings"

export const price = 99

export const pricingFeatures: Feature = {
  title: "Simple pricing",
  subtitle: "1 plan with everything included.No hidden fees.",
  featureTitle: `${price}/month`,
  features: [
    {
      title: "One Room",
      icon: <RoomIcon />,
    },
    {
      title: "All Features",
      icon: <FeatureIcon />,
    },
    {
      title: "Unlimited courses",
      icon: <CourseIcon />,
    },
    {
      title: "Unlimited Members",
      icon: <UsersIcon />,
    },
    {
      title: "2.9% Transaction Fee",
      icon: <MoneyIcon />,
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
      icon: <ChatIcon />,
    },
    {
      title: "Create teams within Room",
      icon: <UsersIcon />,
    },
    {
      title: "Gamification",
      icon: <GameIcon />,
    },
    {
      title: "Host unlimited courses",
      icon: <CourseIcon />,
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
