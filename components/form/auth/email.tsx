"use client"

import { Input, InputProps } from "@nextui-org/input"
import { useFormContext } from "react-hook-form"

export function AuthEmail({ ...props }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Input
      errorMessage={errors?.email?.message?.toString()}
      isInvalid={!!errors.email}
      label="Email"
      type="email"
      {...register("email")}
      {...props}
    />
  )
}
