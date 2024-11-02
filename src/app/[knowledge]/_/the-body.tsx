"use client";

import { cn } from "@/lib/utils";
import { useWindowScroll } from "@uidotdev/usehooks";
import { ClassValue } from "tailwind-variants";

// MAIN ************************************************************************************************************************************
export default function TheBody({ children, className, theme }: LayoutProps) {
  const [{ y }] = useWindowScroll();

  return (
    <body className={cn("group overflow-y-auto overflow-x-hidden antialiased", className)} data-scrolled={(y ?? 0) > 0} data-theme={theme}>
      {children}
    </body>
  );
}

// TYPES ***********************************************************************************************************************************
export type LayoutProps = {
  children: React.ReactNode;
  className?: ClassValue;
  theme: string;
};
