import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "relative group border text-foreground mx-auto text-center rounded-full",
  {
    variants: {
      variant: {
        default:
          "bg-black hover:bg-black/80 border-[#CCFF00]/20 hover:border-[#CCFF00]/40 text-white hover:text-[#CCFF00]",
        solid:
          "bg-[#CCFF00] hover:bg-[#B8E600] !text-black hover:!text-black border-transparent hover:border-foreground/50 focus:border-transparent focus-visible:border-transparent active:border-transparent transition-all duration-200",
        ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
      },
      size: {
        default: "px-7 py-1.5 ",
        sm: "px-4 py-0.5 ",
        lg: "px-10 py-2.5 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
