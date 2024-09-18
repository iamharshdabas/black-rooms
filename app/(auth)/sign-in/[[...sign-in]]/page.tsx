"use client"

import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { Link } from "@nextui-org/link"
import { Spacer } from "@nextui-org/spacer"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { SignIn } from "@/types/auth"
import { siteConfig } from "@/config/site"

type SignInForm = z.infer<typeof SignIn>

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: zodResolver(SignIn) })

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

        router.push(siteConfig.redirect.signIn)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <h1>Sign up</h1>
      </CardHeader>
      <CardBody>
        <Input
          errorMessage={errors?.email?.message}
          isInvalid={!!errors.email}
          label="Email"
          type="email"
          {...register("email")}
        />
        <Spacer y={4} />
        <Input
          errorMessage={errors?.password?.message}
          isInvalid={!!errors.password}
          label="Password"
          type="password"
          {...register("password")}
        />
        <Spacer y={4} />
        {error && <div className="rounded-xl bg-danger-50 p-2 text-danger">{error}</div>}
      </CardBody>
      <CardFooter className="flex-col justify-center gap-4">
        <Button fullWidth color="primary" isDisabled={loading} isLoading={loading} type="submit">
          Sign In
        </Button>
        <p>
          Don&apos;t have an account ?
          <Link className="pl-2" href="/sign-up">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </form>
  )
}
