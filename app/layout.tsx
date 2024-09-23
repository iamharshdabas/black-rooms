import "@/globals.css"
import clsx from "clsx"
import { Metadata, Viewport } from "next"
import { ReactNode } from "react"

import { Providers } from "./providers"

import { Navbar } from "@/components/ui"
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
      <body className={clsx("min-h-screen bg-background font-sans antialiased")}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="mx-auto max-w-screen-2xl">
            <div className="relative flex h-screen flex-col">
              <Navbar />
              <main className="grow px-8 py-16">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
