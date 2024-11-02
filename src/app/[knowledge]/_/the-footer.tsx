import Section from "@/components/ui/section";
import type { getLayout } from "@/lib/api";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ClassValue } from "tailwind-variants";
import IconPhone from "~icons/bi/phone";
import IconPinMap from "~icons/bi/pin-map";
import IconAt from "~icons/ph/at";
import IconFacebook from "~icons/ph/facebook-logo-thin";
import IconInstagram from "~icons/ph/instagram-logo-thin";
import IconYoutube from "~icons/ph/youtube-logo-thin";

// STYLES **********************************************************************************************************************************
const SOCIAL = "text-primary hover:text-primary-300";

// MAIN ************************************************************************************************************************************
export default function theFooter({ config, className }: TheFooterProps) {
  const { city, email, facebook, instagram, phone, street, zipcode } = config;
  return (
    <Section border="top" intent="dark" className={cn("items-center text-white", className)}>
      <div className="container flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 p-3">
            <IconPinMap className="h-6 w-6 text-primary" />
            <span className="flex-auto">
              <div>{street}</div>
              <div>
                {zipcode} {city}
              </div>
            </span>
          </div>
          <a href={"mailto:" + email} className="group/email">
            <div className="flex items-center gap-4 p-3">
              <IconAt className="h-6 w-6 text-primary group-hover/email:text-primary-400" />
              <span className="flex-auto">
                <div>{email}</div>
              </span>
            </div>
          </a>
          <a href={"tel:" + phone} className="group/phone">
            <div className="flex items-center gap-4 p-3">
              <IconPhone className="h-6 w-6 text-primary group-hover/phone:text-primary-400" />
              <span className="flex-auto">
                <div>{phone}</div>
              </span>
            </div>
          </a>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex items-center justify-center gap-4">
            <a href={facebook} className={SOCIAL} aria-label="Facebook">
              <IconFacebook className="h-12 w-12" />
            </a>
            <a href={instagram} className={SOCIAL} aria-label="Instagram">
              <IconInstagram className="h-12 w-12" />
            </a>
            <a href={instagram} className={SOCIAL} aria-label="Youtube">
              <IconYoutube className="h-12 w-12" />
            </a>
          </div>
          <hr className="w-full border-dashed border-neutral-200" />
          <div className="flex flex-col items-end">
            <span>©2022 L&apos;ENVOL - LA RÉUNION</span>
            <span className="text-sm">Tous droits réservés</span>
          </div>
          <Link href="/articles/mentions-legales" className="self-end text-sm text-neutral-400 hover:text-white">
            mentions légales
          </Link>
        </div>
      </div>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
type Config = Awaited<ReturnType<typeof getLayout>>["config"];
export type TheFooterProps = { config: Config; className?: ClassValue };
