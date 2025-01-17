import { getPostItem } from "@/lib/pocketbase";
import { helpers } from "@/lib/pocketbase/sdk";
import { type Item } from "@/lib/pocketbase/utils";
import { Image } from "@unpic/react";
import Link from "next/link";
import { BUTTON } from "./ui/button";
import { Section, type SectionProps } from "./ui/section";
import { Title } from "./ui/title";

// MAIN ************************************************************************************************************************************
export async function PostsItem({ intent = "white", post, slug, ...rest }: PostsItemProps) {
  if (slug) post = await getPostItem(slug, helpers);
  if (!post) return;
  const { href, image, text, title } = post;

  const sizes = [
    "(min-width: 1536px) 42rem",
    "(min-width: 1280px) 36rem",
    "(min-width: 1024px) 28rem",
    "(min-width: 768px) 20rem",
    "calc(100vw - 7rem - 15px)",
  ].join(", ");

  return (
    <Section
      intent={intent}
      {...rest}
      header={<Title text={title} className="mb-8 xl:hidden" />}
      aside={<Image {...image} breakpoints={[320, 640, 960, 1280, 1600]} sizes={sizes} className="relative shadow-lg shadow-black/50" />}
    >
      <Title text={title} className="hidden self-start xl:inline-flex" />
      <article dangerouslySetInnerHTML={{ __html: text }} />
      <Link href={href} className={BUTTON({ intent: intent === "primary" ? "secondary" : "primary", className: "self-end" })}>
        En savoir plus
      </Link>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type PostsItemProps = SectionProps & { post?: Item; slug?: string };
