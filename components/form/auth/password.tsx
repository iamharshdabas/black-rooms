"use client"

import { Input, InputProps } from "@nextui-org/input"
import { useFormContext } from "react-hook-form"

export function AuthPassword({ ...props }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Input
      errorMessage={errors?.password?.message?.toString()}
      isInvalid={!!errors.password}
      label="Password"
      type="password"
      {...register("password")}
      {...props}
    />
  )
}
