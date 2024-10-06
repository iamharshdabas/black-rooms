"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@nextui-org/button"
import { Spacer } from "@nextui-org/spacer"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { BaseLayout, FeatureCard, ShineBorder } from "@/components/ui"
import { bgGradient, pricingFeatures, subtitle, textGradient, title, url } from "@/config"

export default function Page() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push(url.room.explore)
    }
  }, [isSignedIn])

  return (
    <BaseLayout>
      <div className="flex flex-col gap-48">
        <section className="flex flex-col items-center gap-16">
          <div className={textGradient({ className: "text-center" })}>
            <h1 className={title()}>Empower Your Connections with Black Rooms</h1>
            <br />
            <h1 className={title()}>Where Innovation Meets Engagement.</h1>
            <Spacer y={4} />
            <h2 className={subtitle()}>
              Transform your interaction landscape with custom-built communities designed to inspire
              and connect.
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
            <div className={bgGradient({ color: "transparent" })} />
            <ShineBorder borderRadius={24} borderWidth={2} color="#888888">
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

        <section className="flex flex-col items-center">
          <FeatureCard border feature={pricingFeatures} />
        </section>
      </div>
    </BaseLayout>
  )
}
