import { bg, subtitle, title } from "@/config/primitives"

export default function Home() {
  return (
    <section>
      <div className={bg({ className: "text-center" })}>
        <h1 className={title()}>Make beautiful websites</h1>
        <br />
        <h1 className={title()}>regardless of your design experience.</h1>
        <h2 className={subtitle({ class: "pt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>
    </section>
  )
}
