"use client";

import type { Item } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import { TITLE } from "@/styles/ui";
import { Image } from "@unpic/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BUTTON } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import { Features } from "./ui/features";

// MAIN ************************************************************************************************************************************
export function RecordsItemsCarousel({ externalLink = false, items = [], removeStale }: RecordsItemsCarouselProps) {
  const filteredItems = useMemo(
    () => items,
    // () => (removeStale ? items.filter(({ stale }) => stale && stale >= new Date().toISOString()) : items),
    [items, removeStale],
  );

  const [api, setApi] = useState<CarouselApi>();
  const [justifyCenter, setJustifyCenter] = useState(false);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    if (!api) return;
    setJustifyCenter(api.scrollSnapList().length === 1);
    setIsSet(true);
    api.on("reInit", ({ scrollSnapList }) => setJustifyCenter(scrollSnapList().length === 1));
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
      <CarouselContent
        className={cn("opacity-0 transition-opacity duration-700", { "justify-center": justifyCenter, "opacity-100": isSet })}
      >
        {filteredItems.map(({ features, href, image, slug, text, title }) => (
          <CarouselItem key={slug} className="mb-2 max-w-96">
            <div className="flex h-full w-full flex-col bg-white shadow-md">
              <Image {...image} alt={image.alt} height={256} width={384} breakpoints={[384, 768]} sizes="24rem" className="flex-none" />
              <div className="flex flex-1 flex-col gap-4 p-4 px-6 sm:px-8">
                <h4 className={TITLE()}>{title}</h4>
                <Features features={features} intent="white" />
                <article dangerouslySetInnerHTML={{ __html: text }} className="prose prose-p:my-1 prose-p:leading-normal" />
                <div className="flex-1" />
                <div className="flex justify-end gap-2">
                  {externalLink ? (
                    <a href={href} target="_blank" className={BUTTON()}>
                      En savoir plus
                    </a>
                  ) : (
                    <Link href={href} className={BUTTON()}>
                      En savoir plus
                    </Link>
                  )}
                </div>
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
export type RecordsItemsCarouselProps = {
  externalLink?: boolean;
  items: Item[];
  removeStale?: boolean;
};
