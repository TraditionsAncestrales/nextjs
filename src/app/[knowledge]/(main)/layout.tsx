"use cache";

import { PostsItem } from "@/components/posts-item";
import { Toaster } from "@/components/ui/sonner";
import { TheHero } from "../_/the-hero";
import TheContact from "./_/the-contact";
import { TheNewsletter } from "./_/the-newsletter";
import { TheOtherKnowledges } from "./_/the-other-knowledges";

// MAIN ************************************************************************************************************************************
export default async function MainLayout({ children, params }: MainLayoutProps) {
  const { knowledge } = await params;

  return (
    <>
      <TheHero params={params} className="h-screen" />
      {children}
      {knowledge === "traditions-ancestrales" && <PostsItem slug="l-association" border="bottom" intent="primary" />}
      <TheOtherKnowledges knowledge={knowledge} />
      <TheNewsletter border="top" intent="primary" />
      {knowledge === "traditions-ancestrales" ? <TheContact intent="light" /> : <PostsItem slug="l-association" className="mb-4" />}
      <Toaster richColors={true} theme="light" />
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type MainLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ knowledge: string }>;
};
