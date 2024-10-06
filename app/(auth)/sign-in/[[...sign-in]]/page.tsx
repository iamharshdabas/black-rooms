"use client"

import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Link } from "@nextui-org/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { AuthEmail, AuthPassword } from "@/components/form/auth"
import { site, subtitle, url } from "@/config"
import { SignIn } from "@/types"

type SignInForm = z.infer<typeof SignIn>

// TODO: use mutation
export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<SignInForm>({ resolver: zodResolver(SignIn) })

  const onSubmit = async (data: SignInForm) => {
    if (!isLoaded) return
    setError("")

    try {
      setLoading(true)

      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      })

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId })

        router.push(url.room.explore)
      } else {
        // TODO: handle errors gracefully
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(signInAttempt, null, 2))
      }

      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      setError(err.errors[0].longMessage)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader className="flex-col justify-center gap-4">
          <h2 className={subtitle({ className: "font-bold" })}>{`Sign in to ${site.name}`}</h2>
          <h3>Welcome back! Please sign in to continue.</h3>
        </CardHeader>
        <Divider />
        <CardBody className="gap-4">
          <AuthEmail />
          <AuthPassword />
          {error && <div className="rounded-xl bg-danger-50 p-2 text-danger">{error}</div>}
          <Button fullWidth color="primary" isDisabled={loading} isLoading={loading} type="submit">
            Sign In
          </Button>
        </CardBody>
        <Divider />
        <CardFooter className="justify-center">
          <p>
            Don&apos;t have an account ?
            <Link className="pl-2" href={url.signUp}>
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </form>
    </FormProvider>
  )
}
