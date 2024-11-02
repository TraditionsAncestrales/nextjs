import { BUTTON } from "@/components/ui/button";
import Section from "@/components/ui/section";
import Title from "@/components/ui/title";
import type { Item } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

// STYLES **********************************************************************************************************************************
const cAbs = `absolute inset-0 w-full h-full transition-transform duration-500`;
// const cItem = `hidden w-1/4 h-[600px] relative overflow-hidden group/k flex-col justify-center items-center lg:flex`;

// MAIN ************************************************************************************************************************************
export default function TheOtherKnowledges({ knowledges }: TheOtherKnowledgesProps) {
  if (knowledges.length === 0) return;

  return (
    <div className="-my-16 lg:flex">
      {knowledges.map(({ href, image, slug, text, title }, i) => (
        <Fragment key={i}>
          <Section
            intent="primary"
            className={cn("lg:hidden", { "pt-16": i === 0, "pb-20": i === knowledges.length - 1 })}
            data-theme={slug}
            Header={<Title text={title} className="mb-8" />}
            Aside={
              <Image
                {...image}
                alt={image.alt}
                sizes="(min-width: 768px) 20rem, (min-width: 640px) 36rem, 100vw"
                className="relative aspect-[3/2] object-cover shadow-lg shadow-black/50"
              />
            }
          >
            <article dangerouslySetInnerHTML={{ __html: text }} />
            <Link href={href} className={BUTTON({ intent: "secondary", className: "self-end" })}>
              En savoir plus
            </Link>
          </Section>

          <Link
            href={href}
            className="group/k relative hidden h-[600px] w-1/4 flex-col items-center justify-center overflow-hidden lg:flex"
            data-theme={slug}
          >
            <Image {...image} alt={image.alt} sizes="25vw" className={cn(cAbs, "-z-20 object-cover group-hover/k:scale-105")} />
            <div className={cn(cAbs, "-z-10 translate-y-full bg-primary group-hover/k:translate-y-0")}>
              <div className="mt-[150px] px-4 text-center">
                <article dangerouslySetInnerHTML={{ __html: text }} />
              </div>
            </div>
            <Title
              text={title}
              className={{
                ROOT: "transition-transform duration-500 group-hover/k:-translate-y-[200px]",
                STAIN: "text-primary",
                TEXT: "px-12 py-6 text-4xl text-black",
              }}
            />
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheOtherKnowledgesProps = { knowledges: Item[] };
