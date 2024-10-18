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
    page: (roomId: string) => `/room/${roomId}`,
    edit: (roomId: string) => `/room/${roomId}/edit`,
    course: {
      page: (roomId: string, courseId: string) => `/room/${roomId}/course/${courseId}`,
      edit: (roomId: string, courseId: string) => `/room/${roomId}/course/${courseId}/edit`,
      video: {
        page: (roomId: string, courseId: string, videoId: string) =>
          `/room/${roomId}/course/${courseId}/video/${videoId}`,
        edit: (roomId: string, courseId: string, videoId: string) =>
          `/room/${roomId}/course/${courseId}/video/${videoId}/edit`,
      },
    },
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
