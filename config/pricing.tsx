import { CourseIcon, FeatureIcon, MoneyIcon, RoomIcon, UsersIcon } from "@/components/icon"

export const pricing = {
  price: 99,
  benefits: [
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
