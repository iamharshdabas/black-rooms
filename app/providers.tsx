"use client"
import { ClerkProvider } from "@clerk/nextjs"
import { NextUIProvider } from "@nextui-org/system"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"

export interface Props {
  children: ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  const router = useRouter()

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}
