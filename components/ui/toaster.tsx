"use client"

import { CircleAlertIcon, CircleCheckIcon, CircleHelpIcon, CircleXIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type Props = React.ComponentProps<typeof Sonner>

export function Toaster({ ...props }: Props) {
  const { theme } = useTheme()

  return (
    <Sonner
      closeButton
      icons={{
        info: <CircleHelpIcon />,
        success: <CircleCheckIcon />,
        warning: <CircleAlertIcon />,
        error: <CircleXIcon />,
      }}
      theme={theme as Props["theme"]}
      toastOptions={{
        classNames: {
          info: "bg-primary",
          success: "bg-success text-background",
          warning: "bg-warning text-background",
          error: "bg-danger",
          toast: "rounded-2xl gap-4",
          closeButton: "bg-inherit",
        },
      }}
      visibleToasts={8}
      {...props}
    />
  )
}
