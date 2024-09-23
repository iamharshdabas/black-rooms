"use client"

import { Input, InputProps } from "@nextui-org/input"
import { useFormContext } from "react-hook-form"

export function AuthCode({ ...props }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Input
      errorMessage={errors?.code?.message?.toString()}
      isInvalid={!!errors.code}
      label="Verification Code"
      type="number"
      {...register("code")}
      {...props}
    />
  )
}
