import type { Item } from "@/lib/pocketbase/utils";
import Image from "next/image";
import Link from "next/link";
import RecordsCarousel from "./records-carousel";
import { BUTTON } from "./ui/button";
import Features from "./ui/features";
import Section, { type SectionProps } from "./ui/section";
import Title from "./ui/title";

// MAIN ************************************************************************************************************************************
export default function RecordsItems({ children, intent = "white", items = [], title: singular, ...rest }: RecordsItemsProps) {
  const hasSome = items.length > 0;
  if (!hasSome && !children) return;

  const isSingle = items.length === 1;
  const title = `${singular}${isSingle ? "" : "s"}`;
  const { features, href, image, text } = items[0] ?? {};

  return isSingle ? (
    <Section
      intent={intent}
      {...rest}
      Header={<Title text={title} className="mb-8 xl:hidden" />}
      Aside={<Image {...image} alt={image.alt} className="relative shadow-lg shadow-black/50" />}
    >
      <Title text={title} className="hidden self-start xl:inline-flex" />
      <Features intent={intent} features={features} />
      <article dangerouslySetInnerHTML={{ __html: text }} />
      <Link href={href} className={BUTTON({ intent: intent === "primary" ? "secondary" : "primary", class: "self-end" })}>
        En savoir plus
      </Link>
    </Section>
  ) : (
    <Section intent={intent} expanded={hasSome} {...rest} Header={<Title text={title} className="mb-8" />}>
      {hasSome ? <RecordsCarousel items={items} className="w-full" /> : children}
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type RecordsItemsProps = { items: Item[]; title: string } & SectionProps;
