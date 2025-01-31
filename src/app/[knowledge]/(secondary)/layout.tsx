// import { PostsItem } from "@/components/posts-item";
// import { TheNewsletter } from "../(main)/_/the-newsletter";
// import { TheOtherKnowledges } from "../(main)/_/the-other-knowledges";
// import { TheHero } from "../_/the-hero";

// MAIN ************************************************************************************************************************************
export default function SecondaryLayout({ children }: SecondaryLayoutProps) {
  // const { knowledge } = await params;

  return (
    <>
      {/* <TheHero params={params} className="h-[50vh]" /> */}
      {children}
      {/* <TheOtherKnowledges knowledge={knowledge} /> */}
      {/* <TheNewsletter border="top" intent="primary" /> */}
      {/* <PostsItem slug="l-association" className="mb-4" /> */}
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type SecondaryLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ knowledge: string }>;
};
