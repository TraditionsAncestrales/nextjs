import { PostsItem } from "@/components/posts-item";
import { RecordsItems } from "@/components/records-items";
import { getEventRecords, getPageRecord } from "@/lib/pocketbase/api";
import { imageFrom, itemFromEvent, itemFromPost, itemFromService } from "@/lib/pocketbase/utils";
import { Suspense } from "react";
import { TheEvents } from "./_/the-events";
import { TheTestimonies } from "./_/the-testimonies";

// MAIN ************************************************************************************************************************************
export default async function KnowledgePage({ params }: KnowledgePageProps) {
  const { knowledge } = await params;
  const page = await getPageRecord(knowledge);
  const isHome = knowledge === "traditions-ancestrales";
  const post = { ...(await itemFromPost(page.post)), ...(isHome ? { title: "Bienvenue" } : {}) };
  const services = await Promise.all((page.services ?? []).map((service) => itemFromService(service)));
  const trainings = services.filter(({ extra: { category } }) => category === "training");
  const workshops = services.filter(({ extra: { category } }) => category === "workshop");
  const consultations = services.filter(({ extra: { category } }) => category === "consult");
  const testimoniesImage = await imageFrom(page.testimoniesImage);
  const eventRecords = await getEventRecords(knowledge);
  const events = await Promise.all(eventRecords.map(itemFromEvent));

  const count = +(consultations.length > 0) + +(workshops.length > 0) + +(trainings.length > 0);

  return (
    <>
      <PostsItem post={post} border="top" className={{ ASIDE: "!max-w-sm" }} />{" "}
      <RecordsItems title="Consultation" items={consultations} intent={count > 1 ? "primary" : "light"} />
      <RecordsItems title="Atelier" items={workshops} intent="light" />
      <RecordsItems title="Formation" items={trainings} intent={count === 3 ? "white" : "light"} />
      <Suspense>
        <TheEvents items={events} intent={count > 0 ? "primary" : "light"} />
      </Suspense>
      <TheTestimonies image={testimoniesImage} />
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type KnowledgePageProps = {
  params: Promise<{ knowledge: string }>;
};
