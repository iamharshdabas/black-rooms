import { z } from "zod"

export const SignUp = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password cannot exceed 64 characters" }),
  // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  // .regex(/[0-9]/, { message: "Password must contain at least one digit" })
  // .regex(/[@$!%*?&#]/, {
  //   message: "Password must contain at least one special character (@, $, !, %, *, ?, &, #)",
  // }),
})

export const SignUpVerification = z.object({
  code: z
    .string()
    .min(1, { message: "Verification code is required" })
    .regex(/^\d+$/, { message: "Verification code must be numeric" }),
})

export const SignIn = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password cannot exceed 64 characters" }),
})
