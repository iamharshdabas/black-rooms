"use client"

import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Link } from "@nextui-org/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { AuthCode, AuthEmail, AuthPassword } from "@/components/form/auth"
import { subtitle, url } from "@/config"
import { createUserAction } from "@/server/action/user"
import { SignUp, SignUpVerification } from "@/types"

type SignUpForm = z.infer<typeof SignUp>
type SignUpVerificationForm = z.infer<typeof SignUpVerification>

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [verification, setVerification] = useState(false)
  const router = useRouter()

  const form = useForm<SignUpForm>({ resolver: zodResolver(SignUp) })

  const verificationForm = useForm<SignUpVerificationForm>({
    resolver: zodResolver(SignUpVerification),
  })

  const onSubmit = async (data: SignUpForm) => {
    if (!isLoaded) return
    setError("")

    try {
      setLoading(true)

      await signUp.create({ emailAddress: data.email, password: data.password })
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      setLoading(false)
      setVerification(true)
    } catch (err: any) {
      setLoading(false)
      setError(err.errors[0].longMessage)
    }
  }

  const onVerification = async (data: SignUpVerificationForm) => {
    if (!isLoaded) return
    setError("")

    try {
      setLoading(true)

      const completeSignUp = await signUp.attemptEmailAddressVerification({ code: data.code })

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })

        if (completeSignUp.createdUserId) {
          await createUserAction(completeSignUp.createdUserId)
        }

        router.push(url.room.create)
      } else {
        // TODO: handle errors gracefully
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(completeSignUp, null, 2))
      }

      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      setError(err.errors[0].longMessage)
    }
  }

  if (verification) {
    return (
      <FormProvider {...verificationForm}>
        <form onSubmit={verificationForm.handleSubmit(onVerification)}>
          <CardHeader className="flex-col justify-center gap-4">
            <h2 className={subtitle({ className: "font-bold" })}>Verify your email</h2>
            <h3>Use the verification link sent to your email address.</h3>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4">
            <AuthCode />
            {error && <div className="rounded-xl bg-danger-50 p-2 text-danger">{error}</div>}
            <Button
              fullWidth
              color="primary"
              isDisabled={loading}
              isLoading={loading}
              type="submit"
            >
              Verify
            </Button>
          </CardBody>
          <Divider />
          <CardFooter className="justify-center">
            <Footer />
          </CardFooter>
        </form>
      </FormProvider>
    )
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader className="flex-col justify-center gap-4">
          <h2 className={subtitle({ className: "font-bold" })}>Create your account</h2>
          <h3>Welcome! Please fill in the details to get started.</h3>
        </CardHeader>
        <Divider />
        <CardBody className="gap-4">
          <AuthEmail />
          <AuthPassword />
          {error && <div className="rounded-xl bg-danger-50 p-2 text-danger">{error}</div>}
          <Button fullWidth color="primary" isDisabled={loading} isLoading={loading} type="submit">
            Continue
          </Button>
        </CardBody>
        <Divider />
        <CardFooter className="justify-center">
          <Footer />
        </CardFooter>
      </form>
    </FormProvider>
  )
}

function Footer() {
  return (
    <p>
      Already have an account ?
      <Link className="pl-2" href={url.signIn}>
        Sign In
      </Link>
    </p>
  )
}
