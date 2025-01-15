"use cache";
// import { getKnowledgeEntries } from "@/lib/pocketbase/api";
import { PostsItem } from "@/components/posts-item";
import { RecordsItems } from "@/components/records-items";
import { getEvents, getPage } from "@/lib/pocketbase";
import { helpers } from "@/lib/pocketbase/sdk";
import { Suspense } from "react";
import { TheEvents } from "./_/the-events";
import { TheTestimonies } from "./_/the-testimonies";

// STATIC **********************************************************************************************************************************
// export async function generateStaticParams() {
//   const knowledges = await getKnowledgeEntries();
//   return [{ knowledge: "traditions-ancestrales" }, ...knowledges];
// }

// MAIN ************************************************************************************************************************************
export default async function KnowledgePage({ params }: KnowledgePageProps) {
  const { knowledge } = await params;

  const [{ consultations, post, testimoniesImage, trainings, workshops }, allEvents] = await Promise.all([
    getPage(knowledge, helpers),
    getEvents(helpers),
  ]);

  const isHome = knowledge === "traditions-ancestrales";
  const events = isHome ? allEvents : allEvents.filter(({ slug }) => slug === knowledge);
  const count = +(consultations.length > 0) + +(workshops.length > 0) + +(trainings.length > 0);

  return (
    <div>
      <PostsItem post={post} border="top" className={{ ASIDE: "!max-w-sm" }} />
      <RecordsItems title="Consultation" items={consultations} intent={count > 1 ? "primary" : "light"} />
      <RecordsItems title="Atelier" items={workshops} intent="light" />
      <RecordsItems title="Formation" items={trainings} intent={count === 3 ? "white" : "light"} />
      <Suspense>
        <TheEvents items={events} intent={count > 0 ? "primary" : "light"} />
      </Suspense>
      {isHome && <TheTestimonies image={testimoniesImage} />}
    </div>
  );
}

// TYPES ***********************************************************************************************************************************
export type KnowledgePageProps = {
  params: Promise<{ knowledge: string }>;
};
