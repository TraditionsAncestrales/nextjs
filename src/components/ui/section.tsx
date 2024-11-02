import type { Intent } from "@/styles/ui";
import type { PropsWithChildren, ReactNode } from "react";
import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
export const SECTION = tv({
  slots: {
    ASIDE: `empty:hidden flex-none w-full flex flex-col gap-8 max-w-xl md:max-w-xs lg:max-w-md xl:max-w-xl 2xl:max-w-2xl`,
    BORDER: `relative w-full h-16 [mask-image:url(/border.svg)]`,
    CONTENT: `w-full flex flex-col items-center gap-8 md:flex-row md:items-start lg:gap-12`,
    HEADER: ``,
    MAIN: `flex-1 w-full flex flex-col gap-8 items-start`,
    ROOT: `overflow-hidden py-12`,
    WRAPPER: ``,
  },
  variants: {
    asideRight: {
      true: { ASIDE: `md:order-2` },
    },
    border: {
      all: { ROOT: `py-4` },
      bottom: { ROOT: `pb-4` },
      none: {},
      top: { ROOT: `pt-4` },
    },
    expanded: {
      true: { HEADER: `mx-4`, WRAPPER: `w-full` },
      false: { ROOT: `px-6 md:px-12`, WRAPPER: `container mx-auto` },
    },
    intent: {
      dark: { BORDER: `bg-neutral-800`, ROOT: `bg-neutral-800` },
      light: { BORDER: `bg-neutral-200`, ROOT: `bg-neutral-200` },
      primary: { BORDER: `bg-primary`, ROOT: `bg-primary` },
      secondary: { BORDER: `bg-neutral-600`, ROOT: `bg-neutral-600` },
      white: { BORDER: `bg-white`, ROOT: `bg-white` },
    },
  },
});
const { ASIDE, BORDER, CONTENT, HEADER, MAIN, ROOT, WRAPPER } = SECTION();

export default function Section(props: SectionProps) {
  // PROPS *********************************************************************************************************************************
  const { Aside, asideRight = false, border = "none", children, className = {}, expanded = false, Header, intent = "white", ...r } = props;

  // VARS **********************************************************************************************************************************
  const hasBorderBottom = ["all", "bottom"].includes(border);
  const hasBorderTop = ["all", "top"].includes(border);

  // STYLES ********************************************************************************************************************************
  const C = typeof className === "string" ? { ROOT: className } : className;

  return (
    <>
      {hasBorderTop && <div className={BORDER({ intent, className: ["-mt-16", C.BORDER] })} />}
      <section {...r} className={ROOT({ border, expanded, intent, className: C.ROOT })}>
        <div className={WRAPPER({ expanded, className: C.WRAPPER })}>
          {Header && <div className={HEADER({ expanded, className: C.HEADER })}>{Header}</div>}
          <div className={CONTENT({ className: C.CONTENT })}>
            {Aside && <aside className={ASIDE({ asideRight, className: C.ASIDE })}>{Aside}</aside>}
            <div className={MAIN({ className: C.MAIN })}>{children}</div>
          </div>
        </div>
      </section>
      {hasBorderBottom && <div className={BORDER({ intent, className: ["rotate-180", C.BORDER] })} />}
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type SectionProps = PropsWithChildren<{
  Aside?: ReactNode;
  asideRight?: boolean;
  border?: "all" | "bottom" | "none" | "top";
  className?: Partial<(typeof SECTION)["slots"]> | string;
  expanded?: boolean;
  Header?: ReactNode;
  intent?: Intent;
}>;
