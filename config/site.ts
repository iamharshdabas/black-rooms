export const site = {
  name: "Black Rooms",
  description: "Rooms by BlackEmpyreal",
}

export const url = {
  home: "/",

  signIn: "/sign-in",
  signUp: "/sign-up",

  create: "/create",
  explore: "/explore",

  room: {
    room: (roomId: string) => `/room/${roomId}`,
    edit: (roomId: string) => `/room/${roomId}/edit`,
    course: (roomId: string, courseId: string) => `/room/${roomId}/course/${courseId}`,
    video: (roomId: string, courseId: string, videoId: string) =>
      `/room/${roomId}/course/${courseId}/video/${videoId}`,
  },
}

export const navItems = [
  {
    label: "Home",
    href: url.home,
  },
  {
    label: "Explore",
    href: url.explore,
  },
]
