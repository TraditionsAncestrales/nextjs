"use client";

// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tv, type ClassValue } from "tailwind-variants";
// import ListIcon from "~icons/ph/list.jsx";
import LogoIcon from "~icons/ta/logo.jsx";

// STYLES **********************************************************************************************************************************
// const NAV_BURGER = tv({
//   slots: {
//     ROOT: `p-2 text-sm text-neutral-800 rounded hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200`,
//     LINK: `hover:bg-primary block p-4 px-8 font-bold uppercase text-black hover:text-white`,
//   },
//   variants: {
//     isActive: {
//       true: { LINK: `bg-primary text-white` },
//     },
//   },
// });

const NAV_LINK = tv({
  base: `text-xs font-bold p-2 uppercase rounded group-data-top:text-white hover:bg-primary hover:text-white`,
  variants: { isActive: { true: "bg-primary text-white [view-transition-name:active-page]" } },
});

// MAIN ************************************************************************************************************************************
export function TheHeader({ className }: TheHeaderProps) {
  const [isScrolled, setScrolled] = useState(typeof window !== "undefined" ? window.scrollY > 0 : false);
  const pathname = usePathname();
  const navs = [
    { text: "A propos", href: "/articles/la-fondatrice" },
    { text: "Chamanisme", href: "/chamanisme" },
    { text: "Rêves", href: "/reves" },
    { text: "Reiki", href: "/reiki" },
    { text: "Tarot", href: "/tarot" },
    { text: "Boutique", href: "/boutique" },
  ].map((item) => ({ ...item, isActive: pathname.startsWith(item.href) }));

  const leftNavs = navs.slice(0, Math.ceil(0.5 * navs.length));
  const rightNavs = navs.slice(Math.ceil(0.5 * navs.length));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handler, { capture: false, passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={cn(`group bg-white p-2 data-scrolled:bg-white data-scrolled:shadow-lg sm:bg-transparent`, className)}
      data-scrolled={isScrolled}
    >
      <nav className="container mx-auto flex items-center justify-between sm:justify-center sm:group-data-scrolled:justify-between">
        <Link href="/" aria-label="Retour à l'accueil" className="flex items-center gap-1 group-data-scrolled:flex sm:hidden">
          <LogoIcon className="h-12 w-12 fill-neutral-800 text-primary hover:text-primary-400" />
          <hgroup className="font-heading uppercase">
            <h3 className="text-sm leading-none text-neutral-800">Traditions</h3>
            <h4 className="text-xs leading-none text-neutral-500">Ancestrales</h4>
          </hgroup>
        </Link>
        {/* <NavBurger navs={navs} className="sm:hidden" /> */}
        <ul className="hidden items-center sm:flex">
          {leftNavs.map((nav, i) => (
            <NavItem key={i} {...nav} />
          ))}
          <li>
            {/* aria-current={pathname === "/" ? "page" : undefined}> */}
            <Link href="/">
              <LogoIcon
                aria-label="Retour à l'accueil"
                className="mx-8 h-20 w-20 fill-neutral-800 text-primary hover:text-primary-400 group-data-scrolled:hidden"
              />
            </Link>
          </li>
          {rightNavs.map((nav, i) => (
            <NavItem key={i} {...nav} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

// NAV BURGER ******************************************************************************************************************************
// const { LINK, ROOT } = NAV_BURGER();
// function NavBurger({ className, navs }: NavBurgerProps) {
//   return (
//     <Sheet>
//       <SheetTrigger className={ROOT({ className })}>
//         <ListIcon />
//       </SheetTrigger>
//       <SheetContent>
//         {navs.map(({ href, isActive, text }, i) => (
//           <Link key={i} href={href} className={LINK({ isActive })}>
//             {text}
//           </Link>
//         ))}
//       </SheetContent>
//     </Sheet>
//   );
// }

// NAV ITEM ********************************************************************************************************************************
function NavItem({ href, isActive = false, text }: NavItemProps) {
  return (
    <li className="mx-1" aria-current={isActive ? "page" : undefined}>
      <Link href={href} className={NAV_LINK({ isActive })}>
        {text}
      </Link>
    </li>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheHeaderProps = { className?: ClassValue };
// type NavBurgerProps = { className: string; navs: Nav[] };
type NavItemProps = { href: string; isActive?: boolean; text: string };
// type Nav = { isActive: boolean; href: string; text: string };
