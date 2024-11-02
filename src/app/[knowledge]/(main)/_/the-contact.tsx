"use client";

import Section, { type SectionProps } from "@/components/ui/section";
import Title from "@/components/ui/title";
import dynamic from "next/dynamic";
import TheContactForm from "./the-contact.form";

const TheContactMap = dynamic(() => import("./the-contact.map"), { ssr: false });

// MAIN ************************************************************************************************************************************
export default function TheContact(props: TheContactProps) {
  return (
    <Section className="relative" {...props} Header={<Title text="Me contacter" className="mb-8" />}>
      <div className="w-full gap-8 lg:flex">
        <TheContactForm className="w-full max-w-xl pb-96 xl:pb-0" />
        <TheContactMap className="absolute inset-x-0 bottom-0 z-0 h-96 xl:left-auto xl:top-0 xl:h-auto xl:w-1/2" />
      </div>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheContactProps = SectionProps;
