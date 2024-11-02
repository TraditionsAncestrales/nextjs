import type { Feature } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import type { Intent } from "@/styles/ui";
import type { ClassValue } from "tailwind-variants";

export default function Features({ className, features = [], intent = "white" }: FeaturesProps) {
  if (features.length === 0) return;

  return (
    <dl className={cn("w-full p-4", intent === "white" ? "bg-primary-200" : "bg-white/25", className)}>
      {features.map(({ key, value }) => (
        <div key={key} className="flex gap-2">
          <dd className="flex-none font-bold">{key} :</dd>
          <dt>{value}</dt>
        </div>
      ))}
    </dl>
  );
}

// TYPES ***********************************************************************************************************************************
export type FeaturesProps = { className?: ClassValue; features?: Feature[]; intent?: Intent };
