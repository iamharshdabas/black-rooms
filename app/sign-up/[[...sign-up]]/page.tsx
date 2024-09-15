"use client"

import * as Clerk from "@clerk/elements/common"
import * as SignUp from "@clerk/elements/sign-up"
import { CardFooter } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Link } from "@nextui-org/link"
import { Spacer } from "@nextui-org/spacer"

import {
  AuthBody,
  AuthButton,
  AuthCard,
  AuthEmail,
  AuthFooter,
  AuthHeader,
  AuthOTP,
  AuthPassword,
  AuthProvider,
  AuthResendOTP,
  AuthResendOTPFallback,
} from "@/app/_components/auth"
import DoubleDivider from "@/components/ui/double-divider"

export default function Page() {
  return (
    <AuthCard>
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <AuthHeader
                  subtitle="Welcome! Please fill in the details to get started."
                  title="Create your account"
                />
                <Divider />
                <AuthBody>
                  <Clerk.Field name="emailAddress">
                    <AuthEmail />
                  </Clerk.Field>
                  <Clerk.Field name="password">
                    <AuthPassword />
                  </Clerk.Field>
                  <DoubleDivider />
                  <AuthProvider isGlobalLoading={isGlobalLoading} />
                </AuthBody>
                <Divider />
                <AuthFooter>
                  <SignUp.Captcha />
                  <SignUp.Action asChild submit>
                    <AuthButton isGlobalLoading={isGlobalLoading} />
                  </SignUp.Action>
                  <Spacer y={2} />
                  <h3>
                    Already have an account?
                    <Link className="pl-2" href="/sign-in">
                      Sign In
                    </Link>
                  </h3>
                </AuthFooter>
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <AuthHeader
                    subtitle="Use the verification link sent to your email address."
                    title="Verify your email"
                  />
                  <Divider />
                  <AuthBody>
                    <AuthOTP />
                    <div className="flex justify-center">
                      <SignUp.Action
                        asChild
                        resend
                        fallback={({ resendableAfter }) => (
                          <AuthResendOTPFallback resendableAfter={resendableAfter} />
                        )}
                      >
                        <AuthResendOTP />
                      </SignUp.Action>
                    </div>
                  </AuthBody>
                  <Divider />
                  <CardFooter>
                    <SignUp.Action asChild submit>
                      <AuthButton isGlobalLoading={isGlobalLoading} />
                    </SignUp.Action>
                  </CardFooter>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </AuthCard>
  )
}
