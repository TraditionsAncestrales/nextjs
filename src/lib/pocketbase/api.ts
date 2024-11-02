import { select } from "zod-pocketbase";

import {
  zConfigRecord,
  zEventsRecord,
  zImagesRecord,
  zKnowledgesRecord,
  zPagesRecord,
  zPlacesRecord,
  zPostsRecord,
  zProductsRecord,
  zServicesRecord,
  zTestimoniesRecord,
} from "@/lib/pocketbase/schemas";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { getRecord, getRecords } from "./sdk";

// SHARED **********************************************************************************************************************************
export const toOmit = { collectionId: true, collectionName: true, created: true, updated: true } as const;
export const zImage = select(zImagesRecord, ["alt", "height", "id", "src", "width"]);
export const zKnowledgeSlug = select(zKnowledgesRecord, ["slug"]);
export const zPlacesNames = select(zPlacesRecord, ["name"]).array();

// CONFIG **********************************************************************************************************************************
export async function getConfigRecord() {
  "use cache";
  cacheTag("config");
  const zConfig = zConfigRecord.omit(toOmit);
  return getRecord({ collection: "config", id: "fedcba987654321" }, { schema: zConfig });
}

// EVENT ***********************************************************************************************************************************
export async function getEventRecords(knowledge: string) {
  "use cache";
  cacheTag("events");
  const zEvent = select(zEventsRecord, ["excerpt", "from", "name", "slug", "to", "url"], {
    image: zImage,
    places: zPlacesNames,
    service: select(zServicesRecord, ["name"]),
  });

  const eventFilter = knowledge !== "traditions-ancestrales" ? `service.knowledge.slug="${knowledge}"` : "";
  const { items } = await getRecords("events", { schema: zEvent, filter: eventFilter });
  return items;
}

// KNOWLEDGE *******************************************************************************************************************************
export async function getKnowledgeRecords() {
  "use cache";
  cacheTag("knowledges");
  const zKnowledge = select(zKnowledgesRecord, ["name", "slug", "text"], { image: zImage });
  const { items } = await getRecords("knowledges", { schema: zKnowledge });
  return items;
}

export async function getKnowledgeEntries() {
  const { items } = await getRecords("knowledges", { schema: zKnowledgeSlug });
  return items;
}

// PAGE ************************************************************************************************************************************
export async function getPageRecord(slug: string) {
  "use cache";
  cacheTag(`page_${slug}`);
  const zPage = select(zPagesRecord, [], {
    post: select(zPostsRecord, ["excerpt", "slug", "title"], {
      image: zImage,
      knowledge: zKnowledgeSlug,
    }),
    services: select(zServicesRecord, ["category", "duration", "excerpt", "name", "price", "slug"], {
      image: zImage,
      knowledge: zKnowledgeSlug,
      places: zPlacesNames,
    })
      .array()
      .optional(),
    testimoniesImage: zImage.optional(),
  });

  return getRecord({ collection: "pages", slug }, { schema: zPage });
}

// POST ************************************************************************************************************************************
export async function getPostRecord(slug: string) {
  "use cache";
  cacheTag(`posts_${slug}`);
  const zPost = select(zPostsRecord, ["collectionName", "excerpt", "slug", "text", "title"], { image: zImage, knowledge: zKnowledgeSlug });
  return getRecord({ collection: "posts", slug }, { schema: zPost });
}

export async function getPostEntries() {
  const zPost = select(zPostsRecord, ["slug"], { knowledge: zKnowledgeSlug });
  const { items } = await getRecords("posts", { schema: zPost });
  return items;
}

// PRODUCT *********************************************************************************************************************************
export async function getProductRecords() {
  "use cache";
  cacheTag(`products`);
  const zProduct = select(zProductsRecord, ["excerpt", "name", "price", "slug", "url"], { image: zImage });
  const { items } = await getRecords("products", { schema: zProduct });
  return items;
}

// SERVICE *********************************************************************************************************************************
export async function getServiceRecord(slug: string) {
  "use cache";
  cacheTag(`services_${slug}`);
  const zService = select(zServicesRecord, ["collectionName", "duration", "name", "price", "text"], {
    image: zImage,
    places: select(zPlacesRecord, ["name"]).array(),
  });
  return getRecord({ collection: "services", slug }, { schema: zService });
}

export async function getServiceEntries() {
  const zService = select(zServicesRecord, ["category", "slug"], { knowledge: zKnowledgeSlug });
  const { items } = await getRecords("services", { schema: zService });
  return items;
}

// TESTIMONY *******************************************************************************************************************************
export async function getTestimonyRecords() {
  "use cache";
  cacheTag(`testimonies`);
  const zTestimony = select(zTestimoniesRecord, ["author", "text", "title"]);
  const { items } = await getRecords("testimonies", { schema: zTestimony });
  return items;
}

// LAYOUT **********************************************************************************************************************************
export async function getLayoutRecords() {
  const [config, knowledges, organizationPost] = await Promise.all([
    getConfigRecord(),
    getKnowledgeRecords(),
    getPostRecord("l-association"),
  ]);
  return { config, knowledges, organizationPost };
}

// KNOWLEDGE PAGE **************************************************************************************************************************
export async function getKnowledgePageEntriesRecords() {
  const knowledges = await getKnowledgeEntries();
  return { knowledges };
}

export async function getKnowledgePageRecords(knowledge: string) {
  const [events, page, testimonies] = await Promise.all([
    getEventRecords(knowledge),
    getPageRecord(knowledge),
    knowledge === "traditions-ancestrales" ? getTestimonyRecords() : [],
  ]);
  return { events, page, testimonies };
}

// KNOWLEDGE COLLECTION SLUG PAGE **********************************************************************************************************
export async function getKnowledgeCollectionSlugPageEntriesRecords() {
  const [posts, services] = await Promise.all([getPostEntries(), getServiceEntries()]);
  return { posts, services };
}

export async function getKnowledgeCollectionSlugPageRecords(collection: string, slug: string) {
  const single = await (collection === "articles" ? getPostRecord(slug) : getServiceRecord(slug));
  return { single };
}

// SHOP PAGE *******************************************************************************************************************************
export async function getShopPageRecords() {
  const products = await getProductRecords();
  return { products };
}
