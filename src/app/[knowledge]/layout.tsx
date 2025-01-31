import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/theme.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import { TheFooter } from "./_/the-footer";
import { TheHeader } from "./_/the-header";

// FONTS ***********************************************************************************************************************************
const candara = localFont({
  src: "../../fonts/candara_font-webfont.woff2",
  variable: "--font-heading",
  weight: "400",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// METADATA ********************************************************************************************************************************
export const metadata: Metadata = {
  title: "Traditions ancestrales",
  description: "Site d'Océane Ravasini à propos des traditions ancestrales : chamanisme, rêves, reiki et tarot",
};

// MAIN ************************************************************************************************************************************
export default function Layout({ children, params }: LayoutProps) {
  return (
    <html lang="fr">
      <Suspense>
        <Body params={params}>
          <TheHeader className="fixed left-0 top-0 z-30 w-full" />
          {children}
          <TheFooter />
        </Body>
      </Suspense>
    </html>
  );
}

async function Body({ children, params }: BodyProps) {
  const { knowledge } = await params;
  return (
    <body
      className={cn("group overflow-y-auto overflow-x-hidden antialiased", [candara.variable, raleway.variable])}
      data-theme={knowledge}
    >
      {children}
    </body>
  );
}

// TYPES ***********************************************************************************************************************************
export type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ knowledge: string }>;
};

export type BodyProps = {
  children: React.ReactNode;
  params: Promise<{ knowledge: string }>;
};
