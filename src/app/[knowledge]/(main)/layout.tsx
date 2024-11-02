import PostsItem from "@/components/posts-item";
import TheHero from "@/components/the-hero";
import { Toaster } from "@/components/ui/sonner";
import { getLayout } from "@/lib/api";
import TheContact from "./_/the-contact";
import { TheNewsletter } from "./_/the-newsletter";
import TheOtherKnowledges from "./_/the-other-knowledges";

// MAIN ************************************************************************************************************************************
export default async function MainLayout({ children, params }: MainLayoutProps) {
  const { knowledge } = await params;
  const { hero, organizationPost, otherKnowledges } = await getLayout(knowledge);

  return (
    <>
      <TheHero {...hero} className="h-screen" />
      {children}
      {knowledge === "traditions-ancestrales" && <PostsItem post={organizationPost} border="bottom" intent="primary" />}
      <TheOtherKnowledges knowledges={otherKnowledges} />
      <TheNewsletter border="top" intent="primary" />
      {knowledge === "traditions-ancestrales" ? <TheContact intent="light" /> : <PostsItem post={organizationPost} className="mb-4" />}
      <Toaster richColors={true} theme="light" />
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type MainLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ knowledge: string }>;
};
