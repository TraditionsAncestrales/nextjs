import { getLayout } from "@/lib/api";
import "@/styles/globals.css";
import "@/styles/theme.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import TheBody from "./_/the-body";
import TheFooter from "./_/the-footer";
import TheHeader from "./_/the-header";

// FONTS ***********************************************************************************************************************************
const candara = localFont({
  src: "../fonts/candara_font-webfont.woff2",
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
  description: "Generated by create next app",
};

// MAIN ************************************************************************************************************************************
export default async function Layout({ children, params }: LayoutProps) {
  const { knowledge } = await params;
  const { config } = await getLayout(knowledge);

  return (
    <html lang="fr">
      <TheBody className={[candara.variable, raleway.variable]} theme={knowledge}>
        <TheHeader className="fixed left-0 top-0 z-30 w-full" />
        {children}
        <TheFooter config={config} />
      </TheBody>
    </html>
  );
}

// TYPES ***********************************************************************************************************************************
export type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ knowledge: string }>;
};