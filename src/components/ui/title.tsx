import { tv } from "tailwind-variants";
import IconStain from "~icons/ta/stain.jsx";

// STYLES **********************************************************************************************************************************
export const TITLE = tv({
  slots: {
    ROOT: `relative inline-flex`,
    STAIN: `absolute left-0`,
    TEXT: `font-heading relative inline-flex uppercase`,
  },
});

const { ROOT, STAIN, TEXT } = TITLE();

// MAIN ************************************************************************************************************************************
export default function Title({ className = {}, text }: TitleProps) {
  if (!text) return;

  const C = typeof className === "string" ? { ROOT: className } : className;

  return (
    <div className={ROOT({ className: C.ROOT })}>
      <IconStain width="100%" height="100%" className={STAIN({ className: C.STAIN ?? "-top-1 text-primary-300" })} />
      <h4 className={TEXT({ className: C.TEXT ?? "px-6 py-2 text-3xl" })}>{text}</h4>
    </div>
  );
}

// TYPES ***********************************************************************************************************************************
export type TitleProps = {
  className?: Partial<(typeof TITLE)["slots"]> | string;
  text?: string;
};
