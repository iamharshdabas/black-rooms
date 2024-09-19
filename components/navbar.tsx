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
import Link from "next/link"
import { usePathname } from "next/navigation"

import { LogoIcon } from "./icon/logo"
import { LoginIcon } from "./icon"

import { ThemeSwitch } from "@/components/theme-switch"
import { subtitle } from "@/config/primitives"
import { siteConfig } from "@/config/site"

const SignInButton = () => {
  return (
    <Link className={button({ variant: "ghost" })} href="/sign-in">
      <LoginIcon height="1.5em" width="1.5em" />
      Sign In
    </Link>
  )
}

export const Navbar = () => {
  const pathname = usePathname()

  return (
    // here px-6 is applied internally and to increase it to px-8, i added pl-2
    <NextUINavbar shouldHideOnScroll className="px-2" maxWidth="full" position="sticky">
      <NavbarContent>
        <NavbarBrand as="li" className="max-w-fit gap-4">
          <Link className="flex items-center justify-start gap-1" color="foreground" href="/">
            <LogoIcon width="4em" />
            <p className="text-2xl font-bold">ROOMS</p>
          </Link>
        </NavbarBrand>
        <ul className="hidden justify-start gap-4 pl-2 sm:flex">
          {siteConfig.navItems.map((item) => (
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

      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <SignedOut>
            {pathname !== process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL &&
              pathname !== process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL && <SignInButton />}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="gap-8 p-8">
        {siteConfig.navItems.map((item) => (
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
            {pathname !== process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL &&
              pathname !== process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL && <SignInButton />}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
      </NavbarMenu>
    </NextUINavbar>
  )
}
