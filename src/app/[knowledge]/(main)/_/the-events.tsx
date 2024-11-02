"use client";

import RecordsItems from "@/components/records-items";
import type { Item } from "@/lib/pocketbase/utils";
import type { Intent } from "@/styles/ui";
import { useLayoutEffect, useState } from "react";

// MAIN ************************************************************************************************************************************
export default function TheEvents({ intent, items }: TheEventsProps) {
  const [events, setEvents] = useState<EventItem[]>([]);

  useLayoutEffect(() => {
    setEvents(items.filter(({ to }) => to.toISOString() > new Date().toISOString()));
  }, [items]);

  return (
    <RecordsItems title="Événement" items={events} border="bottom" intent={intent}>
      <div>
        <p>Retrouvez bientôt ici l&apos;ensemble de mes événements.</p>
        <strong>Vous pouvez déjà en obtenir le programme en me faisant une demande via le formulaire de contact.</strong>
      </div>
    </RecordsItems>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheEventsProps = {
  intent: Intent;
  items: EventItem[];
};

type EventItem = Item & { to: Date };
