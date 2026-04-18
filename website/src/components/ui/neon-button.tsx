import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button-variants";

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

export { Button };
