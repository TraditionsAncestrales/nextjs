import {
  getKnowledgeCollectionSlugPageEntriesRecords,
  getKnowledgeCollectionSlugPageRecords,
  getKnowledgePageEntriesRecords,
  getKnowledgePageRecords,
  getLayoutRecords,
  getShopPageRecords,
} from "@/lib/pocketbase/api";
import {
  entryFromKnowledge,
  entryFromPost,
  entryFromService,
  imageFrom,
  itemFromEvent,
  itemFromKnowledge,
  itemFromPost,
  itemFromProduct,
  itemFromService,
  pathFromKnowledge,
  pathFromPost,
  pathFromService,
  singleFromPost,
  singleFromService,
} from "@/lib/pocketbase/utils";

// LAYOUT **********************************************************************************************************************************
export const getLayout = async (knowledge: string) => {
  const { config, ...data } = await getLayoutRecords();
  const knowledges = data.knowledges.map((knowledge) => itemFromKnowledge(knowledge));
  const organizationPost = itemFromPost(data.organizationPost);

  const currentKnowledge = knowledges.find(({ slug }) => slug === knowledge);
  if (!currentKnowledge) throw new Error("Unknown knowledge");
  const otherKnowledges = knowledges.filter(({ slug }) => slug !== knowledge);
  const hero = { image: currentKnowledge.image, subtitle: config.title, title: currentKnowledge.title };

  return { config, hero, organizationPost, otherKnowledges };
};

// KNOWLEDGE PAGE **************************************************************************************************************************
export async function getKnowledgePageEntries() {
  const { knowledges } = await getKnowledgePageEntriesRecords();
  return knowledges.map((knowledge) => entryFromKnowledge(knowledge));
}

export async function getKnowledgePagePaths() {
  const { knowledges } = await getKnowledgePageEntriesRecords();
  return knowledges.map((knowledge) => pathFromKnowledge(knowledge));
}

export async function getKnowledgePage(knowledge: string | undefined) {
  const isHome = knowledge === undefined;
  const { page, ...data } = await getKnowledgePageRecords(knowledge ?? "traditions-ancestrales");
  const events = data.events.map((event) => itemFromEvent(event));
  const post = isHome ? { ...itemFromPost(page.post), title: "Bienvenue" } : itemFromPost(page.post);
  const services = (page.services ?? []).map((service) => itemFromService(service));
  const trainings = services.filter(({ extra: { category } }) => category === "training");
  const workshops = services.filter(({ extra: { category } }) => category === "workshop");
  const consultations = services.filter(({ extra: { category } }) => category === "consult");
  const testimonies = { image: imageFrom(page.testimoniesImage), items: data.testimonies };
  return { consultations, events, post, testimonies, trainings, workshops };
}

// KNOWLEDGE COLLECTION SLUG PAGE **********************************************************************************************************
export async function getKnowledgeCollectionSlugPageEntries() {
  const { posts, services } = await getKnowledgeCollectionSlugPageEntriesRecords();
  return [...posts.map((post) => entryFromPost(post)), ...services.map((service) => entryFromService(service))];
}

export async function getKnowledgeCollectionSlugPagePaths() {
  const { posts, services } = await getKnowledgeCollectionSlugPageEntriesRecords();
  return [...posts.map((post) => pathFromPost(post)), ...services.map((service) => pathFromService(service))];
}

export const getKnowledgeCollectionSlugPage = async (collection: string, slug: string) => {
  const { single } = await getKnowledgeCollectionSlugPageRecords(collection, slug);
  if (!single) return { single };
  return { single: single.collectionName === "posts" ? singleFromPost(single) : singleFromService(single) };
};

// SHOP PAGE *******************************************************************************************************************************
export const getShopPage = async () => {
  const data = await getShopPageRecords();
  const products = data.products.map((product) => itemFromProduct(product));
  return { products };
};
