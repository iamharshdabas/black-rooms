import * as Clerk from "@clerk/elements/common"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { Spinner } from "@nextui-org/spinner"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"

import { GithubIcon, GoogleIcon, MailIcon } from "@/components/icon"
import { LogoIcon } from "@/components/icon/logo"
import { subtitle as subtitlePrimitive } from "@/config/primitives"

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <LogoIcon />
      </div>
      <Card className="w-full max-w-md">{children}</Card>
    </div>
  )
}

export function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <CardHeader className="flex flex-col gap-2">
      <h2 className={subtitlePrimitive({ className: "font-bold" })}>{title}</h2>
      <h3>{subtitle}</h3>
    </CardHeader>
  )
}

export function AuthBody({ children }: { children: ReactNode }) {
  return <CardBody className="flex flex-col gap-4">{children}</CardBody>
}

export function AuthFooter({ children }: { children: ReactNode }) {
  return <CardFooter className="flex flex-col">{children}</CardFooter>
}

export function AuthEmail() {
  return (
    <>
      <Clerk.Input asChild required type="email">
        <Input endContent={<MailIcon />} label="Email address" />
      </Clerk.Input>
      <Clerk.FieldError className="text-danger" />
    </>
  )
}

export function AuthPassword() {
  return (
    <>
      <Clerk.Input asChild required type="password">
        <Input label="Password" />
      </Clerk.Input>
      <Clerk.FieldError className="text-danger" />
    </>
  )
}

export function AuthOTP() {
  return (
    <Clerk.Field className="flex flex-col items-center" name="code">
      <Clerk.Input
        required
        className="flex justify-center gap-1"
        render={({ value, status }) => (
          <div
            className="relative size-12 rounded-xl ring-1 ring-inset ring-divider data-[status=selected]:bg-primary/10 data-[status=selected]:ring-primary"
            data-status={status}
          >
            <AnimatePresence>
              {value && (
                <motion.span
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                  exit={{ opacity: 0, scale: 0.8 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                >
                  {value}
                </motion.span>
              )}
              {value}
            </AnimatePresence>
            {status === "cursor" && (
              <motion.div
                className="absolute inset-0 z-10 rounded-[inherit] border-2 border-primary bg-primary/10"
                layoutId="otp-input-focus"
                transition={{ ease: [0.2, 0.4, 0, 1], duration: 0.2 }}
              />
            )}
          </div>
        )}
        type="otp"
      />
      <Clerk.FieldError className="text-danger" />
    </Clerk.Field>
  )
}

export function AuthResendOTP() {
  return (
    <Button className="max-w-fit" type="button" variant="light">
      Didn&apos;t receive a code? Resend
    </Button>
  )
}

export function AuthResendOTPFallback({ resendableAfter }: { resendableAfter: number }) {
  return (
    <Button disabled className="max-w-fit" variant="light">
      Didn&apos;t receive a code? Resend (<span className="tabular-nums">{resendableAfter}</span>)
    </Button>
  )
}

export function AuthButton({
  isGlobalLoading,
  label = "Continue",
}: {
  isGlobalLoading: boolean
  label?: string
}) {
  return (
    <Button fullWidth color="primary" disabled={isGlobalLoading} type="submit">
      <Clerk.Loading>
        {(isLoading) =>
          isLoading ? (
            <>
              <Spinner color="default" size="sm" />
              {label}
            </>
          ) : (
            <>{label}</>
          )
        }
      </Clerk.Loading>
    </Button>
  )
}

export function AuthProvider({ isGlobalLoading }: { isGlobalLoading: boolean }) {
  return (
    <>
      <Clerk.Connection asChild name="github">
        <Button fullWidth disabled={isGlobalLoading} variant="ghost">
          <Clerk.Loading scope="provider:github">
            {(isLoading) =>
              isLoading ? (
                <>
                  <Spinner color="default" size="sm" />
                  <span>Continue with Github</span>
                </>
              ) : (
                <>
                  <GithubIcon />
                  <span>Continue with Github</span>
                </>
              )
            }
          </Clerk.Loading>
        </Button>
      </Clerk.Connection>

      <Clerk.Connection asChild name="google">
        <Button fullWidth disabled={isGlobalLoading} variant="ghost">
          <Clerk.Loading scope="provider:google">
            {(isLoading) =>
              isLoading ? (
                <>
                  <Spinner color="default" size="sm" />
                  <span>Continue with Google</span>
                </>
              ) : (
                <>
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </>
              )
            }
          </Clerk.Loading>
        </Button>
      </Clerk.Connection>
    </>
  )
}
