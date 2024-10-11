import "@/globals.css"
import clsx from "clsx"
import { Metadata, Viewport } from "next"
import { ReactNode } from "react"

import BaseLayout from "./base-layout"
import { Providers } from "./providers"

import { site } from "@/config"

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("bg-background font-sans antialiased")}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
