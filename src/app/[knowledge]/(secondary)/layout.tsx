import PostsItem from "@/components/posts-item";
import TheHero from "@/components/the-hero";
import { getLayout } from "@/lib/api";
import { TheNewsletter } from "../(main)/_/the-newsletter";
import TheOtherKnowledges from "../(main)/_/the-other-knowledges";

// MAIN ************************************************************************************************************************************
export default async function SecondaryLayout({ children, params }: SecondaryLayoutProps) {
  const { knowledge } = await params;
  const { hero, organizationPost, otherKnowledges } = await getLayout(knowledge);

  return (
    <>
      <TheHero {...hero} className="h-[50vh]" />
      {children}
      <TheOtherKnowledges knowledges={otherKnowledges} />
      <TheNewsletter border="top" intent="primary" />
      <PostsItem post={organizationPost} className="mb-4" />
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type SecondaryLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ knowledge: string }>;
};
