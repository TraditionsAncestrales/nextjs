"use client";

import RecordsItems from "@/components/records-items";
import { Item } from "@/lib/pocketbase/utils";
import { Intent } from "@/styles/ui";
import { useLayoutEffect, useState } from "react";

// MAIN ************************************************************************************************************************************
export default function TheEvents({ intent, items }: TheEventsProps) {
  const [events, setEvents] = useState<EventItem[]>([]);

  useLayoutEffect(() => {
    setEvents(items.filter(({ to }) => to.toISOString() > new Date().toISOString()));
  }, []);

  return (
    <RecordsItems title="Événement" items={events} border="bottom" intent={intent}>
      <div>
        <p>Retrouvez bientôt ici l'ensemble de mes événements.</p>
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
