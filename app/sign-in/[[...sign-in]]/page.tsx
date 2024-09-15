"use client"

import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"
import { Button } from "@nextui-org/button"
import { Divider } from "@nextui-org/divider"
import { Link } from "@nextui-org/link"
import { Spacer } from "@nextui-org/spacer"
import { Spinner } from "@nextui-org/spinner"

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
import { siteConfig } from "@/config/site"

export default function SignInPage() {
  return (
    <AuthCard>
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start">
                <AuthHeader
                  subtitle="Welcome back! Please sign in to continue."
                  title={`Sign in to ${siteConfig.name}`}
                />
                <Divider />
                <AuthBody>
                  <Clerk.Field name="identifier">
                    <AuthEmail />
                  </Clerk.Field>
                  <DoubleDivider />
                  <AuthProvider isGlobalLoading={isGlobalLoading} />
                </AuthBody>
                <Divider />
                <AuthFooter>
                  <SignIn.Action asChild submit>
                    <AuthButton isGlobalLoading={isGlobalLoading} />
                  </SignIn.Action>
                  <Spacer y={2} />
                  <h3>
                    Don&apos;t have an account?
                    <Link className="pl-2" href="/sign-up">
                      Sign Up
                    </Link>
                  </h3>
                </AuthFooter>
              </SignIn.Step>

              <SignIn.Step name="choose-strategy">
                <AuthHeader
                  subtitle="Facing issues? You can use any of these methods to sign in."
                  title="Use another method"
                />
                <Divider />
                <AuthBody>
                  <SignIn.SupportedStrategy asChild name="email_code">
                    <Button disabled={isGlobalLoading} isLoading={isGlobalLoading}>
                      Email code
                    </Button>
                  </SignIn.SupportedStrategy>
                  <SignIn.SupportedStrategy asChild name="password">
                    <Button disabled={isGlobalLoading} isLoading={isGlobalLoading}>
                      Password
                    </Button>
                  </SignIn.SupportedStrategy>
                </AuthBody>
                <Divider />
                <AuthFooter>
                  {/* NOTE: you can't use AuthButton here because of navigate prop */}
                  <SignIn.Action asChild navigate="previous">
                    <Button fullWidth color="primary" disabled={isGlobalLoading} type="submit">
                      <Clerk.Loading>
                        {(isLoading) =>
                          isLoading ? (
                            <>
                              <Spinner color="default" size="sm" />
                              Previous
                            </>
                          ) : (
                            <>Previous</>
                          )
                        }
                      </Clerk.Loading>
                    </Button>
                  </SignIn.Action>
                </AuthFooter>
              </SignIn.Step>

              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <AuthHeader subtitle="Enter your password to continue." title="Welcome back" />
                  <Divider />
                  <AuthBody>
                    <Clerk.Field name="password">
                      <AuthPassword />
                    </Clerk.Field>
                  </AuthBody>
                  <Divider />
                  <AuthFooter>
                    <SignIn.Action asChild submit>
                      <AuthButton isGlobalLoading={isGlobalLoading} />
                    </SignIn.Action>
                    <Spacer y={2} />
                    <SignIn.Action asChild navigate="choose-strategy">
                      <Button fullWidth variant="ghost">
                        Use another method
                      </Button>
                    </SignIn.Action>
                  </AuthFooter>
                </SignIn.Strategy>

                <SignIn.Strategy name="email_code">
                  <AuthHeader
                    subtitle="Enter the verification code sent to your email"
                    title="Check your email"
                  />
                  <Divider />
                  <AuthBody>
                    <AuthOTP />
                    <div className="flex justify-center">
                      <SignIn.Action
                        asChild
                        resend
                        fallback={({ resendableAfter }) => (
                          <AuthResendOTPFallback resendableAfter={resendableAfter} />
                        )}
                      >
                        <AuthResendOTP />
                      </SignIn.Action>
                    </div>
                  </AuthBody>
                  <Divider />
                  <AuthFooter>
                    <SignIn.Action asChild submit>
                      <AuthButton isGlobalLoading={isGlobalLoading} />
                    </SignIn.Action>
                    <Spacer y={2} />
                    <SignIn.Action asChild navigate="choose-strategy">
                      <Button fullWidth variant="ghost">
                        Use another method
                      </Button>
                    </SignIn.Action>
                  </AuthFooter>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </AuthCard>
  )
}
