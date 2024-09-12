import { tv } from "tailwind-variants"

export const bg = tv({
  base: "w-fit mx-auto",
  variants: {
    color: {
      violet: "from-[#B249F8] via-[#FF1CF7] to-[#B249f8]",
      yellow: "from-[#FFB457] via-[#FF705B] to-[#FFB457]",
      blue: "from-[#0072F5] via-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#01CFEA] via-[#00b7fa] to-[#01CFEA]",
      green: "from-[#17C964] via-[#6FEE8D] to-[#17C964]",
      pink: "from-[#F54C7A] via-[#FF72E1] to-[#F54C7A]",
      foreground:
        " from-[#B4B4B4] via-[#000000] to-[#B4B4B4] dark:from-[#4B4B4B] dark:via-[#FFFFFF] dark:to-[#4B4B4B]",
    },
  },
  defaultVariants: {
    color: "foreground",
  },
  compoundVariants: [
    {
      color: ["violet", "yellow", "blue", "cyan", "green", "pink", "foreground"],
      class: "bg-gradient-to-r bg-clip-text text-transparent",
    },
  ],
})

export const title = tv({
  base: "tracking-tight inline font-bold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "from-[#000000] to-[#B4B4B4] dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      sm: "text-2xl lg:text-4xl",
      md: "text-3xl lg:text-6xl",
      lg: "text-4xl lg:text-8xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: ["violet", "yellow", "blue", "cyan", "green", "pink", "foreground"],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
})

export const subtitle = tv({
  base: "text-lg lg:text-xl",
})
