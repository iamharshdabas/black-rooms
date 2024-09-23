import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Spacer } from "@nextui-org/spacer"
import Image from "next/image"

import { ShineBorder } from "@/components/ui"
import { bgGradient, pricing, subtitle, textGradient, title } from "@/config"

export default function Page() {
  return (
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

      <section className="flex flex-col items-center gap-16">
        <div className={textGradient({ className: "text-center" })}>
          <h1 className={title()}>Simple pricing</h1>
          <Spacer y={4} />
          <h2 className={subtitle()}>1 plan with everything included. No hidden fees.</h2>
        </div>

        <div className="relative flex w-full max-w-md justify-center">
          <div className={bgGradient()} />
          <Card isBlurred className="w-full border-2 border-divider">
            <CardHeader className="p-8">
              <h1 className={title({ size: "sm" })}>
                ${pricing.price}/<span className={title({ size: "sm" })}>month</span>
              </h1>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4 p-8">
              {pricing.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className={subtitle({ className: "flex items-center gap-4" })}
                >
                  {benefit.icon}
                  {benefit.title}
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  )
}
