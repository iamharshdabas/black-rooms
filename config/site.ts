export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Black Rooms",
  description: "Rooms by BlackEmpyreal",
  redirect: {
    signIn: "/rooms/explore",
    signUp: "/rooms/create",
  },
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
}
