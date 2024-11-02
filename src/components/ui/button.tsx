import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { tv, type VariantProps } from "tailwind-variants";
import { bg, disabledBg, focusRing, hoverBg, Intent, text } from "@/styles/ui";

export const btnIntent = (intent: Intent) => [bg(intent), hoverBg(intent), disabledBg(intent), focusRing(intent)].join(" ");

export const BUTTON = tv({
  base: `inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-md text-sm font-medium ring-offset-background transition-colors 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50 
  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
  variants: {
    intent: {
      dark: [text("white"), btnIntent("dark")],
      light: [text("dark"), btnIntent("light")],
      primary: [text("white"), btnIntent("primary")],
      secondary: [text("white"), btnIntent("secondary")],
      white: [text("dark"), btnIntent("white")],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof BUTTON> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, intent, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(BUTTON({ intent, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
