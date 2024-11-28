import { Section, type SectionProps } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { getTestimonyRecords } from "@/lib/pocketbase/api";
import type { Image as ImageData } from "@/lib/pocketbase/utils";
import { Image } from "@unpic/react";
import { TheTestimoniesCarousel } from "./the-testimonies.carousel";

// PROPS ***********************************************************************************************************************************
export async function TheTestimonies({ image, ...rest }: TheTestimoniesProps) {
  const items = await getTestimonyRecords();

  return (
    <Section className="relative" {...rest} header={<Title text="Témoignages" className="z-10" />}>
      {image && <Image {...image} breakpoints={[320]} sizes="100vw" className="absolute inset-0 h-full scale-105 blur-sm" />}
      <div className="relative h-[28rem] w-full">
        <TheTestimoniesCarousel items={items} />
      </div>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheTestimoniesProps = SectionProps & { image?: ImageData };
