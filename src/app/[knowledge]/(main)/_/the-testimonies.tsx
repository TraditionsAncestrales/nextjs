import Section, { type SectionProps } from "@/components/ui/section";
import Title from "@/components/ui/title";
import type { TestimoniesRecord } from "@/lib/pocketbase/schemas";
import type { Image as ImageData } from "@/lib/pocketbase/utils";
import Image from "next/image";
import TheTestimoniesCarousel from "./the-testimonies.carousel";

// MAIN ************************************************************************************************************************************
export default function TheTestimonies({ image, items, ...rest }: TheTestimoniesProps) {
  if (items.length === 0) return;

  return (
    <Section className="relative" {...rest} Header={<Title text="Témoignages" className="z-10" />}>
      {image && <Image {...image} className="absolute inset-0 h-full object-cover" />}
      <TheTestimoniesCarousel items={items} className="pointer-events-none relative h-[28rem] w-full" />
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheTestimoniesProps = SectionProps & { image?: ImageData; items: Pick<TestimoniesRecord, "author" | "text" | "title">[] };
