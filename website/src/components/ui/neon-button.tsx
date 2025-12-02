import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full",
    {
        variants: {
            variant: {
                default: "bg-black hover:bg-black/80 border-[#CCFF00]/20 hover:border-[#CCFF00]/40 text-white hover:text-[#CCFF00]",
                solid: "bg-[#CCFF00] hover:bg-[#B8E600] !text-black hover:!text-black border-transparent hover:border-foreground/50 focus:border-transparent focus-visible:border-transparent active:border-transparent transition-all duration-200",
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
    }
);

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'href'>,
    VariantProps<typeof buttonVariants> { 
    neon?: boolean
    href?: string
    target?: string
    rel?: string
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, href, target, rel, ...props }, ref) => {
        const buttonClasses = cn(buttonVariants({ variant, size }), className)
        const neonEffect = (
            <>
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-[#CCFF00] via-[#CCFF00] to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-[#CCFF00] via-[#CCFF00] to-transparent hidden", neon && "block")} />
            </>
        )

        if (href) {
            return (
                <a
                    href={href}
                    target={target}
                    rel={rel}
                    className={cn(buttonClasses, variant === "solid" && "!text-black hover:!text-black", "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0")}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {neonEffect}
                </a>
            )
        }

        return (
            <button
                className={buttonClasses}
                ref={ref as React.Ref<HTMLButtonElement>}
                {...props}
            >
                {neonEffect}
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };

