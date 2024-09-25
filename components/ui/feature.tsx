import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Spacer } from "@nextui-org/spacer"
import { cn } from "@nextui-org/theme"

import { Feature, bgGradient, subtitle, textGradient, title } from "@/config"

type Props = {
  border?: boolean
  transparent?: boolean
  feature: Feature
}

export default function FeatureCard({ border, transparent = true, feature }: Props) {
  return (
    <>
      <div className={textGradient({ className: "text-center" })}>
        <h1 className={title()}>{feature.title}</h1>
        <Spacer y={4} />
        <h2 className={subtitle()}>{feature.subtitle}</h2>
      </div>

      <div className="relative flex w-full max-w-md justify-center pt-16">
        {transparent && <div className={bgGradient()} />}
        <Card className={cn("w-full", border && "border border-divider")} isBlurred={transparent}>
          {feature.featureTitle && (
            <CardHeader className="p-8">
              <h1 className={title({ size: "sm" })}>{feature.featureTitle}</h1>
            </CardHeader>
          )}
          {border && <Divider />}
          <CardBody className="gap-4 p-8">
            {feature.features.map((feature) => (
              <div
                key={feature.title}
                className={subtitle({ className: "flex items-center gap-4" })}
              >
                {feature.icon}
                {feature.title}
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </>
  )
}
