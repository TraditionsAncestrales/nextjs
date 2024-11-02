import PostsItem from "@/components/posts-item";
import RecordsItems from "@/components/records-items";
import { getKnowledgePage } from "@/lib/api";
import { Suspense } from "react";
import TheEvents from "./_/the-events";
import TheTestimonies from "./_/the-testimonies";

// MAIN ************************************************************************************************************************************
export default async function KnowledgePage({ params }: KnowledgePageProps) {
  const { knowledge } = await params;
  const { consultations, events, post, testimonies, trainings, workshops } = await getKnowledgePage(knowledge);

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
      <TheTestimonies {...testimonies} />
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type KnowledgePageProps = {
  params: Promise<{ knowledge: string }>;
};
