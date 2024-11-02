import type { Item } from "@/lib/pocketbase/utils";
import Image from "next/image";
import Link from "next/link";
import { BUTTON } from "./ui/button";
import Section, { type SectionProps } from "./ui/section";
import Title from "./ui/title";

export default function PostsItem({ intent = "white", post, ...rest }: PostsItemProps) {
  // VARS **********************************************************************************************************************************
  if (!post) return;
  const { href, image, text, title } = post;
  const sizes = `(min-width: 1536px) 42rem, (min-width: 1280px) 36rem, (min-width: 1024px) 28rem, (min-width: 768px) 20rem (min-width: 640px) 36rem, 100vw`;

  return (
    <Section
      intent={intent}
      {...rest}
      Header={<Title text={title} className="mb-8 xl:hidden" />}
      Aside={<Image {...image} alt={image.alt} sizes={sizes} className="relative shadow-lg shadow-black/50" />}
      className={{ ASIDE: "relative", CONTENT: "md:items-stretch" }}
    >
      <Title text={title} className="hidden self-start xl:inline-flex" />
      <article dangerouslySetInnerHTML={{ __html: text }} />
      <Link href={href} className={BUTTON({ intent: intent === "primary" ? "secondary" : "primary", className: "self-end" })}>
        {" "}
        En savoir plus{" "}
      </Link>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type PostsItemProps = SectionProps & { post?: Item };
