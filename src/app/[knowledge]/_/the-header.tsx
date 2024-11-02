import { cn } from "@/lib/utils";
import Link from "next/link";
import { tv, type ClassValue } from "tailwind-variants";
import IconLogo from "~icons/ta/logo.jsx";
// import NavBurger from "./nav-burger.svelte";

export default function TheHeader({ className }: TheHeaderProps) {
  // VARS **********************************************************************************************************************************
  const navs = [
    { id: "a-propos", text: "A propos", href: "/articles/la-fondatrice" },
    { id: "chamanisme", text: "Chamanisme", href: "/chamanisme" },
    { id: "reves", text: "Rêves", href: "/reves" },
    { id: "reiki", text: "Reiki", href: "/reiki" },
    { id: "tarot", text: "Tarot", href: "/tarot" },
    { id: "boutique", text: "Boutique", href: "/boutique" },
  ].map((item) => ({ ...item, isActive: false }));

  const leftNavs = navs.slice(0, Math.ceil(0.5 * navs.length));
  const rightNavs = navs.slice(Math.ceil(0.5 * navs.length));

  // STYLES ********************************************************************************************************************************
  const NAV_LINK = tv({
    base: `text-xs font-bold p-2 uppercase rounded group-data-top:text-white hover:bg-primary hover:text-white`,
    variants: { isActive: { true: "bg-primary text-white" } },
  });

  return (
    <div className={cn(`bg-white p-2 group-data-scrolled:bg-white group-data-scrolled:shadow-lg sm:bg-transparent`, className)}>
      <nav className="container mx-auto flex items-center justify-between sm:justify-center sm:group-data-scrolled:justify-between">
        <Link href="/" aria-label="Retour à l'accueil" className="flex items-center gap-1 group-data-scrolled:flex sm:hidden">
          <IconLogo name="logo" className="h-12 w-12 fill-neutral-800 text-primary hover:text-primary-400" />
          <hgroup className="font-heading uppercase">
            <h3 className="text-sm leading-none text-neutral-800">Traditions</h3>
            <h4 className="text-xs leading-none text-neutral-500">Ancestrales</h4>
          </hgroup>
        </Link>

        {/* <NavBurger client:media="(max-width: 640px)" navs={navs} className="sm:hidden"> */}
        {/* <Icon name="ph:list" /> */}
        {/* </NavBurger> */}
        <ul className="hidden items-center sm:flex">
          {leftNavs.map(({ href, isActive, text }) => (
            <li key={text} className="mx-1">
              <a href={href} className={NAV_LINK({ isActive })}>
                {text}
              </a>
            </li>
          ))}
          <li>
            <Link href="/">
              <IconLogo
                aria-label="Retour à l'accueil"
                className="mx-8 h-20 w-20 fill-neutral-800 text-primary hover:text-primary-400 group-data-scrolled:hidden"
              />
            </Link>
          </li>
          {rightNavs.map(({ href, id, isActive, text }) => (
            <li key={id} className="mx-1">
              <Link href={href} className={NAV_LINK({ isActive })}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheHeaderProps = { className: ClassValue };
