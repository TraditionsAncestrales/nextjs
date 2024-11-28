import { BUTTON } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { getKnowledgeRecords } from "@/lib/pocketbase/api";
import { itemFromKnowledge } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import { Image } from "@unpic/react";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

// STYLES **********************************************************************************************************************************
const cAbs = `absolute inset-0 w-full h-full transition-transform duration-500`;
// const cItem = `hidden w-1/4 h-[600px] relative overflow-hidden group/k flex-col justify-center items-center lg:flex`;

// MAIN ************************************************************************************************************************************
export async function TheOtherKnowledges({ knowledge }: TheOtherKnowledgesProps) {
  const knowledgeRecords = await getKnowledgeRecords();
  const knowledges = await Promise.all(knowledgeRecords.map(itemFromKnowledge));
  const otherKnowledges = knowledges.filter(({ slug }) => slug !== knowledge);

  return (
    <div className="-my-16 lg:flex">
      {otherKnowledges.map(({ href, image, slug, text, title }, i) => (
        <Fragment key={i}>
          <Section
            intent="primary"
            className={cn("lg:hidden", { "pt-16": i === 0, "pb-20": i === knowledges.length - 1 })}
            data-theme={slug}
            header={<Title text={title} className="mb-8" />}
            aside={
              <Image
                {...image}
                breakpoints={[320, 640, 960, 1280, 1600, 1920]}
                sizes="(min-width: 768px) 20rem, calc(100vw - 7rem - 15px)"
                className="relative aspect-[3/2] shadow-lg shadow-black/50"
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
            <Image {...image} breakpoints={[320, 640, 960, 1280]} sizes="25vw" className={cn(cAbs, "-z-20 group-hover/k:scale-105")} />
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
export type TheOtherKnowledgesProps = { knowledge: string };
