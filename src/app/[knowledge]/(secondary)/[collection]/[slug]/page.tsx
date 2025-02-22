import { Features } from "@/components/ui/features";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { getPostEntries, getPostSingle, getServiceEntries, getServiceSingle } from "@/lib/pocketbase";
import { helpers } from "@/lib/pocketbase/sdk";
import { Image } from "@unpic/react";
import { notFound } from "next/navigation";

// STATIC **********************************************************************************************************************************
export async function generateStaticParams() {
  const [posts, services] = await Promise.all([getPostEntries(), getServiceEntries()]);
  return [...posts, ...services];
}

// CONST ***********************************************************************************************************************************
const sizes = `(min-width: 1536px) 42rem, (min-width: 1280px) 36rem, (min-width: 1024px) 28rem, (min-width: 768px) 20rem (min-width: 640px) 36rem, 100vw`;

// MAIN ************************************************************************************************************************************
export default async function KnowledgeCollectionSlugPage({ params }: KnowledgeCollectionSlugPageProps) {
  const { collection, slug } = await params;
  const single = await (collection === "articles" ? getPostSingle(slug, helpers) : getServiceSingle(slug, helpers));
  if (!single) notFound();
  const { features, image, text, title } = single;

  return (
    <Section
      asideRight
      border="all"
      intent="white"
      header={<Title text={title} className="mb-8" />}
      aside={
        <>
          {image && <Image {...image} alt={image.alt} sizes={sizes} className="relative shadow-lg shadow-black/50" />}
          <Features features={features} />
        </>
      }
    >
      <article dangerouslySetInnerHTML={{ __html: text }} />
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type KnowledgeCollectionSlugPageProps = {
  params: Promise<{ collection: string; knowledge: string; slug: string }>;
};
