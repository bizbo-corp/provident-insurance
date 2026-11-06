import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

/** The live site's `.button` family. Pill shaped, dims on hover, no shadow. */
const buttonVariants = cva(
  "inline-block rounded-full no-underline hover:opacity-75",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        outline: "border border-primary bg-transparent text-dark-grey",
        white: "bg-white text-primary",
      },
      size: {
        default: "px-4 py-2 md:px-8 md:py-3",
        wide: "px-12 py-2 md:py-3",
        small: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
