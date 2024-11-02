import Section, { type SectionProps } from "@/components/ui/section";
import Title from "@/components/ui/title";
import TheNewsletterForm from "./the-newsletter.form";

// MAIN ************************************************************************************************************************************
export async function TheNewsletter(props: TheNewsletterProps) {
  return (
    <Section {...props} Header={<Title text="Newsletter" className="mb-8" />}>
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-12">
        <p className="text-justify lg:max-w-sm xl:max-w-lg">
          Pour recevoir chaque semaine mon bulletin, c&apos;est simple, vous avez juste à saisir votre courriel :
        </p>
        <TheNewsletterForm className="flex-1" />
      </div>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheNewsletterProps = SectionProps;
