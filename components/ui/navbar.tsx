"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar"
import { button } from "@nextui-org/theme"
import { LogInIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { LogoIcon } from "../logo"

import { Sidebar } from "./sidebar"
import { ThemeSwitch } from "./theme-switch"

import { navItems, subtitle, url } from "@/config"

function SignInButton() {
  return (
    <Link className={button({ variant: "ghost" })} href={url.signIn}>
      <LogInIcon />
      Sign In
    </Link>
  )
}

type Props = {
  isRoomRoute: boolean
}

export function Navbar({ isRoomRoute }: Props) {
  const pathname = usePathname()

  return (
    <NextUINavbar shouldHideOnScroll maxWidth="full" position="sticky">
      <NavbarContent>
        <NavbarBrand as="li" className="max-w-fit">
          <Link
            className="flex items-center justify-start gap-1"
            color="foreground"
            href={url.home}
          >
            <LogoIcon width="3em" />
            <p className="text-2xl">ROOMS</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        <ul className="hidden gap-4 lg:flex">
          {navItems.map((item) => (
            <NavbarItem
              key={item.href}
              className="text-foreground data-[active=true]:font-bold"
              isActive={item.href === pathname}
            >
              <Link className="text-xl" href={item.href}>
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex" justify="end">
        <NavbarItem>
          <ThemeSwitch isIconOnly />
        </NavbarItem>
        <NavbarItem className="pt-2">
          <SignedOut>
            {pathname !== url.signIn && pathname !== url.signUp && <SignInButton />}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden" justify="end">
        <ThemeSwitch isIconOnly />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="gap-8 p-6">
        {navItems.map((item) => (
          <NavbarItem
            key={item.href}
            className="text-foreground data-[active=true]:font-bold"
            isActive={item.href === pathname}
          >
            <Link className={subtitle()} href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}

        <NavbarItem>
          <SignedOut>
            {pathname !== url.signIn && pathname !== url.signUp && <SignInButton />}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>

        {isRoomRoute && (
          <NavbarItem>
            <Sidebar />
          </NavbarItem>
        )}
      </NavbarMenu>
    </NextUINavbar>
  )
}
