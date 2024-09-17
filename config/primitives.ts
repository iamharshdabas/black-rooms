import { tv } from "tailwind-variants"

export const textGradient = tv({
  base: "w-fit",
  variants: {
    color: {
      violet: "from-[#B249F8] via-[#FF1CF7] to-[#B249f8]",
      yellow: "from-[#FFB457] via-[#FF705B] to-[#FFB457]",
      blue: "from-[#0072F5] via-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#01CFEA] via-[#00b7fa] to-[#01CFEA]",
      green: "from-[#17C964] via-[#6FEE8D] to-[#17C964]",
      pink: "from-[#F54C7A] via-[#FF72E1] to-[#F54C7A]",
      foreground:
        "from-[#B4B4B4] via-[#000000] to-[#B4B4B4] dark:from-[#4B4B4B] dark:via-[#FFFFFF] dark:to-[#4B4B4B]",
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

export const bgGradient = tv({
  base: "absolute w-full ",
  variants: {
    color: {
      divider: "from-divider to-background",
      transparent: "from-transparent to-background",
    },
  },
  defaultVariants: {
    color: "divider",
  },
  compoundVariants: [
    {
      color: ["divider"],
      class:
        "top-0 h-1/2 to-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]",
    },
    {
      color: ["transparent"],
      class: "z-10 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
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
  base: "text-lg lg:text-xl pt-4",
})
