"use client";

import { type CarouselApi } from "@/components/ui/carousel";
import type { Item } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import { TITLE } from "@/styles/ui";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BUTTON } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Features from "./ui/features";

// MAIN ************************************************************************************************************************************
export default function RecordsCarousel({ className, items }: RecordsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [justifyCenter, setJustifyCenter] = useState(true);

  useEffect(() => {
    setJustifyCenter(api?.scrollSnapList().length === 1);
    api?.on("reInit", ({ scrollSnapList }) => setJustifyCenter(scrollSnapList().length === 1));
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className={className}>
      <CarouselContent className={cn({ "justify-center": justifyCenter })}>
        {items.map(({ features, href, image, slug, text, title }) => (
          <CarouselItem key={slug} className="mb-2 max-w-96">
            <div className="flex h-full w-full flex-col bg-white shadow-md" data-slug={slug}>
              <Image {...image} width={384} sizes="24rem" objectFit="cover" className="relative aspect-[3/2] flex-none" />
              <div className="flex flex-1 flex-col gap-4 p-4 px-6 sm:px-8">
                <h4 className={TITLE()}>{title}</h4>
                <Features features={features} intent="white" />
                <article dangerouslySetInnerHTML={{ __html: text }} />
                <div className="flex-1" />
                <Link href={href} className={BUTTON({ className: "self-end" })}>
                  En savoir plus
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}

// TYPES ***********************************************************************************************************************************
export type RecordsCarouselProps = { className?: string; items: Item[] };
