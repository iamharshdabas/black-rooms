import { Button } from "@nextui-org/button"
import Image from "next/image"

import { bg, subtitle, title } from "@/config/primitives"
import ShineBorder from "@/components/ui/shine-border"

export default function Page() {
  return (
    <section className="flex flex-col items-center gap-16">
      <div className={bg({ className: "text-center" })}>
        <h1 className={title()}>Empower Your Connections with Black Rooms</h1>
        <br />
        <h1 className={title()}>Where Innovation Meets Engagement.</h1>
        <h2 className={subtitle({ class: "pt-4" })}>
          Transform your interaction landscape with custom-built communities designed to inspire and
          connect.
        </h2>
      </div>

      <div>
        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <Button className="bg-foreground font-bold text-background" variant="shadow">
            Start Building Your Community
          </Button>
          <Button variant="ghost">Watch Our Demo</Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent to-background" />
        <ShineBorder borderRadius={24} borderWidth={1} color="#888888">
          <Image
            alt="ProductShowcase"
            className="hidden dark:block"
            height="984"
            src="/hero-dark.png"
            width="1280"
          />
          <Image
            alt="ProductShowcase"
            className="opacity-95 dark:hidden"
            height="984"
            src="/hero-light.png"
            width="1280"
          />
        </ShineBorder>
      </div>
    </section>
  )
}
