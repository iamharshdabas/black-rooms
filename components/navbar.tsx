"use client"

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { LogoIcon } from "./icon/logo"

import { ThemeSwitch } from "@/components/theme-switch"
import { subtitle } from "@/config/primitives"
import { siteConfig } from "@/config/site"

export const Navbar = () => {
  const pathname = usePathname()

  return (
    // here px-6 is applied internally and to increase it to px-8, i added pl-2
    <NextUINavbar className="px-2" maxWidth="full" position="sticky">
      <NavbarContent>
        <NavbarBrand as="li" className="max-w-fit gap-4">
          <Link className="flex items-center justify-start gap-1" color="foreground" href="/">
            <LogoIcon width="4em" />
            <p className={subtitle({ class: "font-bold" })}>ROOMS</p>
          </Link>
        </NavbarBrand>
        <ul className="hidden justify-start gap-4 pl-2 lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem
              key={item.href}
              className="text-foreground data-[active=true]:font-bold data-[active=true]:text-primary"
              isActive={item.href === pathname}
            >
              <Link className={subtitle()} href={item.href}>
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
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <ThemeSwitch />
        <NavbarItem>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="px-8">
        <div className="flex flex-col gap-4 py-8">
          {siteConfig.navItems.map((item) => (
            <NavbarItem
              key={item.href}
              className="text-foreground data-[active=true]:font-bold data-[active=true]:text-primary"
              isActive={item.href === pathname}
            >
              <Link className={subtitle()} href={item.href}>
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
