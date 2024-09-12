import { Button } from "@nextui-org/button"

import ProductShowcase from "./_components/product-showcase"

import { bg, subtitle, title } from "@/config/primitives"

export default function Home() {
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

      <div className="max-w-xs">
        <div className="flex w-full flex-col gap-4">
          <Button fullWidth className="bg-foreground font-bold text-background" variant="shadow">
            Start Building Your Community
          </Button>
          <Button fullWidth variant="ghost">
            Watch Our Demo
          </Button>
        </div>
      </div>

      <ProductShowcase />
    </section>
  )
}
