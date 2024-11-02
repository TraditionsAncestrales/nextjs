import type { Image as ImageData } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ClassValue } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
const cMask = `[mask-image:url(/splash.webp)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]`;

// MAIN ************************************************************************************************************************************
export default function TheHero({ className, image, subtitle, title }: TheHeroProps) {
  return (
    <div className={cn("relative flex w-full items-center justify-center bg-cover bg-center font-bold", className)}>
      <Image alt={image.alt} src={image.src} priority fill className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative py-40 text-center uppercase tracking-widest text-white">
        <div className={cn("absolute inset-0 bg-primary", cMask)}></div>
        <h1 className="relative my-2 max-w-2xl text-4xl sm:text-7xl">{title}</h1>
        <h2 className="relative text-xs">{subtitle}</h2>
      </div>
    </div>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheHeroProps = { className?: ClassValue; subtitle: string; title: string; image: ImageData };
